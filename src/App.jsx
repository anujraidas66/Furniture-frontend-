import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayOut from './components/RootLayout.jsx';
import Home from './features/home/Home.jsx';
import Login from './features/Authentication/login.jsx';
import Signup from './features/Authentication/Signup.jsx';
import Shop from './features/shop/Shop.jsx';
import AdminPanel from './features/admin/AdminPanel.jsx';
import ProductAddForm from './features/admin/ProductAddForm.jsx';
import ProductEdit from './features/admin/ProductEdit.jsx';
import ProductDetail from './features/products/ProductDetail.jsx';
import Cart from './features/cart/Cart.jsx';

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayOut/>,
            children:[
                {
                    index:true,
                    element: <Home/>
                },

                {
                    path:'login',
                    element: <Login/>
                },

                {
                    path:'signup',
                    element: <Signup/>
                },

                {
                    path:'admin-panel',
                    element: <AdminPanel/>
                },

                {
                    path:'product-add',
                    element:<ProductAddForm/>

                },

                {
                    path: 'product-edit/:id',
                    element: <ProductEdit/>
                },

                {
                    path:'products/:id',
                    element:<ProductDetail/>
                },

                {
                path:'cart',
                element:<Cart/>
                },


                {
                path:'shop',
                element:<Shop/>

                }
            ]
        }
    ]);
    
    return <RouterProvider router={router} />
}
