import React, { useEffect, useState } from 'react' 
import { findAllMixed, findByIdAndDelete, findByIdMixed } from '../services/form1.service';
import MixedForm     from '../components/Forms/MixedForm';
import MixedFormList from '../components/List/MixedFormList';


export default function MixedFormPage() {
  const [list, setList]=useState(null)
  const [prefillValues, setPrefillValues]= useState(null)
  
  useEffect(() => {
    rerenderList()
  }, []);
  
  const rerenderList = () => {
    findAllMixed()
    .then(response => setList(response.data))
  }

  const find = (id) => {
    findByIdMixed(id)
    .then(response => setPrefillValues(response.data))
  }

  const del = (id) => {
    findByIdAndDelete(id)
    .then(()=>rerenderList())
    .catch((err)=> console.log(err))
  }
    
  return (
    <div>
      <h1>MixedForm</h1>
      <p>to do: back array checkbox validation</p>
      <p>All the inputs have front and back end validations (form Model schema and http-errors like E11000),<br/> to check the back validation, you can comment the yup schema.</p>
      <div className='d-flex'> 

        <div className='formDiv'>
        <h2>Create</h2>
          <MixedForm
          rerenderList={rerenderList}
          /> 
        </div>
     
        <div className='formDiv'>
        <h2>Read - Delete</h2>
          {list ?
          <MixedFormList list={list} find={find} del={del}/>
          : 
          <p>...Loading</p>
          }
        </div>

        <div className='formDiv'>
        <h2>Update</h2>
        {prefillValues && 
          <MixedForm 
          prefillValues={prefillValues} 
          rerenderList={rerenderList}
          /> 
        }
        </div>
        
      </div>    
    </div>
  )
}
