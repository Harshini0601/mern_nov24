import React from 'react'
import Child from'./child'


const Parent =()=>{
    return(
        <div>Parent class
            <Child name='john'
            age = {30}/>
            
            
        </div>
        //data flow is unidirectional only from parent to child
    )
}

export default Parent
//to use this function else where we have to export it
