import React, { useEffect } from 'react'
import useRouteCostom from './hook/useRoutesCustom'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const NotificationContext = React.createContext();
function App() {
  const routes = useRouteCostom();
  const showNotification = (content, type, duration = 5000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    })
  }

  return <>
    <NotificationContext.Provider value={{ showNotification: showNotification }}>
      <ToastContainer />
      {routes}
    </NotificationContext.Provider>
  </>
}

export default App
