import React, { useContext } from 'react'
import InputCustom from '../../components/Input/InputCustom';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '../../service/auth.service';
import { setLocalStorage } from '../../util/util.js';
import { NotificationContext } from '../../App';
import { useDispatch } from 'react-redux';
import { getInfoUSer } from '../../redux/authSlide.js';
import { path } from '../../common/path.js';
const LoginPage = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const { showNotification } = useContext(NotificationContext)

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (value) => {
      try {
        const res = await authService.signIn(value);
        console.log(res);
        setLocalStorage('user', res.data.content);
        dispath(getInfoUSer(res.data.content));
        showNotification('Đăng nhập thành công', 'success', 2000);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (err) {
        console.log(err);
        showNotification(err.response.data.content, 'error');
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
      password: Yup.string().required('Vui lòng nhập password').min(6, 'Vui lòng nhập tối thiểu 6 ký tự').max(10, 'Vui lòng nhập tối đa 10 ký tự')
    })
  });
  
  return (
    <div className="min-h-screen flex items-center justify-center container mx-auto">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
      <form className='space-y-5' onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <InputCustom 
          lablecontent="Email" 
          placeholder="Vui lòng nhập email" 
          onChange={handleChange} 
          value={values.email} 
          name={'email'} 
          error={errors.email} 
          touched={touched.email} 
          handleBlur={handleBlur} 
        />
        <InputCustom 
          lablecontent="Password" 
          placeholder="Vui lòng nhập password" 
          typeInput='password' 
          onChange={handleChange} 
          value={values.password} 
          name={'password'} 
          error={errors.password} 
          touched={touched.password} 
          handleBlur={handleBlur} 
        />
        <div>
          <button type="submit" className="inline-block w-full bg-[#F72F5B] text-white py-2 px-5 rounded-md font-bold">Login</button>
          <Link className='mt-3 text-gray-500 inline-block hover:underline duration-300' to={path.signup}>Don't have an account? Press to here</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default LoginPage