import React, { useState } from 'react';
import CategorieList from "../CategorieList/"
import {Link } from 'react-router-dom';

import { AiFillFire, AiOutlineFire } from 'react-icons/ai';

import './index.css';
import { useEffect } from 'react';
import axios from 'axios';

function Product({cart, setCart}){

    const [filter, setFilter] = useState("");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1/code/iplant/?action=getProducts").then((resp) =>{
            setProducts(resp.data);
        })
    }, [])

    const handleDelete = (ID) => {
        axios.delete(`http://127.0.0.1/code/iplant/?action=deleteProduct&ID=${ID}`).then((resp) => {
            if(resp.data === true){
                const newState = products.reduce((acc,prod) => prod.ID === ID ? acc : acc.concat(prod), [])
                setProducts(newState)
            } else {
                alert("erreur")
            }
        })
    }
    

    const categories = products.reduce((acc, plant) => 
         acc.includes(plant.category) ? acc : acc.concat(plant.category), []
    )

    const handleClick = (product) => {
        const addedPlantSaved = cart.find((prod) => prod.name === product.name )

        if(addedPlantSaved){
            const filteredCart = cart.filter((cartItem) => cartItem.name !== product.name)
            setCart([...filteredCart, {...addedPlantSaved, amount : addedPlantSaved.amount +1}])
        } else {
            const newProduct = {...product, amount : 1}
            setCart([...cart, newProduct]);
        }
    }

    return (
        <>
            <div className="productCategorie">

                <CategorieList categories={categories} filter={filter} setFilter={setFilter}/>

                <ul className="productContainer">
                    {
                        products.map((product) => {
                            return (filter === product.category) || (filter === "") ? 
                            (
                                <li key={product.ID}>
                                    <div className="price">{product.price} €</div>
                                    <img src={`./img/${product.img}`} alt={`${product.name}-img`} />
                                    {product.name}  
                                    {product.isBestSale ? <AiFillFire className='fillIcon'/> : <AiOutlineFire/>}
                                    <button 
                                    className="productButton" onClick={() => handleClick(product)}>+Ajouter
                                    </button>
                                    <Link to={`/products/update/${product.ID}`}>
                                        <button 
                                            className="productButton">
                                            Modifier
                                        </button>
                                    </Link>
                                    <button className='productButton' onClick={() => {handleDelete(product.ID)}}>
                                        Supprimer
                                    </button>
                                </li>
                            ) 
                                : null
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Product;
