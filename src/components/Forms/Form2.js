import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputGroup from './InputGroup';
import { create } from '../../services/form1.service';

const schema = yup.object({
  email: yup.string().email().required(),
}).required();

const Form2 = ({rerenderList}) => {
    const [backErrors, setBackErrors]     = useState({})    // back end errors
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setBackErrors({})
        setIsSubmitting(true)

        create(data)
        .then(()=> rerenderList())
        .catch((err)=> setBackErrors(err?.response?.data) )
        .finally(() => setIsSubmitting(false) )
    }
    
    return (
        <form>
            <p>FORM 2 - The same as before, but with an input component</p>

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
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>      
    )
}

export default Form2