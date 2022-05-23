import React, { useEffect, useState } from 'react' 
import MixedForm from '../components/Forms/MixedForm';
import MixedFormEdit from '../components/Forms/MixedFormEdit';
import MixedFormList from '../components/List/MixedFormList';
import { findAllMixed, findByIdMixed } from '../services/form1.service';


export default function Page3() {
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
    
  console.log("prefillValues",prefillValues);
  return (
    <div>
      <h1>Page 4</h1>
      <div className='formDiv'> 

        <MixedForm rerenderList={rerenderList}/> 
        <hr/>
        {list ?
        <MixedFormList list={list} find={find}/>
        : <p>...Loading</p>
        }
        <hr/>
        <MixedFormEdit prefillValues={prefillValues} rerenderList={rerenderList}/>
      </div>    
    </div>
  )
}
