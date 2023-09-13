import React, {createContext, useContext, useState, useEffect} from 'react'
import { Toast, toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({children})=>
{
    const [showCart, setshowCart] = useState(false);
    const [catyItems, setcatyItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantites, setTotalQuantites] = useState(0);
    const [qty, setQty] = useState(1);
    let foundProduct;
    let index;
    const onAdd = (product, quantity) =>
    {
        const checkProductInCart = catyItems.find((item)=>
        {
            item.id === product.id
        });
        settotalPrice((prevtotalPrice) => prevtotalPrice + product.price * quantity);
        setTotalQuantites((prevTotalQuantites) => prevTotalQuantites + quantity);

        if(checkProductInCart)
        {

            const updatedCartItems = catyItems.map((cartProducts)=>
            {
                if(cartProducts.id === product.id)return{
                    ...cartProducts,
                    quantity: cartProducts.quantity + quantity
                }
            })
            setcatyItems(updatedCartItems)
        }else
        {
            product.quantity = quantity;
            setcatyItems([...catyItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }
     const onRemove = (product) => {
    foundProduct = catyItems.find((item) => item._id === product._id);
    const newCartItems = catyItems.filter((item) => item._id !== product._id);

    settotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantites(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setcatyItems(newCartItems);
  }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = catyItems.find((item) => item._id === id)
        index = catyItems.findIndex((product) => product._id === id);
        const newCartItems = catyItems.filter((item) => item._id !== id)
    
        if(value === 'inc') {
          setcatyItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
          settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantites(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
          if (foundProduct.quantity > 1) {
            setcatyItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
            settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantites(prevTotalQuantities => prevTotalQuantities - 1)
          }
        }
      }
    const incQty = () =>
    {
        setQty((prevQty) => prevQty  + 1)
    }
    const decQty = () =>
    {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty  - 1
        })
    }
    return(
        <Context.Provider value={
            {showCart,
            setshowCart,
            catyItems, 
            totalPrice,
            totalQuantites,
            qty,
            onAdd,
            incQty,
            decQty,
            toggleCartItemQuanitity,
            onRemove,
            setTotalQuantites,
            setcatyItems,
            settotalPrice}
            }>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);