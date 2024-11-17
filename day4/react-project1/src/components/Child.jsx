import React from 'react'

const Child =(props)=>{
    return(
        <div>(Child) Name: {props.name} {props.age}</div>
        //props is used to send data from one component to another component. it is properties
    )
}

export default Child
//to use this function else where we have to export it