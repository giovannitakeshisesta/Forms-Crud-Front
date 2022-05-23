import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createRadio } from '../../services/form1.service';
import '../../style/App.css'

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


export default function RadioSimple() {
    const schema = yup.object({
        radioInput: yup.string().typeError('Required').required('')
    }).required();

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log("hola radio", data.radioInput);
        createRadio(data)
        .then(()=>{})
        .catch(()=>{})
    }
    return (
        <form>
            <div className="form-group">
                <RadioInput
                    label="Yes"
                    name="radioInput"
                    id="yes"
                    errors={errors.radioInput}
                    register={register}
                />

                <RadioInput
                    label="No"
                    name="radioInput"
                    id="no"
                    errors={errors.radioInput}
                    register={register}
                />
                
                <p className="redText">{errors.radioInput?.message}</p>
            
                <button onClick={handleSubmit(onSubmit)}>Submit</button>
                
            </div>
        </form>
    )
}





