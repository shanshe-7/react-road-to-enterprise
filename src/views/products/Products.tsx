import { Link, Route, Routes } from 'react-router-dom'
import AddProduct from './components/AddProduct'
import DeleteProduct from './components/DeleteProduct'
import EditProduct from './components/EditProduct'
import ViewProduct from './components/ViewProduct'

function Products() {
  return (
    <>
      <div className='flex justify-center items-center mt-0  border-2'>
        <Routes>
          <Route path='products'>
            <Route index element={<div>name</div>} />
            <Route path='add' element={<AddProduct />} />
            <Route path='2' element={<ViewProduct />} />
            <Route path='2/edit' element={<EditProduct />} />
            <Route path='2/delete' element={<DeleteProduct />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default Products
