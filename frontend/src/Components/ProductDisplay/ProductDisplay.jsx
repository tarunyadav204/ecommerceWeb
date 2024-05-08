import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
const ProductDisplay = ({product}) => {

    const {addCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
     <div className="productdisplay-left">
       
       <div className="productdisplay-img-list">
            <img src={product.image} alt='' />
            <img src={product.image} alt='' />
            <img src={product.image} alt='' />
            <img src={product.image} alt='' />
       </div>

       <div className='productdisplay-img'>
          <img className='productdisplay-main-img' src={product.image} alt="" />
       </div>
     </div>

     <div className="product-display-right">
             <h1>{product.name}</h1>
             <div className="productdisplay-right-star">
                 <img src={star_icon} alt="" />
                 <img src={star_icon} alt="" />
                 <img src={star_icon} alt="" />
                 <img src={star_icon} alt="" />
                 <img src={star_dull_icon} alt="" />
                 <p>(122)</p>
             </div>
              
              <div className="productdisplay-right-prices">
                 <div className="productdisplay-right-price-old">
                     ${product.old_price}
                 </div>
                 <div className="productdisplay-right-price-new">
                     ${product.new_price}
                 </div>
              </div>
               
               <div className="productdisplay-right-description">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium ducimus rem odit totam, provident officiis libero ullam eius vitae eveniet maiores, architecto distinctio sunt eligendi, molestias excepturi iusto qui omnis cupiditate? Adipisci, minus consequatur aperiam, ut odit placeat consequuntur animi expedita, quo dolores necessitatibus dolorum aliquam temporibus rerum obcaecati.
               </div>

               <div className="productdisplay-right-size">
                  <h1>Select Size</h1>
                  <div className="productdisplay-right-size">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                  </div>
               </div>
               <button onClick={()=>{
                  addCart(product.id);
               }}>ADD TO CART</button>
               <p className='productdisplay-right-category'><span>Category : </span>Women, T-Shirt, Crop Top</p>
               <p className='productdisplay-right-category'><span>Tags : </span>Mordern, Latest</p>
     </div>
    </div>
  )
}

export default ProductDisplay