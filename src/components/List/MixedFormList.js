import React from 'react'

export default function MixedFormList({find, list, del}) {

  return (
    <div>
        {list? 
        list.map(el => {
            return (
                <div key={el.id}>
                  <div className='frcb mb-1'  >
                    <div onClick={()=> find(el.id) }>
                      <p>{el.name}</p>
                      <p>{el.email}</p>
                      <p>{el.age}</p>
                      <p>{el.radio}</p>
                      <p>{el.description}</p>
                      <p>{el.checkBoxList}</p>
                    </div>
                    <button
                    className='btn btn-danger'
                    onClick={()=> del(el.id)}
                    >
                      X
                    </button>
                  </div>
                  <hr/>
                </div>

            )
        })
        :
        <p>...Loading</p>
        }
    </div>
  )
}
