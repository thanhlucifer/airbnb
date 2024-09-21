import React, { useEffect, useState } from 'react';
import { viTriService } from '../../service/viTri.service';
import './Location.scss';
const Location = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch location data when the component mounts
    useEffect(() => {
        viTriService.getAllVitri()
            .then(response => {
                setLocations(response.data.content);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Khám phá những điểm đến gần đây</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {locations.slice(1, 9).map((location) => (
                    <div key={location.id} className="item">
                        <div className='img'>
                            <img
                                src={location.hinhAnh}
                                alt={location.ten}
                                className="w-[64px] h-[64px] "
                            />

                        </div>
                        <span>
                            <h2 className="text-xl font-bold mb-2">{location.tenViTri}</h2>
                            <p className="text-gray-700">{location.tinhThanh}, {location.quocGia}</p>
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Location;
