import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Product = ()=>{
    const [product, setProducts]=useState([])
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then((response)=>{
            console.log(response.data);
            setProducts(response.data);
            console.log("products:"+product)
        })
        .catch((error)=>{
            console.log(error);
        })

    },[])
    return(
        <div className='products'>
            {
                product.map((product)=>(
                    <div key={product.id} className='product'>
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                    <img src={product.image} alt={product.title} style={{width:'100px'}} />
                    </div>

                ))
            }
        </div>
    )
}
export default Product