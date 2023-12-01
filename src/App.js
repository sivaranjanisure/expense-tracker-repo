import MainRoutes from "./MainRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExpenseContextProvider } from "./path-to-your-ExpenseContextProvider";

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
        theme="light"
      />
      <MainRoutes />
      <ExpenseContextProvider>
        {/* Your component tree */}
      </ExpenseContextProvider>
    </>
  );
}

export default App;
