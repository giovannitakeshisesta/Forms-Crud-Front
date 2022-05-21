const InputGroup = ({ label, id, type, register, error ,duplicateErr}) => {
  console.log(error);
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <input
        type={type}
        id={id}
        {...register(id)}
        className={`form-control ${error || duplicateErr ? 'is-invalid' : ''}`}
      />
      
      <p className="invalid-feedback">{error}</p>  
      {duplicateErr &&  <p className="invalid-feedback">Duplicate error</p>}
    </div>
  )
}

InputGroup.defaultProps = {
  type: 'text'
}

export default InputGroup