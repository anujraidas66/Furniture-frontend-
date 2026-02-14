import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useUpdateProductMutation } from '../products/productApi'
import { Spinner } from '../../components/ui/spinner'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { base } from '../../app/mainApi'

const valSchema = Yup.object({
  title: Yup.string().min(4).required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  stock: Yup.number().required("Stock is required"),
  category: Yup.string().required("Category is required"),
  rating: Yup.number().required("Rating is required"),
})

export default function ProductEditForm({ product }) {
  const nav = useNavigate()
  const { user } = useSelector(state => state.userSlice)
  const [updateProduct, { isLoading }] = useUpdateProductMutation()
  const [imagesPreview, setImagesPreview] = useState(product.image || [])

  return (
    <Card className="w-full max-w-3xl mt-4">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            rating: product.rating,
            colors: product.colors || [],
            sizes: product.sizes || [],
            images: [],
          }}
          validationSchema={valSchema}
          onSubmit={async (values) => {
            try {
              const formData = new FormData()
              formData.append('title', values.title)
              formData.append('description', values.description)
              formData.append('price', values.price)
              formData.append('stock', values.stock)
              formData.append('category', values.category)
              formData.append('rating', values.rating)
              formData.append('colors', JSON.stringify(values.colors))
              formData.append('sizes', JSON.stringify(values.sizes))
              values.images.forEach(f => formData.append('images', f))

              await updateProduct({ token: user.token, id: product._id, body: formData }).unwrap()
              toast.success('Product updated successfully')
              nav(-1)
            } catch (err) {
              toast.error(err?.data?.message || 'Error updating product')
            }
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="grid gap-2">
                <Label>Title</Label>
                <Input name="title" value={values.title} onChange={handleChange}/>
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <textarea name="description" value={values.description} onChange={handleChange} className="border rounded p-2"/>
              </div>

              <div className="grid gap-2">
                <Label>Price</Label>
                <Input type="number" name="price" value={values.price} onChange={handleChange}/>
              </div>

              <div className="grid gap-2">
                <Label>Stock</Label>
                <Input type="number" name="stock" value={values.stock} onChange={handleChange}/>
              </div>

              <div className="grid gap-2">
                <Label>Rating</Label>
                <Input type="number" name="rating" value={values.rating} onChange={handleChange}/>
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>
                <Input name="category" value={values.category} onChange={handleChange}/>
              </div>

              <div className="grid gap-2">
                <Label>Images</Label>
                <Input type="file" multiple onChange={e => {
                  const files = Array.from(e.target.files)
                  setFieldValue('images', files)
                  setImagesPreview([...imagesPreview, ...files.map(f => URL.createObjectURL(f))])
                }} />
                <div className="flex gap-2 flex-wrap mt-2">
                  {imagesPreview.map((img,i) => <img key={i} src={img.includes('blob:') ? img : `${base}/${img}`} alt="" className="w-24 h-24 object-cover rounded"/>)}
                </div>
              </div>

              <Button type="submit" className="mt-5">{isLoading ? <Spinner /> : 'Update Product'}</Button>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}




// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select'
// import { Formik } from 'formik'
// import * as Yup from 'yup'
// import {  useUpdateProductMutation } from '../products/productApi'
// import { Spinner } from '../../components/ui/spinner'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router'
// import { base } from '../../app/mainApi'

// const valSchema = Yup.object({
//     title: Yup.string().min(4).required("Title is required"),
//     description: Yup.string().required("Description is required"),
//     price: Yup.string().required('Price is required'),
//     stock: Yup.string().required("Stock is required"),
//     color: Yup.string().required("Color is required"),
//     size: Yup.string().required("Size is required"),
//     category: Yup.string().required("Category is required"),
//     image: Yup.mixed()
    
//     .test('fileType', 'Unsupported File Format', (val) => {
//       if(!val) return true
//       return val && ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(val.type);
//     })
//     .test('fileSize', 'file is too large', (val) => {
//       if(!val) return true
//       return val && val.size <= 5 * 1024 * 1024;
//     }),

// });


// export default function ProductEditForm({product}){
//     const nav = useNavigate();
//     const  {user} = useSelector((state) => state.userSlice);
//     const [updateProduct, {isLoading}] = useUpdateProductMutation();
//   return (
//     <Card className='w-full max-w-md mt-4 '>
//       <CardHeader>
//         <CardTitle>Product Create</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Formik
//         initialValues={{
//             title:product.title,
//             description:product.description,
//             price:product.price,
//             stock:product.stock,
//             color:product.color,
//             size:product.size,
//             category:product.category,
//             image:'',
//             imageReview:product.image
//         }}

//         onSubmit={async(val)=>{
//           try {
//             const formData = new FormData();
//             formData.append('title', val.title);
//             formData.append('description', val.description);
//             formData.append('price', val.price);
//             formData.append('stock', val.stock);
//             formData.append('color', val.color);
//             formData.append('size', val.size);
//             formData.append('category', val.category);
//             if(val.image){
//              formData.append('image', val.image);
//             }

//             await updateProduct({
//                 token: user.token,
//                 body: formData,
//                 id:product._id
//             }).unwrap();
//             toast.success('Product updated successfully');
//             nav(-1);
//           } catch (err) {
//             toast.error(err.data.message);
//           }
//         }}

//         validationSchema={valSchema}

//         >
//             {({handleSubmit, handleChange, values, touched,setFieldValue,errors})=>(
//                 <form onSubmit={handleSubmit}>
//           <div className='flex flex-col gap-5'>
            
//             <div className='grid gap-2'>
//               <Label htmlFor='title'>Title</Label>
//               <Input id='title' 
//               name = 'title'
//               onChange={handleChange}
//               value={values.title}
//               type='title'
//                placeholder='m@example.com' 
//                />
//             {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
//             </div>

//              <div className='grid gap-2'>
//               <Label htmlFor='description'>Description</Label>
//               <textarea
//               id = 'description'
//               name = 'description'
//               onChange={handleChange}
//               value={values.description}
//               type = 'text'
//               placeholder= 'enter description'
//               />
//              {touched.description && errors.description && <p className="text-red-500">{errors.description}</p>}
//             </div>


//              <div className="grid gap-2">
//                     <Label htmlFor="price">Price</Label>
//                     <Input
//                       name="price"
//                       onChange={handleChange}
//                       value={values.price}
//                       id="price"
//                       type="number"
//                       placeholder="Book price"
//                     />
//                     {touched.price && errors.price && <p className="text-red-500">{errors.price}</p>}
//                   </div>


//                   <div className="grid gap-2">
//                     <Label htmlFor="stock">Stock</Label>
//                     <Input
//                       name="stock"
//                       onChange={handleChange}
//                       value={values.stock}
//                       id="stock"
//                       type="number"
//                       placeholder="Enter Product stock"
//                     />
//                     {touched.stock && errors.stock && <p className="text-red-500">{errors.stock}</p>} 
//                   </div>

//                    <div className="grid gap-2">
//                     <Label htmlFor="category">Category</Label>
//                     <Input
//                       name="category"
//                       onChange={handleChange}
//                       value={values.category}
//                       id="category"
//                       type="text"
//                       placeholder="Enter Product Category"
//                     />
//                     {touched.category && errors.category && <p className="text-red-500">{errors.category}</p>} 
//                   </div>

//   <Select
//   value={values.color}
//   onValueChange={(value) => setFieldValue("color", value)}
// >

//       <SelectTrigger className="w-full">
//         <SelectValue placeholder="Select a color" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectItem value="red">Red</SelectItem>
//           <SelectItem value="green">Green</SelectItem>
//           <SelectItem value="blue">Blue</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     {touched.color && errors.color && <p className="text-red-500">{errors.color}</p>} 
//     </Select>



//     <Select
//   value={values.size}
//   onValueChange={(value) => setFieldValue("size", value)}
// >

//       <SelectTrigger className="w-full">
//         <SelectValue placeholder="Select a size" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectItem value="small">Small</SelectItem>
//           <SelectItem value="medium">Medium</SelectItem>
//           <SelectItem value="large">Large</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     {touched.size && errors.size && <p className="text-red-500">{errors.size}</p>} 
//     </Select>

//                   <div className="grid gap-2">
//                     <Label htmlFor="image">Select an image</Label>
//                     <Input
//                       name="image"
//                       onChange={(e) => {
//                         const file = e.target.files[0];
//                         setFieldValue('imageReview', URL.createObjectURL(file));
//                         setFieldValue('image', file);
//                       }}

//                       id="image"
//                       type="file"

//                     />
//                     {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
//                     {values.imageReview && !errors.image && <img src={!values.image ? `${base}/${values.imageReview}` : values.imageReview} alt="" />}
//                   </div>

//            {isLoading ? <Button size="sm" variant="outline"
//            disabled className="w-full mt-5" >
//             <Spinner/>
//             Submit
//            </Button> : <Button type='submit' className='w-full mt-5' >
//             Submit
//             </Button>}

//           </div>
       
//         </form>
//             )}
//         </Formik>
        
//       </CardContent>
//     </Card>
//   )
// }
