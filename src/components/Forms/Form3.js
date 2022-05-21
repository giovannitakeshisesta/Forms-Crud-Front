import { useEffect, useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputGroup from './InputGroup';
import { findByIdAndUpdate } from '../../services/form1.service';

const schema = yup.object({
    email: yup.string().email(),
}).required();

export default function  Form3 ({prefillValues,rerenderList}) {
    
    const [backErrors, setBackErrors]     = useState({})    
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

        findByIdAndUpdate(id,data)
        .then(()=> rerenderList())
        .catch((err)=> setBackErrors(err?.response?.data.errors) )
        .finally(() => setIsSubmitting(false) )
    }

    return (
        <form>
            <p>FORM 3 - EDIT</p>
            <InputGroup
                label="Email"
                id="email"
                type="email"
                register={register}
                error={backErrors?.email||errors.email?.message}
            />
            <button 
                className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}
                onClick={handleSubmit(onSubmit)}
                >
                {isSubmitting ? 'Editing...' : 'Edit'}
            </button>
        </form>      
    )
}

