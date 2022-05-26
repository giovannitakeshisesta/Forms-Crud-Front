import React, { useEffect, useState } from 'react' 
import ImageInput from '../components/Forms/ImageInput';
import List from '../components/List/List';
import { findAllImage, findByIdAndDeleteImage, findByIdImage } from '../services/form1.service';

export default function ImageInputPage() {
  const [list, setList]=useState(null)
  const [prefillValues, setPrefillValues]= useState(null)

  useEffect(() => {
    rerenderList()
  }, []);
  
  const rerenderList = () => {
    findAllImage()
    .then(response => setList(response.data))
  }

  const find = (id) => {
    findByIdImage(id)
    .then(response => setPrefillValues(response.data))
    .catch((err)=> console.log(err))
  }

  const del = (id) => {
    findByIdAndDeleteImage(id)
    .then(()=>rerenderList())
    .catch((err)=> console.log(err))
  }

  return (
    <div>
      <h1>Image input</h1>
      <div className='d-flex'>
        <div className='formDiv'>
          <h2>Create</h2>
          <ImageInput  rerenderList={rerenderList}/>
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
          <ImageInput rerenderList={rerenderList} prefillValues={prefillValues} />
          }  
        </div>
      </div>
    </div>
  )
}
