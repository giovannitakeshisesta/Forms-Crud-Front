import React from 'react'

export default function MixedFormList({find, list}) {

  return (
    <div>
        <p>MixedFormList:</p>
        {list? 
        list.map(el => {
            return (
                <p key={el.id} onClick={()=> find(el.id) }>
                {el.email}
                {el.name}
                </p>
            )
        })
        :
        <p>...Loading</p>
        }
    </div>
  )
}
