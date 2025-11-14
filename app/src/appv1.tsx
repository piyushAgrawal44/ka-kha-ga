
import { BrowserRouter, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes/app.route";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";

const AppRoutes = () => useRoutes(appRoutes);

const App = () => (
  <BrowserRouter>
    <Provider store={store}>

      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Provider>


  </BrowserRouter>
);

export default App;
