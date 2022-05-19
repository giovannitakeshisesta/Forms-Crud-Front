import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { create } from '../../services/form1.service';

const schema = yup.object({
    email: yup.string().email().required(),
}).required();

const Form1 = () => {
    const [backErrors, setBackErrors]     = useState(false)    // back end errors
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setBackErrors()
        setIsSubmitting(true)

        create(data)
        .then((response)=> console.log(response))
        .catch((err)=> setBackErrors(err?.response?.data) )
        .finally(() => setIsSubmitting(false) )
    }

    return (
        <form>
            <p>FORM 1</p>
            
            <div className="mb-3">
                <label htmlFor="xxx" className="form-label">Email address</label>
                <input 
                    type="email" 
                    {...register("email")}
                    className={`form-control ${backErrors?.message  || errors.email?.message ? 'is-invalid' : ''}`}
                    id="xxx" 
                />
                <p className="invalid-feedback">{backErrors?.message  || errors.email?.message }</p>
            </div>

            <button 
                className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}
                onClick={handleSubmit(onSubmit)}
                >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>      
    )
}

export default Form1