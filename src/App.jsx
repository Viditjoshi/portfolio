import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Home from './page/Home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Wrapper>
        <Home />
      </Wrapper>
    ),
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}