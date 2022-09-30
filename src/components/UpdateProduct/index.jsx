import axios from "axios";
import React, {useEffect, useState} from "react"
import { useParams} from "react-router-dom"

function UpdateProduct(){

    const[category, setCategory] = useState([])
    const[prod,setProd] = useState({
        name: '',
        price : '',
        category: '',
        isBestSale : "",
        img: ''
    })

    const {ID} = useParams();

    useEffect(() => {
        axios.get("http://127.0.0.1/code/iplant/?action=getCategory").then((resp) => {
            setCategory(resp.data);
        })

        axios.get(`http://127.0.0.1/code/iplant/?action=getProduct&ID=${ID}`).then((resp) => {
            setProd(resp.data);
        })
    }, [ID])

    const handleChange = (value, index) => {
        const state = {...prod}
        state[index] = value
        setProd(state)
    }

    const switchBest = () => {
        const state = {...prod}
        state.isBestSale = !state.isBestSale
        setProd(state)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://127.0.0.1/code/iplant/?action=updateProduct&ID=${prod.ID}`, prod).then((resp) => {
            if(resp.data === true){
                alert("Modification effectuée")
            } else {
                alert("Erreur")
            }
        })
    }

    return (
        <>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                    <input type="text" value={prod.name} onChange={(e) => {handleChange(e.target.value, "name")}}/>

                    <input type="text" value={prod.price} onChange={(e) => {handleChange(e.target.value, "price")}}/>

                    <select value={prod.category} onChange={(e) => {handleChange(e.target.value, "category")}}>
                        <option key="null" value="">-------</option>
                        {
                            category.map((cat) => {
                                return (
                                    <option key={cat.ID} value={cat.ID}>{cat.nom}</option>
                                )
                            })
                        }
                    </select>

                    <input type="checkbox" value={prod.isBestSale} checked={prod.isBestSale ? true : false} onChange={() => {switchBest()}}/>

                    <input type="text" value={prod.img} onChange={(e) => {handleChange(e.target.value, "img")}}/>

                    <input type="submit" value="Modifier" />
            </form>
        </>
    );

}

export default UpdateProduct