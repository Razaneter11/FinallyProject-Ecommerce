import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../pages/Input'; 
import * as Yup from 'yup'; 

export default function ForgetPassword() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
    code: '',
  };

  const forgetpassword = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    code: Yup.string().required('Code is required'),
  });

  const onSubmit = async (values) => {
    
        const{data}=await axios.patch(`https://ecommerce-node4-five.vercel.app/auth/forgotPassword`,values); 
        if(data.message=='success'){
          navigate('/login');
        }
          
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: forgetpassword,
  });

  const inputss = [
    {
      id: 'email',
      type: 'email',
      name: 'email',
      title: 'User Email',
      value: formik.values.email,
    },
    {
      id: 'password',
      type: 'password',
      name: 'password',
      title: 'New Password',
      value: formik.values.password,
    },
    {
      id: 'code',
      type: 'text',
      name: 'code',
      title: 'Code',
      value: formik.values.code,
    },
  ];

  const renderinput=inputss.map((input,index)=>
  <Input type={input.type} 
  id={input.id} 
  name={input.name} 
  title={input.title} 
  value={input.value} 
  key={index}
  onChange={input.onchange || formik.handleChange} 
      errors={formik.errors} 
      onBlur={formik.handleBlur}
      touched={formik.touched}
  />
  )

  return (
    <div className='container'>
      <h2>Update Password</h2>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        {renderinput}
        <button type='submit' disabled={!formik.isValid}>
          Update Password
        </button>
      </form>
    </div>
  );
}
