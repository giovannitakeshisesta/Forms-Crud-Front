import React, { useEffect, useState } from 'react' 
import List from '../components/List/List';
import { findAllFinalForm, findByIdAndDeleteFinalForm, findByIdFinalForm } from '../services/form.service';
import FinalForm from '../components/Forms/FinalForm'

export default function FinalFormPage() {
  const [list, setList]=useState(null)
  const [prefillValues, setPrefillValues]= useState(null)

  useEffect(() => {
    rerenderList()
  }, []);
  
  const rerenderList = () => {
    findAllFinalForm()
    .then(response => setList(response.data))
  }

  const find = (id) => {
    findByIdFinalForm(id)
    .then(response => setPrefillValues(response.data))
    .catch((err)=> console.log(err))
  }

  const del = (id) => {
    findByIdAndDeleteFinalForm(id)
    .then(()=>rerenderList())
    .catch((err)=> console.log(err))
  }

  return (
    <div>
      <h1>FinalForm</h1>
      <div className='d-flex'>
        <div className='formDiv'>
          <h2>Create</h2>
          <FinalForm  rerenderList={rerenderList}/>
        </div>

        <div className='formDiv'>
          <h2>Read - Delete</h2>
            {list ?
            <List list={list} find={find} del={del}/>
            :
            <p>...Loading</p>
            }
        </div>

        <div className='formDiv'>
          <h2>Update</h2>
          {prefillValues && 
          <FinalForm rerenderList={rerenderList} prefillValues={prefillValues} />
          }  
        </div>
      </div>
    </div>
  )
}
