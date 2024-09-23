import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { phongthueService } from '../../service/phongthue.service';
import MapComponent from '../../components/MapBox/MapComponent';
import { FaStar, FaAngleRight , FaAngleLeft, FaRegClipboard, FaMapMarkerAlt  } from "react-icons/fa";
import { Marker } from 'react-map-gl';
const RentalRoomList = () => {
  const { id } = useParams();  // Get the location ID from the URL
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const [error, setError] = useState(null);  // State for error handling
  const [isFullMap, setIsFullMap] = useState(false);
  const [map, setMap] = useState(false);
  useEffect(() => {
    setLoading(true);
    phongthueService.layphongthueVitri(id)
      .then(response => {
        setRooms(response.data.content);
        setLoading(false);
      })
      .catch(error => {
        setError("Error fetching rooms.");
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;  // Show a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>;  // Display error message if fetching fails
  }

  return (
    <>

        <div className={`${!isFullMap && 'lg:grid-cols-[700px,1fr] xl:grid-cols-[840px,1fr]'
          } flex-grow grid grid-cols-1 mt-[40px] duration-500`}>
          {/* left - cards */}
          <div
            className={`${isFullMap && 'hidden'}  px-4 py-8 duration-500 lg:py-12 lg:px-7`}
          >
            <span className="inline-block mb-2 text-sm text-gray-400">
              Hơn 300 chỗ ở
            </span>
            {/* title */}
            <h1 className="mb-2 text-2xl font-semibold md:text-3xl lg:text-4xl lg:mb-7">
              Chỗ ở tại khu vực bản đồ đã chọn
            </h1>
            {/* filters */}
            <div className="mb-4 space-x-1 space-y-2 text-gray-400 md:space-x-2 lg:mb-8">
              <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                Loại nơi ở
              </button>
              <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                Giá
              </button>
              <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                Đặt ngay
              </button>
              <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                Phòng và phòng ngủ
              </button>
              <button className="px-2 py-1 text-xs duration-300 border border-gray-300 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                Bộ lọc khác
              </button>
            </div>
            {/* list */}
            <section>
              {rooms.map(room => (
                <div className='grid sm:grid-cols-[300px,1fr] py-5 border-gray-200 cursor-pointer sm:border-t grid-cols-1 gap-x-4'>
                  <div className='relative w-full mb-2 md:mb-0 sm:h-44 h-52'>
                    <img
                      src={room.hinhAnh}
                      alt={room.tenPhong}
                      className="w-full h-48 object-cover rounded-xl"
                      placeholder="blur"
                      blurDataURL={room.hinhAnh}
                    />
                  </div>
                  <div className='flex flex-col px-1 sm:px-0'>
                    {/* detail top */}
                    <div className="flex-grow">
                      <h3 className="text-lg">{room.tenPhong}</h3>
                      <hr className="hidden w-10 mt-3 mb-1 border-b border-gray-200 border-opacity-60 sm:block" />
                      <span className="text-sm text-gray-600">{room.khach} khách - {room.giuong} giường - {room.phongNgu} phòng ngủ - {room.phongTam} phòng tắm </span> <br />
                      <span className='text-sm text-gray-600'>
                        {[
                          room.tivi && 'Tivi',
                          room.mayGiat && 'Máy giặt',
                          room.wifi && 'Wifi',
                          room.doXe && 'Đỗ xe',
                          room.hoBoi && 'Hồ bơi'
                        ]
                          .filter(Boolean) 
                          .join(' - ') 
                        }
                      </span>

                    </div>
                    {/* detail bottom */}
                    <div className="flex justify-between order-first sm:order-none">
                      <div className="flex items-center">
                        <FaStar className="h-5 text-[#FF385C]" />
                        <span className="mx-1 font-semibold">4.5</span>
                        <span className="text-sm text-gray-300">(64)</span>
                      </div>
                      <div>
                        <span className="mr-1 text-lg font-semibold">${room.giaTien}</span>
                        <span className="font-light md:text-lg text-md">/ tháng</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
           {/* right - maps */}
        <section
           className={`${
            map ? 'block' : 'hidden'
          } sm:block sm:sticky top-[86px] h-map flex-grow bg-yellow-900 bg-opacity-10 duration-100`}
        >
          <MapComponent >
          
          </MapComponent>
        </section>
        </div>
    </>

  );
};

export default RentalRoomList;
