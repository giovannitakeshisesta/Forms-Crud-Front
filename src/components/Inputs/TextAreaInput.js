import React from 'react'

const TextAreaInput = ({name,error,register,rows,cols}) => {
  return (
    <div>
        <textarea  
            className={`form-control ${error ? 'is-invalid' : ''}`}
            { ...register(name) } 
            rows={rows} cols={cols}
        />
        
        <p className="invalid-feedback">{error}</p>
    </div>
  )
}

TextAreaInput.defaultProps = {
    rows:"3",
    cols:"50"
}

export default TextAreaInput