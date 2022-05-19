import React from 'react'

export default function List1({find, list}) {

  return (
    <div>
        <p>List1:</p>
        {list? 
        list.map(el => {
            return (
                <p key={el.id} onClick={()=> find(el.id) }>
                {el.email}
                </p>
            )
        })
        :
        <p>...Loading</p>
        }
    </div>
  )
}
