import React, { useEffect, useState } from 'react'
import Form1 from '../components/Forms/Form1'
import Form2 from '../components/Forms/Form2'
import Form3 from '../components/Forms/Form3'
import List1 from '../components/List/List1'
import { findAll, findById } from '../services/form1.service'

export default function Page1() {
  const [list, setList]=useState(null)
  const [prefillValues, setPrefillValues]= useState(null)
  
  useEffect(() => {
    rerenderList()
  }, []);
  
  const rerenderList = () => {
    findAll()
    .then(response => setList(response.data))
  }

  const find = (id) => {
    findById(id)
    .then(response => setPrefillValues(response.data))
  }
  
  return (
    <div>
        <h1>Page One</h1>
        <div className='formDiv'> 
          <Form1/>
          <hr/>
          <Form2 rerenderList={rerenderList}/>
          <hr/>
          {list &&
          <List1 list={list} find={find}/>
          }
          <hr/>
          {prefillValues && 
          <Form3 prefillValues={prefillValues} rerenderList={rerenderList}/> 
          }
        </div>
    </div>
  )
}
