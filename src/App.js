import MainRoutes from "./MainRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "chart.js/auto";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <MainRoutes />
    </>
  );
}

export default App;
