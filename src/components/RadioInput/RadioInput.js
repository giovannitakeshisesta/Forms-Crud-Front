import React from 'react';

const RadioInput = ({errors, register,label, name, id}) => {
    return (
        <div className="form-check">
            <input 
            className={ `${errors ? 'radioRed ' : ''} `}
            {...register(name)}
            type="radio"
            id={id}
            name={name}
            value={id}/>
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default RadioInput;
