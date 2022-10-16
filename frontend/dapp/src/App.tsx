import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Mint from "./components/Mint";
import Rewards from "./components/Rewards";
import Stake from "./components/Stake";
import Withdraw from "./components/Withdraw";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="bg-gray-50">
        <Header />
        <Mint />
        <Stake />
        <Rewards />
        <Withdraw />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
