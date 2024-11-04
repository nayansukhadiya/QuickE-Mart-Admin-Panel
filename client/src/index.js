import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import Order from './Pages/Order';
import UserContextProvider from './context/UserContextProvider';
import Login from './Pages/LogIn/Login';
import Sighin from './Pages/SighIn/SighIn';
import ProductPage from './Pages/product';
import SubCategory from './Pages/SubCategory';
import ProductEdit from './Pages/ProductEdit';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="productlist" element={<ProductPage />} />
        <Route path="category" element={<SubCategory />} />
        <Route path="productedit" element={<ProductEdit />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="sighin" element={<Sighin />} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals();
