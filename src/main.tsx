import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { Login } from './components/Login';

const router = createBrowserRouter([
    {
        path: '/home',
        element: <App/>,
    },
    {
        path: '/login',
        element: <Login/>,
    }
    ,
    {
        path: '/',
        element: <Login/>,
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//<React.StrictMode>
    <RouterProvider router={router} />
    //</React.StrictMode>
);
