import { useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { create2 } from '../../services/form1.service';

const schema = yup.object({
    email: yup.string().email().required(),
    name:yup.string().required().min(2),
}).required();

const Form4 = () => {
    const [backErrors, setBackErrors]     = useState(false)    // back end errors
    const [duplicateErr, setDuplicateErr] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setBackErrors()
        setIsSubmitting(true)

        create2(data)
        .then((response)=> console.log(response))
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
            <p>FORM 1</p>
            
            <div className="mb-3">
                <label htmlFor="xxx" className="form-label">Email address</label>
                <input 
                    type="email" 
                    {...register("email")}
                    className={`form-control ${backErrors?.email  || errors.email?.message ? 'is-invalid' : ''}`}
                    id="xxx" 
                />
                <p className="invalid-feedback">{backErrors?.email  || errors.email?.message }</p>
            </div>

            <div className="mb-3">
                <label htmlFor="yyy" className="form-label">First Name</label>
                <input 
                    type="text" 
                    {...register("name")}
                    className={`form-control ${backErrors?.name  || errors.name?.message ? 'is-invalid' : ''}`}
                    id="yyy" 
                />
                <p className="invalid-feedback">{backErrors?.name  || errors.name?.message }</p>
            </div>

            {duplicateErr && <p>duplicateErr</p>}
            <button 
                className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}
                onClick={handleSubmit(onSubmit)}
                >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>      
    )
}

export default Form4