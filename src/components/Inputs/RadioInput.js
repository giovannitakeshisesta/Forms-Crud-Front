import React from 'react';

const RadioInput = ({label,list,errors, register, name}) => {
    return (
    <div className='mb-3'>
        <p>{label}</p>
        {list?.map((el,index)=> {
            return (
            <div key={index} className="form-check form-check-inline">
                <input
                className={ `form-check-input ${errors ? 'is-invalid'  : ''} `}
                {...register(name)}
                type="radio"
                id={el}
                name={name}
                value={el}
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
        <p className="redText">{errors}</p>

    </div>
    )
}

export default RadioInput;
