// import { useGetProductsQuery } from "../products/productApi"
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { base } from "../../app/mainApi";
// import { Button } from "../../components/ui/button";
// import { EditIcon, Trash } from "lucide-react";
// import { useNavigate } from "react-router";
// import RemoveProduct from "./RemoveProduct";


// export default function AdminPanel() {
//   const nav = useNavigate();
//     const {isLoading,error,data} = useGetProductsQuery();
//     if(isLoading) return <div>Loading...</div>;
//     if(error) return <div>{error.message}</div>;
//     console.log(data);
//     return (

//         <div className='w-full'>
//           <div className='mb-5 ' >
//             <Button
//             onClick={() => nav('/product-add')}
//             className={'bg-blue-800'} >AddProduct</Button>
//           </div>
//       <div className='[&>div]:rounded-sm [&>div]:border'>
//         <Table>
//           <TableHeader>
//             <TableRow className='hover:bg-transparent'>
//               <TableHead>Name</TableHead>
//               <TableHead>Id</TableHead>
//               <TableHead>CreatedAt</TableHead>
//               <TableHead>Update</TableHead>
//               <TableHead>Remove</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {data.products.map(item => (
//               <TableRow key={item._id}>
//                 <TableCell>
//                   <div className='flex items-center gap-3'>
//                     <Avatar>
//                       <AvatarImage src={`${base}/${item.image}`} alt={item.image} />
//                     </Avatar>
//                     <div className='font-medium'>{item.title}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>{item._id}</TableCell>
//                 <TableCell>{item.createdAt}</TableCell>
//                 <TableCell>
//                     <Button onClick={() => nav(`/product-edit/${item._id}`)} >
//                     <EditIcon/>
//                      </Button>
//                 </TableCell>
//                 <TableCell>
//                   <RemoveProduct id={item._id} />
              
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//     )
// }


import { useGetProductsQuery } from "../products/productApi"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { base } from "../../app/mainApi";
import { Button } from "../../components/ui/button";
import { EditIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import RemoveProduct from "./RemoveProduct";

export default function AdminPanel() {
  const nav = useNavigate();
  const {isLoading,error,data} = useGetProductsQuery();
  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>{error.message}</div>;

  return (
    <div className='w-full my-30 mx-5'>
      <div className='mb-5'>
        <Button onClick={() => nav('/product-add')} className={'bg-blue-800'}>Add Product</Button>
      </div>
      <div className='[&>div]:rounded-sm [&>div]:border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>CreatedAt</TableHead>
              <TableHead>Update</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.map(item => (
              <TableRow key={item._id}>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage src={`${base}/${Array.isArray(item.image) ? item.image[0] : item.image}`} alt={item.title}/>
                    </Avatar>
                    <div className='font-medium'>{item.title}</div>
                  </div>
                </TableCell>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <Button onClick={() => nav(`/product-edit/${item._id}`)}>
                    <EditIcon/>
                  </Button>
                </TableCell>
                <TableCell>
                  <RemoveProduct id={item._id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
