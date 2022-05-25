import React from 'react'

export default function Button({isSubmitting,handleSubmit,action, text}) {
  return (
    <button 
        className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}
        onClick={handleSubmit(action)}
        >
        {isSubmitting ? text : text}
    </button>
  )
}
