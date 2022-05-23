import { useState } from 'react' 
import { useForm }  from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createMixed } from '../../services/form1.service';
import RadioInput from '../Inputs/RadioInput';
import InputGroup from '../Inputs/InputGroup';


const schema = yup.object({
    name:yup.string().required().min(2),
    email: yup.string().email().required(),
    radioInput: yup.string().typeError('Required').required(''),
}).required();

const MixedForm = ({rerenderList}) => {
    const [backErrors, setBackErrors]     = useState(false)    // back end errors
    const [duplicateErr, setDuplicateErr] = useState("")  
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setBackErrors(false)
        setDuplicateErr("")
        setIsSubmitting(true)

        createMixed(data)
        .then(()=> rerenderList())
        .catch((err)=> {
            if (err.response.data.message.includes("Duplicate") ){
                setDuplicateErr(err.response.data.message)
            }
            setBackErrors(err?.response?.data.errors) 
        })
        .finally(() => setIsSubmitting(false) )
    }

    return (
        <form>
            <p>FORM 5</p>
            {/* NAME */}
            <InputGroup
                label="Name"
                id="name"
                type="name"
                register={register}
                error={backErrors?.name||errors.name?.message}
                duplicateErr={duplicateErr}
            />

            {/* EMAIL */}
            <InputGroup
                label="Email"
                id="email"
                type="email"
                register={register}
                error={backErrors?.email||errors.email?.message}
                duplicateErr={duplicateErr}
            />

            {/* RADIO */}
            <RadioInput
                label="Yes"
                name="radioInput"
                id="yes"
                errors={backErrors?.radioInput||errors.radioInput?.message}
                register={register}
            />

            <RadioInput
                label="No"
                name="radioInput"
                id="no"
                errors={backErrors?.radioInput||errors.radioInput?.message}
                register={register}
            />
            <p className="redText">{backErrors?.radioInput||errors.radioInput?.message}</p>
   
            

            <button 
                className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}
                onClick={handleSubmit(onSubmit)}
                >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>      
    )
}

export default MixedForm