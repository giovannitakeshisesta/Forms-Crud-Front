import React from 'react'

export default function CheckBoxInput({label,name,list,errors,register}) {
  return (
    <div className='mb-3'>
    <p>{label}</p>
    {list.map((el,index)=> {
        return (
            <div key={index} className="form-check form-check-inline">
                <input 
                className={ `form-check-input ${errors ? 'is-invalid' : ''} `}
                type="checkbox" 
                id={el} 
                value={el} 
                {...register(name)} 
                />

                <label 
                className="form-check-label" 
                htmlFor={el}
                >
                {el}
                </label>
            </div>
        )
    })}
    {errors && <p className="redText">{errors}</p>  }
    
    </div>  
  )
}
