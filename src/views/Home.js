import React from 'react'

export default function Home() {
  return (
    <div>
      <h1>CRUD FORMS</h1>
      <p className='mt-3'>You can use this page and repo in case you need an example of the most common forms input .</p>
      <p>Is a MERN CRUD done using Mongoose, Express, Axios, NodeJs, Javascript, React,React Hook Form.</p>
      <p>The design is the most simple as possible, so you can focus better on the code.</p>
      
      <ul className='mt-5'>We have 3 forms with the following fields.
        <li>text email number radio text area check box</li>
        <li>text image</li>
        <li>The last is the sum of the 2 forms.</li>
      </ul>
    <p>They are separated because the image input needs a  different solution.</p>

    <h5 className='mt-5'>Front end validations:  Yup & react hook form</h5>
    <p>Yup is a JavaScript schema builder for value parsing and validation. <br/>Define a schema, transform a value to match, validate the shape of an existing value, or both. </p>

    <h5 className='mt-3'>Back end validations:</h5>
    <p>- Mongoose built in validators of SchemaType and  Custom Error Messages.<br/></p>
    <p>- the unique option for schemas ,It's a convenient helper for building MongoDB unique indexes( like E11000).</p>

    <p className='mt-5'>to do : <br/>
      back end  checkbox validation, array length min 1.</p>
  </div>
  )
}
