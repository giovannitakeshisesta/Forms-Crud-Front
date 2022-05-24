import { useEffect, useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { findByIdAndUpdateMixed } from '../../services/form1.service';
import InputGroup from '../Inputs/InputGroup';
import RadioInput from '../Inputs/RadioInput';
import TextAreaInput from '../Inputs/TextAreaInput';
import CheckBoxInput from '../Inputs/CheckBoxInput';


const schema = yup.object({
    name:yup.string().required().min(2),
    email: yup.string().email().required(),
    age: yup.number().required().typeError('Required').min(1), 
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
        <p>MIXED FORM EDIT</p>
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

        {/* NUMBER */}
        <InputGroup
            label="Age"
            id="age"
            type="number"
            register={register}
            error={backErrors?.age||errors.age?.message}
        />

        {/* RADIO */}
        <RadioInput
            name="radioInput"
            list={["yes","no", "maybe"]}
            register={register}
            errors={backErrors?.radioInput||errors.radioInput?.message}
        />

        {/* TEXT AREA */}
        <TextAreaInput 
            name="description"
            error={backErrors?.description||errors.description?.message}
            register={register}
        />

        {/* CHECK BOX */}
        <CheckBoxInput
            name="checkBoxList"
            list={["a", "b", "c"]}
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