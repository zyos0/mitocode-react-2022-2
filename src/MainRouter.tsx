import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {baseRoute, clientsRoute,  invoicesRoute, loginRoute, platesRoute} from './constants/routes';
import Login from './pages/Login';
import Plates from './pages/Plates';
import PrivateRoute from './components/PrivateRoute';
import { decodeToken, getToken } from './utils/tokenManagement';
import { useDispatch } from 'react-redux';
import { sessionActions } from './store/actions/session';
import Clients from "./pages/Clients";
import InvoiceCreate from "./pages/InvoiceCreate/InvoiceCreate";
import Invoices from "./pages/Invoices/Invoices";
import InvoiceDetails from "./pages/InvoiceDetail/InvoiceDetail";

const MainRouter = () => {
    const token = getToken();
    const dispatch = useDispatch();
    if (token) {
        const decodedUserData = decodeToken();
        dispatch(sessionActions.loginSuccess(decodedUserData));
    }

    //const PrivatePlates = CanAccess(Plates);
    return (
        <BrowserRouter>
            <Routes>
                <Route path={loginRoute} element={<Login />} />
                <Route path={baseRoute} element={<Login />} />
                <Route
                    path={platesRoute}
                    element={
                        <PrivateRoute>
                            <Plates />
                        </PrivateRoute>
                    }



                    /*element={<PrivatePlates />}*/
                />

                <Route
                    path={clientsRoute}
                    element={
                        <PrivateRoute>
                            <Clients />
                        </PrivateRoute>
                    }



                    /*element={<PrivatePlates />}*/
                />

                <Route
                    path={`${invoicesRoute}/new`}
                    element={
                        <PrivateRoute>
                            <InvoiceCreate />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={invoicesRoute}
                    element={
                        <PrivateRoute>
                            <Invoices />
                        </PrivateRoute>
                    }
                />

                <Route
                    path={`${invoicesRoute}/:id`}
                    element={
                        <PrivateRoute>
                            <InvoiceDetails />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
