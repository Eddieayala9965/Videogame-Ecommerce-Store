import { Provider } from "react-redux";
import store from "../redux/store";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

import "../pages/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />

      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
