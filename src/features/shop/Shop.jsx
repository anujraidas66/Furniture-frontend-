import { useGetProductsQuery } from "../products/productApi";
import ProductCard from "../products/ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function Shop() {
    const {isLoading,error,data} = useGetProductsQuery();
if(isLoading) return  <div className="grid grid-cols-4 gap-4 mt-4 items-start"  >
<ProductSkeleton/>
<ProductSkeleton/>
<ProductSkeleton/>
<ProductSkeleton/>
<ProductSkeleton/>
<ProductSkeleton/>
<ProductSkeleton/>
<ProductSkeleton/>

 </div>
    if(error) return <div>{error.message}</div>;
    console.log(data);
    return (
<div>
        
        <div className="grid grid-cols-4 gap-7 mt-4 items-start"  >
           {data.products.map((product)=> {
            return  <ProductCard key={product._id} product = {product} />
           })}
        </div>

        </div>
    )
}
