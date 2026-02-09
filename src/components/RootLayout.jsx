import { Outlet } from "react-router";
import Header from "./Header.jsx";

export default function RootLayOut() {
    return (
        <>
        <Header/>
        
        <main className='p-5'>
         <Outlet/>
        </main>
            
        </>
    )
}
