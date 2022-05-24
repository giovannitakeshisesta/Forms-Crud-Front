import { useEffect, useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { findByIdAndUpdateMixed } from '../../services/form1.service';
import InputGroup from '../Inputs/InputGroup';
import RadioInput from '../Inputs/RadioInput';
import TextAreaInput from '../Inputs/TextAreaInput';


const schema = yup.object({
    email: yup.string().email().required(),
    name:yup.string().required().min(2),
    radioInput: yup.string().typeError('Required').required(''),
    description: yup.string().required('Required').min(2),
}).required();

const MixedFormEdit = ({prefillValues,rerenderList}) => {
    const [backErrors, setBackErrors]     = useState(false)   
    const [duplicateErr, setDuplicateErr] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit,reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues:prefillValues
    });

    //when prefillvalues change reset allows the update
    useEffect(() => {
        reset(prefillValues);
    }, [prefillValues, reset]);

    const onSubmit = (data) => {
        const {id} = data
        setBackErrors({})
        setDuplicateErr("")
        setIsSubmitting(true)

        findByIdAndUpdateMixed(id,data)
        .then(()=> rerenderList())
        .catch((err)=> {
            if (err.response.data.message.includes("Duplicate") ){
                setDuplicateErr(err.response.data.message)
            }
            setBackErrors(err?.response?.data.errors) 
        })
        .finally(() => setIsSubmitting(false))
    }

    return (
        <form>
            <p>FORM 5 EDIT</p>
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

            {/* TEXT AREA */}
            <TextAreaInput 
                name="description"
                error={backErrors?.description||errors.description?.message}
                register={register}
            />

            {/* BUTTON */}
            <button 
                className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}
                onClick={handleSubmit(onSubmit)}
                >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>      
    )
}

export default MixedFormEdit