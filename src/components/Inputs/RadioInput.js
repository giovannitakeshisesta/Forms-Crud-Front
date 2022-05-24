import React from 'react';

const RadioInput = ({list,errors, register, name}) => {
    return (
        <div>
            {list?.map((el,index)=> {
                return (
                <div key={index} className="form-check">
                    <input
                    className={ `${errors ? 'radioRed ' : ''} `}
                    {...register(name)}
                    type="radio"
                    id={el}
                    name={name}
                    value={el}/>
                    <label htmlFor={el}>{el}</label>
                </div>
                )
            })}
            <p className="redText">{errors}</p>

        </div>
    )
}

export default RadioInput;
