import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
function Input({type='text',id,name,title,value,onChange,errors,onBlur,touched}) {
  return (
   <>
   <div className="input-group d-flex flex-column mb-3 ">
  <div><label htmlFor={id}>{title}</label></div>
  <div>  <input type={type} name={name} className="form-control" value={value} onChange={onChange} onBlur={onBlur} /></div>
<div>   
 {touched[name]&&errors[name]&& <p className='text text-danger'> {errors[name]}</p>}  
</div>  
 </div>
   </>

  )
}

export default Input