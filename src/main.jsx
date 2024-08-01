import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login/Login.jsx';
import AppLayout from './UI/AppLayout.jsx';
import Header from './Component/Header.jsx';
import Welcome from './Component/Welcome.jsx';
import QuizesList from './Quiz/QuizesList.jsx';
import ProtectedRoute from './UI/ProtectedRoute.jsx';
import CreateQuiz from './UI/CreateQuiz.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: <QuizesList />,
              },
            ],
          },
          {
            path: 'createQuiz',
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: <CreateQuiz />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
