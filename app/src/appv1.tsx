
import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";
import { appRoutes, AppRouteType } from "./routes/app.route";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { ToastContainer } from "react-toastify";
import { setCredentials } from "./store/slices/auth.slice";
import { useEffect, useState } from "react";
import LocalStorageUtil from "./utils/local-storage";
import PageLoader from "./components/ui/loader/page-loader";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import "./i18n";
import LanguageSelector from "./components/language-switcher";
import { RouteGuard } from "./components/route-guard/route-guard";
import { useUserDetailQuery } from "./services/user.service";

const AppRoutes = ({ routes }: { routes: AppRouteType[] }) => {
  const convertRoutes = (routes: AppRouteType[]): RouteObject[] => {
    return routes.map((r) => ({
      path: r.path,
      element: (
        <RouteGuard
          element={r.element}
          protected={r.protected}
          roles={r.roles}
        />
      ),
      children: r.children ? convertRoutes(r.children) : undefined,
    }));
  };

  return useRoutes(convertRoutes(routes));
};

const MainComponent = () => {
  const { data: userDetailApiResponse, isLoading, error } = useUserDetailQuery();
  const { user: loggedUser } = useSelector((state: RootState) => state.auth);
  const [appInitialized, setAppInitialized] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {

    
    if (loggedUser?.role) {
      setAppInitialized(true);
      return;
    }

    if (error) {
      console.log(error)
      setAppInitialized(true);
      return;
    }


    if (userDetailApiResponse?.success === false) {
      // if user is not logged in then initialized immediately
      setAppInitialized(true)
      return;
    }

    const user = userDetailApiResponse?.data;
    const LS = new LocalStorageUtil();
    const token = LS.getAuthToken();

    if (token && user) {
      dispatch(
        setCredentials({
          token: token,
          user: user,
        })
      );
    }
  }, [userDetailApiResponse, error, isLoading, loggedUser]);

  if (!appInitialized || isLoading) return (
    <PageLoader loading={true}>
      <div className="w-full h-full"></div>
    </PageLoader>
  );


  return (
    <>
      <AppRoutes routes={appRoutes} />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <LanguageSelector />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <MainComponent />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  )
};

export default App;
