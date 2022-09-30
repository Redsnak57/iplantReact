import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'

function AddProduct(){

    const [newProduct, setNewProduct] = useState({
        name: '',
        price : '',
        category: '',
        isBestSale : false,
        img: ''
    })

    const [category, setCategory] = useState([])

    const apiPath = "http://127.0.0.1/code/iplant/";

    useEffect(() => {
        axios.get(`${apiPath}?action=getCategory`).then((response) => {
            setCategory(response.data);
        })
    }, [])

    const handleChange = (value, index) => {
        const state = {...newProduct}
        state[index] = value
        setNewProduct(state)
    }

    const switchBest = () => {
        const state = {...newProduct}
        state.isBestSale = !state.isBestSale
        setNewProduct(state)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${apiPath}?action=addProduct`,newProduct).then((resp) => {
            if(resp.data === true){
                alert("Produit enregistré");
                setNewProduct({
                    name: '',
                    price : '',
                    category: '',
                    isBestSale : false,
                    img: ''
                });
            } else {
                alert("erreur");
            }
        })
    }

    return (
        <>
            <div className='addProductContainer'>
                <form action="" onSubmit={(e) => {handleSubmit(e)}}>
                    <input type="text" value={newProduct.name} onChange={(e) => handleChange(e.target.value, "name")} />

                    <input type="text" value={newProduct.price} onChange={(e) => handleChange(e.target.value, "price")} />

                    <select value={newProduct.category} onChange={(e) => handleChange(e.target.value, "category")}>
                        <option key="null" value="">-------</option>
                        {
                            category.map((cat) => {
                                return (
                                    <option key={cat.ID} value={cat.ID}>{cat.nom}</option>
                                )
                            })
                        }
                    </select>

                    <input type="checkbox" value={newProduct.isBestSale} checked={newProduct.isBestSale ? true : false} onChange={() => (switchBest())} />

                    <input type="text" value={newProduct.img} onChange={(e) => handleChange(e.target.value, "img")} />

                    <input type="submit" value="Enregistrer" />
                </form>
            </div>
   
        </>
    )

}

export default AddProduct