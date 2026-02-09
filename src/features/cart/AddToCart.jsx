import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export default function AddToCart({product}) {
    const [qty, setQty] = useState(1);
    const handleIncrement = () => setQty(qty + 1);
    const handleDecrement = () => setQty(qty - 1);
    return (
        <div className="space-y-5" >
            <div className="flex gap-5" >
            <Button disabled={qty === 1} onClick={handleDecrement}><MinusIcon/></Button>
             <p>{qty}</p>
            <Button disabled={qty === product.stock} onClick={handleIncrement} ><PlusIcon/></Button>
            </div>
            <div>
<Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-200">
  Add To Cart
</Button>
      
     </div>
        </div>
    )
}
