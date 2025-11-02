import {AppHeader} from "./components/AppHeader/AppHeader";
import  styles from './App.module.css';
import {Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {ConstructorPage} from "./pages/ConstructorPage/ConstructorPage";
import {IngredientsDetails} from "./components/IngredientsDetails/IngredientsDetails";
import {ProtectedRouteElement} from "./components/ProtectedRouteElement/ProtectedRouteElement";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage";
import {ProfileFields} from "./components/ProfileFileds/ProfileFields";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {RegisterPage} from "./pages/RegisterPage/RegisterPage";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import {ResetPasswordPage} from "./pages/ResetPasswordPage/ResetPasswordPage";
import {Modal} from "./components/Modal/Modal";
import {FeedPage} from "./pages/FeedPage/FeedPage";
import {OrderPage} from "./pages/OrderPage/OrderPage";


function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/" element={<ProtectedRouteElement />}>
          <Route path="profile" element={<ProfilePage />} >
            <Route path="" element={<ProfileFields />} />
            <Route path="orders" element={<LoginPage />} />
          </Route>
          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/:id" element={<OrderPage />}/>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/ingredients/:id" element={
          <div className={styles.modal}>
            <IngredientsDetails />
          </div>
        }/>
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal header="Детали ингредиента" onClose={() => navigate(-1)}>
              <IngredientsDetails/>
            </Modal>}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
