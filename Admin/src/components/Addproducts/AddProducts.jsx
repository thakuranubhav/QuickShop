import React, { useState } from 'react'
import './AddProducts.css'
import upload_area from '../../assets/upload_area.svg'

const AddProducts = () => {

  const [image,setImage]=useState(false);

  const [productDetails,setProductDetails]= useState({
    name:"",
    image:"",
    category:"women",
    old_price:"",
    new_price:""

  })
  const imageHandler=(e)=>{
    setImage(e.target.files[0])

  }

  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

 const Add_Products = async () => {
  console.log(productDetails);
  let responseData;
  let product = productDetails;
  let formData = new FormData();
  formData.append('product', image);

  await fetch('http://localhost:3001/upload', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  })
    .then((resp) => resp.json())
    .then((data) => {
      responseData = data;
    });

  if (responseData.success) {
    product.image = responseData.image_url;
    console.log("Final product with image URL: ", product);

    await fetch('http://localhost:3001/products/addproduct', { // ✅ fixed here
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success
          ? alert("Product Added successfully")
          : alert("Failed to add product");
      });
  }
};


  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />

        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />

        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image? URL.createObjectURL(image) :upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={()=>{Add_Products()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProducts