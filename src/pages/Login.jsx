import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate } from 'react-router-dom';
import "./SignupForm.css";
import axios from 'axios'

export default function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


  const handleSubmit = async (values, { setStatus, setErrors, setSubmitting }) => {
    try {
      const API = "https://ecommerce-node4-five.vercel.app/auth/signin"
      const { data, status } = await axios.post(API, values)
      localStorage.setItem('userToken',data.token);
      console.log(data);
      if (status == 200 || data.message == "success") {
        setStatus({ success: true });
        setSubmitting(false);
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        navigate('/');
      }
    } catch (error) {
      console.log('Error submitting form:', error);
      toast.error(error.response.data.message)
      setStatus({ success: false });
      setErrors({ submit: 'There was an error submitting the form. Please try again.' });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      <Form>
        <label>Email</label>
        <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" className="error-message" />
        <label>Password</label>
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" className="error-message" />
        <button type="submit">Login</button>
        <button className='btn btn-outline-dark'><Link to='/sendcode'> Forget Password?</Link></button>
      </Form>
    </Formik>
  );
}
