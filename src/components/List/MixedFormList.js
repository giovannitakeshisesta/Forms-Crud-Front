import React from 'react'

export default function MixedFormList({find, list}) {

  return (
    <div>
        {list? 
        list.map(el => {
            return (
                <p key={el.id} onClick={()=> find(el.id) }>
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
