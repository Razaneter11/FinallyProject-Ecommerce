import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import "./SignupForm.css";

export default function Signin() {
  const navigate =useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: '',
  });

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (values, { setStatus, setErrors, setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('userName', values.username);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('image', values.image);

      const API = "https://ecommerce-node4-five.vercel.app/auth/signup"
      const { data, status } = await axios.post(API, formData);
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
        navigate('/Login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ success: false });
      setErrors({ submit: 'There was an error submitting the form. Please try again.' });
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={user}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form encType="multipart/form-data">
          <label>Username</label>
          <Field type="text" name="username"  />
          <ErrorMessage name="username" component="div" className="error-message" />

          <label>Email</label>
          <Field type="email" name="email"  />
          <ErrorMessage name="email" component="div" className="error-message" />

          <label>Password</label>
          <Field type="password" name="password"/>
          <ErrorMessage name="password" component="div" className="error-message" />

          <label>Confirm Password</label>
          <Field type="password" name="confirmPassword"  />
          <ErrorMessage name="confirmPassword" component="div" className="error-message" />

          <label>Image</label>
          <input type="file" name="image" onChange={(e) => setFieldValue('image', e.target.files[0])} />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
