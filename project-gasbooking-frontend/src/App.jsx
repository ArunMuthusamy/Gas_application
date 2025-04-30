import "./App.css";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Reactrouting from "./component/Route/Reactrouting";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Reactrouting />
      <Footer />
    </>
  );
}

export default App;
