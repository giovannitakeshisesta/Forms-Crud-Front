import { useEffect, useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { findByIdAndUpdate2 } from '../../services/form1.service';
import InputGroup from './InputGroup';

const schema = yup.object({
    name:yup.string().required().min(2),
    email: yup.string().email().required(),
}).required();

const Form6 = ({prefillValues,rerenderList}) => {
    const [backErrors, setBackErrors]     = useState(false)   
    const [duplicateErr, setDuplicateErr] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit,reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues:prefillValues
    });

    //when prefillvalues change reset allow the update
    useEffect(() => {
        reset(prefillValues);
    }, [prefillValues, reset]);

    const onSubmit = (data) => {
        const {id} = data
        setBackErrors({})
        setIsSubmitting(true)

        findByIdAndUpdate2(id,data)
        .then(()=> rerenderList())
        .catch((err)=> {
            if (err.response.data.message ==='Already exists, msg from app.js' ){
                setDuplicateErr(true)
            }
            setBackErrors(err?.response?.data.errors) 
        })
        .finally(() => setIsSubmitting(false) )
    }
    
    console.log(backErrors);
    return (
        <form>
            <p>FORM 6 - EDIT</p>
            <InputGroup
                label="Name"
                id="name"
                type="name"
                register={register}
                error={backErrors?.name||errors.name?.message}
            />

            <InputGroup
                label="Email"
                id="email"
                type="email"
                register={register}
                error={backErrors?.email||errors.email?.message}
                duplicateErr={duplicateErr}
            />
            
            <button 
                className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}
                onClick={handleSubmit(onSubmit)}
                >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>      
    )
}

export default Form6