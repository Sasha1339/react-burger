export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static async setMessage(response: Response): Promise<HttpError> {
    let reason;

    const data = await response.json();
    if (data?.reason) {
      reason = data.reason;
    } else {
      reason = response.statusText || 'Unknown error';
    }
    return new HttpError(response.status, reason);
  }
}
