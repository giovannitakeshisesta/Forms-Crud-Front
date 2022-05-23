import React, { useEffect, useState } from 'react' 
import RadioSimple from '../components/RadioInput/RadioSimple'
import RadioEdit from '../components/RadioInput/RadioEdit'
import { findByIdRadio } from '../services/form1.service';

export default function Page3() {
    const [selected, setSelected]= useState()

    useEffect(() => {
        findByIdRadio("628bafbfd6c01b3cc0d7c473")
        .then((res)=>setSelected(res.data))
        .catch((err)=>console.log(err))
    }, []);
    
  return (
    <div>
        <h1>Page3</h1>
        {/* <RadioSimple/> */}
        <hr/>
        {/* {selected && selected} */}
        <RadioEdit prefillValues={selected}/>
    </div>
  )
}
