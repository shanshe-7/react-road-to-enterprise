import { Link } from 'react-router-dom'

function MainNavigation() {
  return (
    <div className='flex justify-evenly items-center border-cyan-400 border-2 h-20 mt-0'>
      <Link to='/products'>Browse Products</Link>
      <Link to='/products/2'>View Product</Link>
      <Link to='/products/add'>Add Product</Link>
      <Link to='/products/2/edit'>Edit Product</Link>{' '}
      <Link to='/products/2/delete'>Delete Product</Link>
    </div>
  )
}

export default MainNavigation
