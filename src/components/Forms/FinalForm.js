import React from 'react'
import { useEffect, useState } from 'react' 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputGroup from '../Inputs/InputGroup';
import Button from '../../Button';
import { createFinalForm,findByIdAndUpdateFinalForm } from '../../services/form.service';
import CheckBoxInput from '../Inputs/CheckBoxInput';
import TextAreaInput from '../Inputs/TextAreaInput';
import RadioInput from '../Inputs/RadioInput';

const getSchema = (prefillValues) => {
    return yup.object().shape({
        name:yup.string().required().min(2),
        email: yup.string().email().required(),
        age: yup.number().required().typeError('Required').min(1), 
        radioInput: yup.string().typeError('Required').required(''),
        description: yup.string().required('Required').min(2),
        checkBoxList:yup.array().typeError('Required').min(1, "min 1 required."),
        image: yup.lazy((value) => {
            if (!prefillValues?.image || prefillValues?.image !== value) {
                return yup.mixed()
                .test('required', 'Required', (value) =>{
                    return value && value.length
                } )
                .test("fileSize", "The file is too large", (value) => {
                    return value && value[0] && value[0].size <= 5000000;
                })
                .test("type", "We only support jpeg & png", function (value) {
                    return( value && value[0] && value[0]?.type === "image/jpeg")||(value[0]?.type === "image/png");
                })
            } else {
                return  yup.mixed();
            }
        })
    }).required()
};


export default function FinalForm({prefillValues,rerenderList}) {
    const resolver = getSchema(prefillValues);
    const [backErrors, setBackErrors]     = useState(false)   
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [duplicateErr, setDuplicateErr] = useState("")

    const { register, handleSubmit,reset, formState:{ errors } } = useForm({
        resolver: yupResolver(resolver),
        defaultValues:prefillValues
    });

    useEffect(() => {
        reset(prefillValues);
    }, [prefillValues, reset]);

    const setBackEndErrors = (err) =>{
        if (err.response.data.errors){
            return setBackErrors(err?.response?.data.errors) 
        }
        if (err.response.data.message?.includes("Duplicate") ){
            return setDuplicateErr(err.response.data.message)
        }
        if(err.response.data.message.includes("Image")){
            return setBackErrors({image:err.response.data.message}) 
        } 
    }

    const create = (data) => {
        setBackErrors({})
        setDuplicateErr("")
        setIsSubmitting(true)
        const bodyFormData = new FormData()
        const { image, ...rest } = data

        Object.keys(rest).forEach(key => {
            bodyFormData.append(key, rest[key])
            })
        if (image[0]) {
            bodyFormData.append('image', image[0])
        }

        createFinalForm(bodyFormData)
            .then(()=>{reset(); rerenderList()})
            .catch((err)=> setBackEndErrors(err))
            .finally(() => setIsSubmitting(false))
    }

    const update = (data) => {
        setBackErrors({})
        setDuplicateErr("")
        setIsSubmitting(true)

        const {id} = data
        const bodyFormData = new FormData()
        const { image, ...rest } = data

        Object.keys(rest).forEach(key => {
            bodyFormData.append(key, rest[key])
        })

        if (!image[0].length) {
            bodyFormData.append('image', image[0])
        } 

        findByIdAndUpdateFinalForm(id,bodyFormData)
            .then(()=> rerenderList())
            .catch((err)=> setBackEndErrors(err))
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

            {/* IMAGE */}
            <InputGroup
                label="Image"
                id="image"
                type="file"
                register={register}
                error={backErrors?.image || errors.image?.message}
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
