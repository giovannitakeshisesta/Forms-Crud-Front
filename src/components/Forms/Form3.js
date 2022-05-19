import { useEffect, useMemo, useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputGroup from './InputGroup';
import { create, findByIdAndUpdate } from '../../services/form1.service';

const getSchema = (prefillValues)=> {
    return yup.object().shape({
        email: yup.string().email().required()
    }).required();
}

export default function  Form3 ({prefillValues,rerenderList}) {
    
    const [backErrors, setBackErrors]     = useState({})    // back end errors
    const [isSubmitting, setIsSubmitting] = useState(false)

    const resolver = getSchema(prefillValues);
    const { register, handleSubmit,reset, formState:{ errors } } = useForm({
        defaultValues:prefillValues,
        resolver: yupResolver(resolver)
    });

    //when prefillvalues change reset allow the update
    useEffect(() => {
        reset(prefillValues);
    }, [prefillValues, reset]);

    const onSubmit = (data) => {
        const {id, email} = data
        setBackErrors({})
        setIsSubmitting(true)

        findByIdAndUpdate(id,data)
        .then(()=> rerenderList())
        .catch((err)=> setBackErrors(err?.response?.data) )
        .finally(() => setIsSubmitting(false) )
    }

    return (
        <form>
            <p>FORM 3 - EDIT</p>
            <InputGroup
                label="Email"
                id="email"
                register={register}
                error={backErrors.message||errors.email?.message}
                type="email"
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

