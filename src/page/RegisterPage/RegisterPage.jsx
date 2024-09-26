import React, { useContext, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../common/path.js';
import { NotificationContext } from '../../App';
import InputCustom from '../../components/Input/InputCustom';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../service/auth.service';
import useResponsive from '../../hook/useResponsive.jsx';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be numeric').required('Phone is required'),
  birthday: Yup.string().required('Birthday is required'),
  gender: Yup.boolean().required('Gender is required'),
});
const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "USER"
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      authService.signUp(values)
        .then((res) => {
          console.log('User created successfully:', res);
          showNotification('Đăng ký thành công', 'success');
          setTimeout(() => {
            navigate(path.signin); 
          }, 3000);
        })
        .catch((err) => {
          console.error('Error creating user:', err);
          showNotification(err.response.data.message || err.response.data.content, 'error');
        });
    }
  });


  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen mt-6">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
      <h2 className="font-semibold text-3xl mb-5 text-center">Create a new account</h2>
      <h3 className="text-gray-500 text-center mb-5">Already have an account? 
        <Link className="text-gray-500 inline-block hover:underline duration-300" to={path.signin}> Login</Link>
      </h3>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <InputCustom lablecontent="Name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.name && formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
  
        <InputCustom lablecontent="Email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
  
        <InputCustom lablecontent="Phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.phone && formik.errors.phone ? <div className="text-red-500">{formik.errors.phone}</div> : null}
  
        <InputCustom lablecontent="Password" typeInput="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
  
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
          <select name="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <option value={true}>Nam</option>
            <option value={false}>Nữ</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? <div className="text-red-500">{formik.errors.gender}</div> : null}
        </div>
  
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formik.values.birthday}
            className="border border-gray-400 rounded-md p-2 w-full"
            onChange={(event) => {
              const [year, month, day] = event.target.value.split('-');
              const valueDate = `${year}-${month}-${day}`;
              formik.setFieldValue('birthday', valueDate);
            }}
          />
          {formik.touched.birthday && formik.errors.birthday ? <div className="text-red-500">{formik.errors.birthday}</div> : null}
        </div>
  
        <div>
          <button type="submit" className="inline-block w-full bg-[#F72F5B] text-white py-2 px-5 rounded-md font-bold">Register</button>
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default RegisterPage

