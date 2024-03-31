import React from 'react';
import Input from '../pages/Input';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';



export default function SendCode() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
  };


  const sendCodeSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email(),
  });

  
  const onSubmit = async (values) => {
    try {
      const { data } = await axios.patch("https://ecommerce-node4-five.vercel.app/auth/sendcode", values);
      console.log(data);
      if (data.message === 'success') {
        toast.success('Log in successful', {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/ForgetPassword');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: sendCodeSchema,
  });

  const inputss = [
    {
      id: 'email',
      type: 'email',
      name: 'email',
      title: 'User Email',
      value: formik.values.email
    }
  ];

  const renderInput = inputss.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      key={index}
      onChange={formik.handleChange}
      errors={formik.errors}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));
  return (
    <>
      <div className='container'>
        <h2>Send Code</h2>
        <form onSubmit={formik.handleSubmit}>
          {renderInput}
          <button type='submit' disabled={!formik.isValid}>Send</button>
        </form>
      </div>
    </>
  );
}
