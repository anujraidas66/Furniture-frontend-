import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useCreateProductMutation } from '../products/productApi'
import { Spinner } from '../../components/ui/spinner'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const valSchema = Yup.object({
  title: Yup.string().min(4).required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required('Price is required'),
  stock: Yup.number().required("Stock is required"),
  colors: Yup.array().min(1, "Select at least one color"),
  sizes: Yup.array().min(1, "Select at least one size"),
  category: Yup.string().required("Category is required"),
  sku: Yup.string().required("SKU is required"),
  tags: Yup.string().required("Tags are required"), // comma separated string
  images: Yup.mixed()
    .test('fileType', 'Unsupported File Format', (val) => {
      if (!val || val.length === 0) return true
      return val.every(file => ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type))
    })
    .test('fileSize', 'File too large', (val) => {
      if (!val || val.length === 0) return true
      return val.every(file => file.size <= 5 * 1024 * 1024)
    }),
})

export default function ProductAddForm() {
  const nav = useNavigate()
  const { user } = useSelector(state => state.userSlice)
  const [createProduct, { isLoading }] = useCreateProductMutation()

  const allColors = ['red', 'green', 'blue', 'yellow', 'black']
  const allSizes = ['small', 'medium', 'large', 'x-large']
  const [imagesPreview, setImagesPreview] = useState([])

  return (
    <Card className='w-full max-w-3xl mt-4 mx-auto'>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '',
            stock: '',
            category: '',
            sku: '',
            tags: '', // comma separated
            colors: [],
            sizes: [],
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
          
               formData.append('sku', values.sku)

              // convert comma separated tags → array
              const tagsArray = values.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag !== '')

              formData.append('tags', JSON.stringify(tagsArray))

              formData.append('colors', JSON.stringify(values.colors))
              formData.append('sizes', JSON.stringify(values.sizes))
              values.images.forEach(file => formData.append('images', file))

              await createProduct({ token: user.token, body: formData }).unwrap()
              toast.success('Product added successfully')
              nav(-1)
            } catch (err) {
              toast.error(err?.data?.message || 'Something went wrong')
            }
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, touched, errors }) => (
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

              {/* Title */}
              <div className='grid gap-2'>
                <Label htmlFor='title'>Title</Label>
                <Input id='title' name='title' value={values.title} onChange={handleChange} placeholder='Product title' />
                {touched.title && errors.title && <p className='text-red-500'>{errors.title}</p>}
              </div>

              {/* Description */}
              <div className='grid gap-2'>
                <Label htmlFor='description'>Description</Label>
                <textarea id='description' name='description' value={values.description} onChange={handleChange} placeholder='Enter description' className='border rounded p-2'/>
                {touched.description && errors.description && <p className='text-red-500'>{errors.description}</p>}
              </div>

              {/* Price & Stock */}
              <div className='grid gap-2'>
                <Label htmlFor='price'>Price</Label>
                <Input type='number' name='price' value={values.price} onChange={handleChange} placeholder='Product price'/>
                {touched.price && errors.price && <p className='text-red-500'>{errors.price}</p>}
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='stock'>Stock</Label>
                <Input type='number' name='stock' value={values.stock} onChange={handleChange} placeholder='Product stock'/>
                {touched.stock && errors.stock && <p className='text-red-500'>{errors.stock}</p>}
              </div>


               {/* SKU */}
              <div className='grid gap-2'>
                <Label>SKU</Label>
                <Input name='sku' value={values.sku} onChange={handleChange} />
                {touched.sku && errors.sku && <p className='text-red-500'>{errors.sku}</p>}
              </div>

              {/* Category */}
              <div className='grid gap-2'>
                <Label htmlFor='category'>Category</Label>
                <Input name='category' value={values.category} onChange={handleChange} placeholder='Category'/>
                {touched.category && errors.category && <p className='text-red-500'>{errors.category}</p>}
              </div>


               {/* Tags */}
              <div className='grid gap-2'>
                <Label>Tags (comma separated)</Label>
                <Input
                  name='tags'
                  value={values.tags}
                  onChange={handleChange}
                  placeholder='cotton, summer, men'
                />
                {touched.tags && errors.tags && <p className='text-red-500'>{errors.tags}</p>}
              </div>

              {/* Colors */}
              <div className='grid gap-2'>
                <Label>Colors</Label>
                <div className='flex gap-2 flex-wrap'>
                  {allColors.map(color => (
                    <label key={color} className='flex items-center gap-1'>
                      <input type='checkbox' value={color} checked={values.colors.includes(color)}
                        onChange={e => {
                          if (e.target.checked) setFieldValue('colors', [...values.colors, color])
                          else setFieldValue('colors', values.colors.filter(c => c !== color))
                        }}
                      />
                      <span className='capitalize'>{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className='grid gap-2'>
                <Label>Sizes</Label>
                <div className='flex gap-2 flex-wrap'>
                  {allSizes.map(size => (
                    <label key={size} className='flex items-center gap-1'>
                      <input type='checkbox' value={size} checked={values.sizes.includes(size)}
                        onChange={e => {
                          if (e.target.checked) setFieldValue('sizes', [...values.sizes, size])
                          else setFieldValue('sizes', values.sizes.filter(s => s !== size))
                        }}
                      />
                      <span className='capitalize'>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className='grid gap-2'>
                <Label htmlFor='images'>Images</Label>
                <Input type='file' multiple onChange={e => {
                  const files = Array.from(e.target.files)
                  setFieldValue('images', files)
                  setImagesPreview(files.map(f => URL.createObjectURL(f)))
                }} />
                <div className='flex gap-2 mt-2 flex-wrap'>
                  {imagesPreview.map((img,i) => <img key={i} src={img} alt='' className='w-24 h-24 object-cover rounded' />)}
                </div>
              </div>

              <Button type='submit' className='w-full mt-5'>{isLoading ? <Spinner /> : 'Create Product'}</Button>
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
// import { useCreateProductMutation } from '../products/productApi'
// import { Spinner } from '../../components/ui/spinner'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router'

// const valSchema = Yup.object({
//     title: Yup.string().min(4).required("Title is required"),
//     description: Yup.string().required("Description is required"),
//     price: Yup.string().required("Price is required"),
//     stock: Yup.string().required("Stock is required"),
//     color: Yup.string().required("Color is required"),
//     size: Yup.string().required("Size is required"),
//     category: Yup.string().required("Category is required"),
//     image: Yup.mixed()
//     .test('fileType', 'Unsupported File Format', (val) => {
//       return val && ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(val.type);
//     })
//     .test('fileSize', 'file is too large', (val) => {
//       return val && val.size <= 5 * 1024 * 1024;
//     })
//     .required(),
// });


// export default function ProductAddForm(){
//     const nav = useNavigate();
//     const [addProduct, {isLoading}] = useCreateProductMutation();
//     const  {user} = useSelector((state) => state.userSlice);
//   return (
//     <Card className='w-full max-w-md m-20'>
//       <CardHeader>
//         <CardTitle>Product Create</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Formik
//         initialValues={{
//             title:'',
//             description:'',
//             price:'',
//             stock:'',
//             color:'',
//             size:'',
//             category:'',
//             image:'',
//             imageReview:''
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
//             formData.append('image', val.image);

//             await addProduct({
//                 token: user.token,
//                 body: formData
//             }).unwrap();
//             toast.success('Product added successfully');
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
//                       placeholder="Enter Product price"
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

//     <Select
//     name="color"
//     onValueChange={(value)=>{
//       setFieldValue("color",value);
//     }}
//     >
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



//      <Select
//      name="size"
//       onValueChange={(value)=>{
//       setFieldValue("size",value);
//     }}
//      >
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

//                  <div className="grid gap-2">
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
//                     {values.imageReview && !errors.image && <img src={values.imageReview} alt="" />}
//                   </div>

//            {isLoading ? <Button size="sm" variant="outline"
//            disabled className="w-full mt-5" >
//             <Spinner/>
//             Submit
//            </Button> : <Button type='submit' className='w-full mt-5' >
//             Login
//             </Button>}

//           </div>
       
//         </form>
//             )}
//         </Formik>
        
//       </CardContent>
//     </Card>
//   )
// }


