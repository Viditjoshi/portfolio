// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Home from './page/Home/Home';
import About from './page/About';
import Work from './page/Work';
import Blog from './page/Blog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />, 
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'work', element: <Work /> },
      { path: 'blog', element: <Blog /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
