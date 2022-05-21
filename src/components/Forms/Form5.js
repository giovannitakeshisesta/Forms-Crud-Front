import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { create2 } from '../../services/form1.service';
import InputGroup from './InputGroup';

const schema = yup.object({
    email: yup.string().email().required(),
    name:yup.string().required().min(2),
}).required();

const Form5 = ({rerenderList}) => {
    const [backErrors, setBackErrors]     = useState(false)    // back end errors
    const [duplicateErr, setDuplicateErr] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setBackErrors(false)
        setIsSubmitting(true)

        create2(data)
        .then(()=> rerenderList())
        .catch((err)=> {
            console.log(err);
            if (err.response.data.message ==='Already exists, msg from app.js' ){
                setDuplicateErr(true)
            }
            setBackErrors(err?.response?.data.errors) 
        })
        .finally(() => setIsSubmitting(false) )
    }

    return (
        <form>
            <p>FORM 5</p>
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

export default Form5