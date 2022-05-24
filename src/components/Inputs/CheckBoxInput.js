import React from 'react'

export default function CheckBoxInput({name, list,register}) {
  return (
    <div className=''>
    {list.map((el,index)=> {
        return (
            <div key={index}>
                <input 
                type="checkbox" 
                id={el} 
                value={el} 
                {...register(name)} />
                <p htmlFor={el} >{el} </p>
            </div>
        )
    })}
    </div>  
  )
}
