import { useEffect, useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createMixed, findByIdAndUpdateMixed } from '../../services/form1.service';
import InputGroup    from '../Inputs/InputGroup';
import RadioInput    from '../Inputs/RadioInput';
import TextAreaInput from '../Inputs/TextAreaInput';
import CheckBoxInput from '../Inputs/CheckBoxInput';
import Button        from '../../Button';


const schema = yup.object({
    name:yup.string().required().min(2),
    email: yup.string().email().required(),
    age: yup.number().required().typeError('Required').min(1), 
    radioInput: yup.string().typeError('Required').required(''),
    description: yup.string().required('Required').min(2),
    checkBoxList:yup.array().typeError('Required').min(1, "min 1 required.")
}).required();


const MixedForm = ({prefillValues,rerenderList}) => {
    const [backErrors, setBackErrors]     = useState(false)   
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [duplicateErr, setDuplicateErr] = useState("")

    const { register, handleSubmit,reset, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues:prefillValues
    });

    //when prefillvalues changes, reset() allows the list update
    useEffect(() => {
        reset(prefillValues);
    }, [prefillValues, reset]);

    const create = (data) => {
        setBackErrors(false)
        setDuplicateErr("")
        setIsSubmitting(true)

        createMixed(data)
        .then(()=> {reset(); rerenderList()})
        .catch((err)=> {
            if (err.response.data.message.includes("Duplicate") ){
                setDuplicateErr(err.response.data.message)
            }
            setBackErrors(err?.response?.data.errors) 
        })
        .finally(() => setIsSubmitting(false) )
    }

    const update = (data) => {
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
        {/* NAME */}
        <InputGroup
            label="Text"
            id="name"
            type="text"
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
            label="Number"
            id="age"
            type="number"
            register={register}
            error={backErrors?.age||errors.age?.message}
        />

        {/* RADIO */}
        <RadioInput
            label="Radio"
            name="radioInput"
            list={["yes","no", "maybe"]}
            register={register}
            errors={backErrors?.radioInput||errors.radioInput?.message}
        />

        {/* TEXT AREA */}
        <TextAreaInput 
            label="TextArea"
            name="description"
            register={register}
            error={backErrors?.description||errors.description?.message}
        />

        {/* CHECK BOX */}
        <CheckBoxInput 
            label="Check Box"
            name="checkBoxList"
            list={["a", "b", "c"]}
            register={register}
            errors={backErrors?.checkBoxList||errors.checkBoxList?.message}
        />

        {/* BUTTON */}
        {prefillValues ?
        <Button 
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        action={update}
        text="Edit"
        /> 
        :
        <Button 
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        action={create}
        text="Submit"
        /> 
        }
    </form>     
    )
}

export default MixedForm