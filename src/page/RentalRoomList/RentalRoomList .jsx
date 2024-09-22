import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { phongthueService } from '../../service/phongthue.service';

const RentalRoomList = () => {
  const { id } = useParams();  // Get the location ID from the URL
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const [error, setError] = useState(null);  // State for error handling

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
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-4">Rooms in Location ID: {id}</h1>
      {rooms.length === 0 ? (
        <p>No rooms found for this location.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map(room => (
            <div key={room.id} className="border p-4 rounded-lg shadow-md">
              <img 
                src={room.hinhAnh} 
                alt={room.tenPhong} 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <h2 className="text-xl font-bold mb-2">{room.tenPhong}</h2>
              <p>{room.moTa}</p>
              <p className="text-lg font-semibold mt-2">Price: ${room.giaTien}</p>
              <ul className="list-disc pl-5">
                <li>Guests: {room.khach}</li>
                <li>Bedrooms: {room.phongNgu}</li>
                <li>Beds: {room.giuong}</li>
                <li>Bathrooms: {room.phongTam}</li>
              </ul>
              <ul className="list-none mt-4 space-y-2">
                <li>TV: {room.tivi ? 'Yes' : 'No'}</li>
                <li>Washing Machine: {room.mayGiat ? 'Yes' : 'No'}</li>
                <li>WiFi: {room.wifi ? 'Yes' : 'No'}</li>
                <li>Parking: {room.doXe ? 'Yes' : 'No'}</li>
                <li>Swimming Pool: {room.hoBoi ? 'Yes' : 'No'}</li>
              </ul>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalRoomList;
