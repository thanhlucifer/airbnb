import React, { useEffect, useState } from 'react';
import logo from '../../assets/Airbnb-Logo.png';
import { MdLanguage, MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { viTriService } from '../../service/viTri.service';  // Import your location service
import { Link, useNavigate } from 'react-router-dom';  // If using React Router for navigation
import './Header.scss';
import { logout } from '../../redux/authSlide'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Avatar } from 'antd';
import { CiLogout } from "react-icons/ci";
import { path } from '../../common/path'
const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const { infoUser } = useSelector((state) => state.authSlide)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  // Menu khi chưa đăng nhập
  const guestMenuItems = [
    {
      label: <Link to={path.signin} className='flex space-x-2 items-center'>Đăng nhập</Link>,
      key: '0',
    },
    {
      label: <Link to={path.signup} className='flex space-x-2 items-center'>Đăng ký</Link>,
      key: '1',
    },
  ];

  // Menu khi đã đăng nhập
  const userMenuItems = [
    {
      label: <Link className='flex space-x-2 items-center' to={path.profile}><FaUserCircle /> <span>Thông tin cá nhân</span></Link>,
      key: '0',
    },
    {
      label: <Link onClick={handleLogout} className='flex space-x-2 items-center'><CiLogout /> <span>Đăng xuất</span></Link>,
      key: '1',
    },
  ];

  const checkuserLogin = () => {
    if (infoUser) {
      // Khi đã đăng nhập
      return (
        <div className="flex items-center space-x-2">
          {/* Dropdown thông tin người dùng */}
          <Dropdown
            menu={{ items: userMenuItems }}
            trigger={['click']}
          >
            <Avatar style={{
              backgroundColor: '#7265e6',
              verticalAlign: 'middle',
              cursor: 'pointer',
            }}
              size="small">{infoUser.user?.name.charAt(0).toUpperCase()}</Avatar>
          </Dropdown>
        </div>
      );
    } else {
      // Khi chưa đăng nhập
      return (
        <div className="flex items-center space-x-2">
          {/* Dropdown cho đăng nhập/đăng ký */}
          <Dropdown
            menu={{ items: guestMenuItems }}
            trigger={['click']}
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <GiHamburgerMenu className="h-6" />
              <FaUserCircle className="h-6" />
            </div>
          </Dropdown>
        </div>
      );
    }
  }

  useEffect(() => {
    if (searchInput) {
      viTriService.getAllVitri()
        .then(response => {
          const filteredLocations = response.data.content.filter(location =>
            location.tenViTri.toLowerCase().includes(searchInput.toLowerCase())
          );
          setLocations(filteredLocations);
        })
        .catch(error => {
          console.error("Error fetching locations", error);
        });
    } else {
      setLocations([]);  // Clear dropdown when input is empty
    }
  }, [searchInput]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setSearchInput(location.tenViTri);  // Update input with selected location
    setLocations([]);  // Hide dropdown
  };

  const handleSearch = (id) => {
    navigate(`/list-phong/${id}`);
  };

  const handleGoHome =()=>{
    navigate(`/`)
  }

  return (
    <header className='sticky top-0 z-50 grid grid-cols-2 md:grid-cols-3 bg-white shadow-md p-5 md:px-10'>
      {/* left */}
      <div className="relative hidden md:flex items-center h-10 cursor-pointer my-auto" onClick={handleGoHome}>
        <img
          src={logo}
          className='object-cover -my-2 w-40'
          alt="Airbnb Logo"
        />
      </div>

      {/* middle */}
      <div className="flex flex-col items-center border-2 rounded-full py-2 shadow-md relative">
        <div className="flex items-center w-full relative">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-full"
            type="text"
            placeholder="Bạn sắp đi đâu"
          />
          <div className="flex items-center">
            <button
              onClick={() => handleSearch(selectedLocation?.id)}
              className="flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
            >
              <MdOutlineSearch />
            </button>
          </div>
        </div>
        {locations.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-xl mt-14 w-full max-h-60 overflow-y-auto shadow-md z-10">
            {locations.map((location) => (
              <li
                key={location.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectLocation(location)}
              >
                {location.tenViTri}, {location.tinhThanh}, {location.quocGia}
              </li>
            ))}
          </ul>
        )}
      </div>


      {/* right */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="cursor-pointer hidden md:inline">Đón tiếp khách</p>
        <MdLanguage className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border rounded-full px-4 py-4 hover:shadow-md transition-all">
          {checkuserLogin()}
        </div>
      </div>
    </header>
  );
};

export default Header;
