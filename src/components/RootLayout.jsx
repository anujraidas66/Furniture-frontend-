import { Outlet } from "react-router";
import Header from "./Header.jsx";
import CartDrawer from "../features/cart/CartDrawer.jsx";
import Footer from "./Footer.jsx";

export default function RootLayOut() {
    return (
        <>
        <Header/>
       <CartDrawer/>
  
  <main >
 <Outlet/>
  </main>
        
    
    <Footer/>
        </>
    )
}
