import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
  import 'react-toastify/dist/ReactToastify.css';

import ClientContainer from "./containers/ClientContainer";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
          <Routes>
            <Route path='/' element={<ClientContainer><LandingPage /></ClientContainer>}/>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}
