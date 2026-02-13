// import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
// import { base } from '../../app/mainApi'
// import { useNavigate } from 'react-router'
// export default function ProductCard({product}) {
//   const nav = useNavigate();
//     return (
//       <div 
//       onClick={()=>nav(`/products/${product._id}`)}
//       className='hover:scale-[103%] transition cursor-pointer duration-75 ease-in delay-300' >
//          <Card className='pt-0'>
//       <CardContent className='px-0'>
//         <img
//           src={`${base}/${product.image}`}
//           alt='Banner'
//           className='aspect-video h-70 rounded-t-xl object-cover'
//         />
//       </CardContent>
//       <CardHeader>
//         <CardTitle>{product.title}</CardTitle>
//         <CardDescription> Rs.{product.price}</CardDescription>
//       </CardHeader>
//     </Card>
//     </div>
//     )
// }


import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { base } from '../../app/mainApi';
import { useNavigate } from 'react-router';

export default function ProductCard({ product }) {
  const nav = useNavigate();

  // Use first image if it's an array
  const imgSrc = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <div 
      onClick={() => nav(`/products/${product._id}`)}
      className='hover:scale-[103%] transition cursor-pointer duration-75 ease-in delay-300'
    >
      <Card className='pt-0'>
        <CardContent className='px-0'>
          <img
            src={`${base}/${imgSrc}`}
            alt={product.title}
            className='aspect-video h-70 rounded-t-xl object-cover'
          />
        </CardContent>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>Rs.{product.price}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
