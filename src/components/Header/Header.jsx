import React, { useEffect, useState } from 'react';
import logo from '../../assets/Airbnb-Logo.png';
import { MdLanguage, MdOutlineSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { viTriService } from '../../service/viTri.service';  // Import your location service
import { useNavigate } from 'react-router-dom';  // If using React Router for navigation
import './Header.scss';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [locations, setLocations] = useState([]);  // Store matching locations
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();  // Use this for navigation to another page

  // Fetch all locations (you could also debounce this for better UX)
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
    navigate(`/phong-thue/${id}`);
  };
  

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
      {/* left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <img
          src={logo}
          className='object-cover -my-2 w-40'
          alt="Airbnb Logo"
        />
      </div>

      {/* middle */}
      <div className="flex flex-col items-center md:border-2 rounded-full py-2 md:shadow-md relative">
        <div className="flex items-center w-full relative">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            type="text"
            placeholder="Bạn sắp đi đâu"
          />
          <button onClick={() => handleSearch(selectedLocation?.id)} className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2">
            <MdOutlineSearch />
          </button>
        </div>
        {locations.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-xl mt-14 w-full max-h-60 overflow-y-auto shadow-md z-10">
            {locations.map(location => (
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
        <p className="cursor-pointer hidden md:inline">Become a host</p>
        <MdLanguage className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border rounded-full px-4 py-4 hover:shadow-md transition-all">
          <GiHamburgerMenu className="h-6" />
          <FaUserCircle className="h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
