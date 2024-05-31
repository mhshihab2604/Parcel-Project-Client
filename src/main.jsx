import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {RouterProvider} from "react-router-dom";
import {router} from './Routes/Routes';
import FirebaseProvider from './FirebaseProvider/FirebaseProvider';
import {Toaster} from 'sonner';

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
            <FirebaseProvider>
                <Toaster position='top-center'></Toaster>
                <RouterProvider router={router}/>
            </FirebaseProvider>
        </React.StrictMode>,
    )