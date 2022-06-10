import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { baseRoute, loginRoute, platesRoute } from './constants/routes';
import Login from './pages/Login';
import Plates from './pages/Plates';
import PrivateRoute from './components/PrivateRoute';
import { decodeToken, getToken } from './utils/tokenManagement';
import { useDispatch } from 'react-redux';
import { sessionActions } from './store/actions/session';
import CanAccess from './components/CanAccess';

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
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
