import React, { useEffect, useState } from 'react'
import Form4 from '../components/Forms/Form4'
import Form5 from '../components/Forms/Form5'
import Form6 from '../components/Forms/Form6'
import List1 from '../components/List/List1'
import { findAll2, findById2 } from '../services/form1.service'

export default function Page2() {
  const [list, setList]=useState(null)
  const [prefillValues, setPrefillValues]= useState(null)
  
  useEffect(() => {
    rerenderList()
  }, []);
  
  const rerenderList = () => {
    findAll2()
    .then(response => setList(response.data))
  }

  const find = (id) => {
    findById2(id)
    .then(response => setPrefillValues(response.data))
  }

  console.log(prefillValues);
  return (
    <div>
      <h1>Page2</h1>
      <div className='formDiv'> 
        <Form4 /> 
        <hr/>
        <Form5 /> 
        <hr/>
        {list ?
        <List1 list={list} find={find}/>
        : <p>...Loading</p>
        }
        <hr/>
        <Form6 prefillValues={prefillValues} rerenderList={rerenderList}/> 

      </div>    
    </div>
  )
}
