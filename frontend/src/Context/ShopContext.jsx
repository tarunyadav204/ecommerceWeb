import React, {createContext, useState} from 'react'
import all_product from "../Components/Assests/all_product";


export const ShopContext =  createContext(null);
const getDefaultCart = ()=>{
    let cart = {};
    for(let ind=0;ind<(all_product.length);ind++)
    {
        cart[ind] = 0;
    }
    return cart;
}



const ShopContextProvider = (props)=>{
    const [cartItems,setCartItems] = useState(getDefaultCart());

    let addCart = (itemId)=>{
         setCartItems((cart)=> ({...cart , [itemId] : cart[itemId] + 1}))
         console.log(cartItems);
    }
    let removeCart = (itemId)=>{
        setCartItems((cart)=> ({...cart , [itemId] : cart[itemId] - 1}))
   }

   const getTotalCart = ()=>{
    let total = 0;
    for(const item in cartItems)
    {
        if(cartItems[item] > 0)
        {
            let infoItem = all_product.find((product)=>product.id === Number(item))
            total+=infoItem.new_price * cartItems[item];
        }
    }
    return total;
}

const getCartNumber = () =>{
    let sum = 0;
    for(const item in cartItems)
    {
        if(cartItems[item] > 0)
        {
            //sum++;
            sum+=cartItems[item];
        }
    }
    return sum;
}

    const contextValue = {all_product , cartItems , addCart , removeCart , getTotalCart , getCartNumber};
     console.log(cartItems);
    return (
        <ShopContext.Provider value={ contextValue } >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;