import { Outlet } from "react-router";
import Header from "./Header.jsx";
import CartDrawer from "../features/cart/CartDrawer.jsx";

export default function RootLayOut() {
    return (
        <>
        <Header/>
       <CartDrawer/>
  
         <Outlet/>
     
            
        </>
    )
}
