import React from 'react'

export default function Button({isSubmitting,handleSubmit,onSubmit}) {
  return (
    <button 
        className={`mb-3 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}
        onClick={handleSubmit(onSubmit)}
        >
        {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  )
}
