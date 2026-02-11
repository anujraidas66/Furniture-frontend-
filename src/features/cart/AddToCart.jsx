import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart, toggleCart } from "../cart/CartSlice";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();

  // get cart data
  const { carts } = useSelector((state) => state.cartSlice);

  // check if product already exists in cart
  const isExist = carts.find((cart) => cart.id === product._id);

  // quantity state
  const [qty, setQty] = useState(isExist?.qty || 1);

  // increase qty
  const handleIncrement = () => {
    if (qty < product.stock) {
      setQty(qty + 1);
    }
  };

  // decrease qty
  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // add to cart + open drawer
  const handleAddToCart = () => {
    dispatch(
      setCart({
        id: product._id,
        title: product.title,
        price: product.price,
        stock: product.stock,
        image: product.image,
        qty: qty,
      })
    );

    // open cart drawer
    dispatch(toggleCart(true));
  };

  return (
    <div className="space-y-5">
      {/* Quantity buttons */}
      <div className="flex items-center gap-4">
        <Button
          disabled={qty === 1}
          onClick={handleDecrement}
          className="px-3"
        >
          <MinusIcon size={16} />
        </Button>

        <span className="font-semibold text-lg">{qty}</span>

        <Button
          disabled={qty === product.stock}
          onClick={handleIncrement}
          className="px-3"
        >
          <PlusIcon size={16} />
        </Button>
      </div>

      {/* Add to Cart button */}
      <Button
        onClick={handleAddToCart}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg w-30"
      >
        Add To Cart
      </Button>
    </div>
  );
}





// import { MinusIcon, PlusIcon } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCart } from "./CartSlice";

// export default function AddToCart({product}) {

//     const {carts} = useSelector((state) => state.cartSlice);
//     const isExist = carts.find((cart) => cart.id === product._id);
//     const dispatch = useDispatch();

//     const [qty, setQty] = useState(isExist?.qty || 1);
//     const handleIncrement = () => setQty(qty + 1);
//     const handleDecrement = () => setQty(qty - 1);
//     const handleCart = () => {
//         // jab jab addtocart product gaxhu then teti bela locally store hunxha and yadi product direct diye bhane product ma bhayeo sabbai data save hunxha
//         dispatch(setCart({
//             // product
//             id:product._id,
//             title:product.title,
//             price:product.price,
//             stock:product.stock,
//             image:product.image,
//             qty
//         }));

//     }
//     return (
//         <div className="space-y-5" >
//             <div className="flex gap-5" >
//             <Button disabled={qty === 1} onClick={handleDecrement}><MinusIcon/></Button>
//              <p>{qty}</p>
//             <Button disabled={qty === product.stock} onClick={handleIncrement} ><PlusIcon/></Button>
//             </div>
//             <div>
// <Button  onClick={handleCart} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-200">
//   Add To Cart
// </Button>
      
//      </div>
//         </div>
//     )
// }
