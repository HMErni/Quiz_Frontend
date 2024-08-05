import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login/Login.jsx';
import AppLayout from './UI/AppLayout.jsx';
import QuizesList from './Quiz/QuizesList.jsx';
import ProtectedRoute from './UI/ProtectedRoute.jsx';
import CreateQuiz from './UI/CreateQuiz.jsx';
import PlayQuiz from './Quiz/PlayQuiz.jsx';
import Score from './UI/Score.jsx';

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
              {
                path: 'createQuiz',
                element: <CreateQuiz />,
              },
              {
                path: `editQuiz/:id`,
                element: <CreateQuiz />,
              },
            ],
          },
          {
            path: `playQuiz/:id`,
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: <PlayQuiz />,
              },
              {
                path: 'score',
                element: <Score />,
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
