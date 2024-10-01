import React, { useContext } from 'react'
import InputCustom from '../../components/Input/InputCustom'
import { useFormik } from 'formik'
import { authService } from '../../service/auth.service'
import { NotificationContext } from '../../App'
import { getLocalStorage, setLocalStorage } from '../../util/util'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getInfoUSer } from '../../redux/authSlide'
import { useLottie } from 'lottie-react'
import signAnimtion from '../../assets/animations/Animation - 1725019850248.json'
const AdminLoginPage = () => {
    const { showNotification } = useContext(NotificationContext)
    const navigate = useNavigate()
    const dispath = useDispatch()

    const options = {
        animationData: signAnimtion,
        loop: true
    };
    const { View } = useLottie(options);

    const { handleSubmit, handleChange, values } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (value) => {
            console.log(value)
            authService.signIn(value).then((res) => {
                console.log(res)
                if (res.data.content.user.role == "USER") {
                    showNotification('Ban khong co quyen truy cap', 'error', 2000)
                    let solanvipham = getLocalStorage('viPham')
                    if (!solanvipham) {
                        setLocalStorage('viPham', 1)
                    }else{
                        solanvipham++
                        solanvipham == 3 ? window.location.href = 'https://www.facebook.com/22112002.tlt' : 
                        setLocalStorage('viPham', solanvipham)
                    }
                } else {
                    setLocalStorage('user', res.data.content)
                    dispath(getInfoUSer(res.data.content))
                    navigate('/admin')

                }
            }).catch((err) => {
                console.log(err)
                showNotification('Tai khoan hoac mat khau khong chinh xac', 'error')
            })
        },
    })
    return (
        <div className="container mx-auto px-4">
            <div className="flex lg:flex-row h-screen items-center">
                <div className="hidden lg:block lg:w-1/2 bg-cover bg-center">
                {View}
                </div>
    
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center h-fit shadow-2xl py-10 px-4 rounded-md">
                    <h2 className="font-bold text-2xl mb-6">Đăng nhập dành cho ADMIN</h2>
                    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
                        <InputCustom
                            lablecontent="Tài khoản"
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            className="w-full"
                        />
                        <InputCustom
                            lablecontent="Mật khẩu"
                            typeInput="password"
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            className="w-full"
                        />
                        <div>
                            <button
                                type="submit"
                                className="py-3 px-5 w-full bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    
}

export default AdminLoginPage