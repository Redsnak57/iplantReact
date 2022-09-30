import React from 'react'
import { useState } from 'react';
import './index.css';

function Cart({cart}) {

    const [isOpen, setIsOpen] = useState(false)
    const toggleCart = () => {
        setIsOpen(!isOpen)
    }

  return ( 
    <>
            <div className={isOpen ? "cartContainer" : "cartContainer cartContainerClosed"}>
                <button className="toggleCartButton" onClick={() => toggleCart()}>
                    {
                        isOpen ? "Fermer" : "Ouvrir"
                    }
                </button>
                <ul>
                    {isOpen && cart.map((product, index) => {
                        return <li 
                        key={`${product.name}-${index}`}>
                            <span>
                                {product.name}
                            </span>
                            <span>
                                 {product.price}€
                            </span>
                            <span>
                                x
                            </span>
                            <span>
                                {product.amount}
                            </span>
                        </li>
                    })}
                </ul>
                <div>
                    {isOpen && "Total :" + cart.reduce((acc, product) => 
                        acc+product.price * product.amount
                        , 0

                    )+"€" }
                </div>
            </div>
        </>
  )
}

export default Cart