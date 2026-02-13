// import { useParams } from "react-router";
// import { useGetProductQuery } from "../products/productApi";
// import ProductEditForm from "./ProductEditForm";

// export default function ProductEdit() {
//     const {id} = useParams();
//     const {isLoading,error,data} = useGetProductQuery(id);
//     if(isLoading) return <div>Loading...</div>;
//     if(error) return <div>{error.message}</div>;
//     console.log(data);
//     return (
//         <div >
//             <h1 className="text-lg">Product Edit</h1>
//             <ProductEditForm product={data?.product} />
//         </div>
//     )
// }


import { useParams } from "react-router";
import { useGetProductQuery } from "../products/productApi";
import ProductEditForm from "./ProductEditForm";

export default function ProductEdit() {
    const { id } = useParams();
    const { isLoading, error, data } = useGetProductQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message || "Error loading product"}</div>;

    // Guard against undefined product
    if (!data || !data.product) return <div>Product not found</div>;

    return (
        <div className="p-4">
            <h1 className="text-lg font-semibold mb-4">Edit Product</h1>
            <ProductEditForm product={data.product} />
        </div>
    );
}
