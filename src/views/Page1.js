import React, { useEffect, useState } from 'react' 
import MixedForm from '../components/Forms/MixedForm';
import MixedFormEdit from '../components/Forms/MixedFormEdit';
import MixedFormList from '../components/List/MixedFormList';
import { findAllMixed, findByIdMixed } from '../services/form1.service';


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
    
  return (
    <div>
      <h1>MixedFormPage</h1>
      <div className='d-flex'> 

        <div className='formDiv'>
        <h2>Create</h2>
          <MixedForm rerenderList={rerenderList}/> 
        </div>
     
        <div className='formDiv'>
        <h2>Read</h2>
          {list ?
          <MixedFormList list={list} find={find}/>
          : <p>...Loading</p>
          }
        </div>

        <div className='formDiv'>
        <h2>Update</h2>
          <MixedFormEdit 
          prefillValues={prefillValues} 
          rerenderList={rerenderList}
          /> 
        </div>
        
      </div>    
    </div>
  )
}
