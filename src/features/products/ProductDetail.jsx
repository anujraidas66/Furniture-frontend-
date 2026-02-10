
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


