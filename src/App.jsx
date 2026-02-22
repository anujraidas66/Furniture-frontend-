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
import CheckOut from './features/checkout/CheckOut.jsx';
import AdminOrders from './features/admin/AdminOrders.jsx';
import UserOrder from './features/profile/UserOrder.jsx';
import Contact from './features/contact/Contact.jsx';
import AdminContactReply from './features/admin/AdminContactReply.jsx';
import ProductBlog from './features/blog/ProductBlog.jsx';
import WishlistProduct from './features/wishlist/WishListProduct.jsx';
import MyAccount from './features/Authentication/MyAccount.jsx';
import ResetPassword from './features/Authentication/ResetPassword.jsx';
import ForgotPassword from './features/Authentication/ForgotPassword.jsx';
import AdminSubscribers from './features/admin/AdminSubscribers.jsx';
import About from './features/about/About.jsx';


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
                    path:'signup',
                    element: <Signup/>
                },

                {
                    path: 'my-account',
                    element: <MyAccount/>
                },

                {
                    path:'login',
                    element: <Login/>
                },

                {
                    path: 'forgot-password',
                    element: <ForgotPassword/>
                },

                {
                    path: 'reset-password/:token',
                    element: <ResetPassword/>
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
                    path: 'about',
                    element: <About/>
                },


                {
                    path: 'checkOut',
                    element:<CheckOut/>
                },

                {
                    path: 'admin-orders',
                    element:<AdminOrders/>
                },

                {
                    path: 'admin-subscribers',
                    element:<AdminSubscribers/>
                },

                {
                    path: 'user-orders',
                    element:<UserOrder/>
                },

                {
                    path: 'contact',
                    element:<Contact/>
                },

                {
                    path:'admin-contact',
                    element:<AdminContactReply/>
                },

                {
                    path: 'product-blog',
                    element:<ProductBlog/>
                },

                {
                    path: 'wishlist',
                    element:<WishlistProduct/>
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
