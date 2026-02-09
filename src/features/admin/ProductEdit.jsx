import { useParams } from "react-router";
import { useGetProductQuery } from "../products/productApi";
import ProductEditForm from "./ProductEditForm";

export default function ProductEdit() {
    const {id} = useParams();
    const {isLoading,error,data} = useGetProductQuery(id);
    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>{error.message}</div>;
    console.log(data);
    return (
        <div >
            <h1 className="text-lg">Product Edit</h1>
            <ProductEditForm product={data?.product} />
        </div>
    )
}
