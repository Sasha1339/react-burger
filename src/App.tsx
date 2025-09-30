import {AppHeader} from "./components/AppHeader/AppHeader";
import  styles from './App.module.css';
import {Outlet} from "react-router-dom";


function App() {


  return (
    <div className={styles.main}>
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default App;
