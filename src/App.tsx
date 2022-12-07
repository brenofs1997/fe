import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './components/Header';
import { Login } from './components/Login';
import { Orders } from './components/Orders';
import { GlobalStyles } from './styles/GlobalStyles';


export function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { state } = useLocation();

    useEffect(() => {
        setIsLoggedIn(state ? state?.LoggedIn : false);
    }, []);

    return (
        <>
            <GlobalStyles />
            {
                isLoggedIn ? (
                    <>
                        <Header nameUser={state?.name} />
                        <Orders />
                    </>
                ) : (
                    <>
                        <Login />
                    </>
                )
            }

            <ToastContainer position="bottom-center" />
        </>
    );
}



