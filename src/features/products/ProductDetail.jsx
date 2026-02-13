
import { useParams } from 'react-router'
import { useGetProductQuery } from './productApi';
import { base } from '../../app/mainApi';
import AddToCart from '../cart/AddToCart';

export default function ProductDetail() {
       const {id} = useParams();
    const {isLoading,error,data} = useGetProductQuery(id);
    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>{error.data?.message}</div>;
    console.log(data);
    return (
        <div className=' max-w-7xl mx-auto grid grid-cols-2 mt-11 gap-10' >
            <div>
                <img src={`${base}/${data.product.image}`} alt="" />
            </div>
            
            <div className='space-y-5' >
                <h1>{data.product.title}</h1>
                <p className='text-zinc-400' >Price: {data.product.price}</p>
                <p className='text-zinc-400' >Stock: {data.product.stock}</p>
                <p>{data.product.description}</p>
                <hr/>
                <div>
                <AddToCart product={data.product} />
                </div>
            </div>

        </div>
    )
}



// import { useParams } from 'react-router'
// import { useGetProductQuery } from './productApi';
// import { base } from '../../app/mainApi';
// import AddToCart from '../cart/AddToCart';

// export default function ProductDetail() {
//     const { id } = useParams();
//     const { isLoading, error, data } = useGetProductQuery(id);

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>{error.data?.message || 'Error fetching product'}</div>;

//     const product = data.product;

//     return (
//         <div className='max-w-7xl mx-auto grid grid-cols-2 mt-11 gap-10'>
//             <div>
//                 <img 
//                   src={Array.isArray(product.image) ? `${base}/${product.image[0]}` : `${base}/${product.image}`} 
//                   alt={product.title} 
//                   className="w-full h-auto object-cover"
//                 />
//             </div>
            
//             <div className='space-y-3'>
//                 <h1 className='text-2xl font-bold'>{product.title}</h1>
//                 <p className='text-zinc-500'>Price: ${product.price}</p>
//                 <p className='text-zinc-500'>Stock: {product.stock}</p>
//                 <p className='text-zinc-500'>SKU: {product.sku}</p>

//                 <div className='flex flex-wrap gap-2'>
//                     Tags: 
//                     {product.tags && product.tags.length > 0 ? (
//                         product.tags.map((tag, index) => (
//                             <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">{tag}</span>
//                         ))
//                     ) : (
//                         <span className='text-gray-400'>No tags</span>
//                     )}
//                 </div>

//                 <p className='mt-2'>{product.description}</p>
//                 <hr className='my-4'/>
//                 <AddToCart product={product} />
//             </div>
//         </div>
//     )
// }
