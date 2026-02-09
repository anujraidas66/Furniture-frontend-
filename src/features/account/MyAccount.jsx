
export default function MyAccount() {
    return (
        <div>
              <div className="flex gap-10 mx-auto font-medium">
          <div className="text-black text-base font-medium font-['Poppins']">Home</div>
          <div className="text-black text-base font-medium font-['Poppins']">Shop</div>
          <div className="text-black text-base font-medium font-['Poppins']">About</div>
          <div className="text-black text-base font-medium font-['Poppins']">Contact</div>
        </div>

        {/* Right Icons */}
        <div className="flex gap-6 text-lg">
         
          <div className="cursor-pointer">
            <input type="text" placeholder="Search" className="border bg-white rounded-md px-2 py-1" />
          </div>
           <div className="cursor-pointer">👤</div>
          <div className="cursor-pointer">♡</div>
          <div className="cursor-pointer">🛒</div>
          <div  className= " flex  text-black text-base font-medium font-['Poppins']" >
            <NavLink to="/login" >
            <Button variant="link" >Login</Button>
            </NavLink>
          </div>
          <div><DropDownProfile/></div>

        </div>
        </div>
    )
}
