import React from 'react'


function CategorieList({categories, filter, setFilter}) {

    const handleChange = (e) => {
        setFilter(e.target.value)
    }

    return (
        <>
            <select value={filter} onChange={(e) => 
                {handleChange(e)}}>
                <option value="">----</option>
                {
                    categories.map((cat) => {
                        return (
                            <option key={cat} value={cat}>{cat}</option>
                        )
                    })
                }
            </select>
        </>
    )
}

export default CategorieList;