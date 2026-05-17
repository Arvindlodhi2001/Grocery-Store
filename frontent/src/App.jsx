import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import Index from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import IndexRouter from "./components/IndexRouter";
import LocomotiveScroll from "locomotive-scroll";
import { store } from "./Redux/store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <IndexRouter />
        </Provider>
      </div>
    </>
  );
}

export default App;
