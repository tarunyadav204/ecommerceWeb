import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.svg"
const AddProduct = () => {

  const [image,setImage] = useState(false);
  const [productdetails,setProductdetails] = useState({
    name:"",
    image:"",
    new_price:"",
    old_price:"",
    category:"women"
  })

  const imageHandle = (e)=>{
        setImage(e.target.files[0]);      
  }

 const changeHandle = (e)=>{
  setProductdetails( (prev)=> ({...prev , [e.target.name] : e.target.value}));
 }

 const handleSubmit =  async (e)=>{
  let product = productdetails;
    let formData = new FormData();
    formData.append("product", image);
    try{
      const response = await fetch("http://localhost:4000/upload", {
            method: "POST",
            body: formData,
        });
        const responseData = await response.json();
        console.log("ResponseData" , responseData);

        if(responseData.success){
         product.image = responseData.image_url;
        console.log("Product with updated image:", product);
          const addProductResponse = await fetch("http://localhost:4000/addproduct", {
              method: "POST",
             headers: {
                  "Content-Type": "application/json",
              },
              body:  JSON.stringify(product),
          });
          const addProductData = await addProductResponse.json();
          console.log("Add Product Response:", addProductData);
          if(addProductData.success)
          {
            alert("Product Added");
          }
          else{
            alert("Failed to Add Product");
          }
      }

        }
    catch (error) {
      console.error("Error:", error);
  }
 }
 
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" value={productdetails.name} name='name' placeholder='Type here' onChange={changeHandle}/>
        
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input type="text" name='old_price'value={productdetails.old_price} placeholder='Type here' onChange={changeHandle} />
        </div>

        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input type="text" name='new_price'value={productdetails.new_price} placeholder='Type here' onChange={changeHandle} />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select name="category"  className='add-product-selector' value={productdetails.category} onChange={changeHandle}>
            <option value="kid">Kid</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} alt=""  className='addproduct-thumnail-img' />
        </label>
        <input onChange={imageHandle} type="file" name='image' id='file-input' value={productdetails.image}  hidden/>
      </div>
      <button onClick={handleSubmit} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct