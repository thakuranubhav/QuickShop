import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allproducts,setAllproducts]=useState([]);
  const fetchInfo = async () => {
  try {
    const res = await fetch('http://localhost:3001/products/allproducts');
    const data = await res.json();
    console.log("Fetched data:", data); // Debug here
    setAllproducts(data.products); // Adjust based on actual response
  } catch (err) {
    console.error('Failed to fetch products:', err);
  }
};

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_Product= async (id)=>{
    await fetch('http://localhost:3001/products/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })

    await fetchInfo();
    console.log("item deleted")

  }
  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product)=>{
          return <> <div key={product.id} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>{product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_Product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />


          </div>
          <hr />
          </>


        })}

      </div>
    </div>
  )
}

export default ListProduct