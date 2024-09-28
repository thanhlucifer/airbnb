import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nguoidungService } from '../../service/nguoidung.service';
import { datphongService } from '../../service/datphong.service';
import { getInfoUSer } from '../../redux/authSlide';
import { GoShieldCheck } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { NotificationContext } from '../../App';
const Profile = () => {
    const dispatch = useDispatch();
    const infoUser = useSelector((state) => state.authSlide.infoUser);
    const [userDetails, setUserDetails] = useState(infoUser);
    const [bookedRooms, setBookedRooms] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [allRooms, setAllRooms] = useState([]);
    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        if (infoUser?.user?.id) {

            nguoidungService.getOne(infoUser?.user?.id).then((res) => {
                setUserDetails(res.data.content);
            });

            datphongService.layPhongTheoNguoiDung(infoUser?.user?.id).then((res) => {
                setBookedRooms(res.data.content);
                console.log(res.data.content);

            }).catch((error) => {
                console.error("Lỗi khi lấy danh sách phòng:", error);
            });

            datphongService.getAllphong().then((res) => {
                setAllRooms(res.data.content);
            }).catch((error) => {
                console.error("Lỗi khi lấy danh sách phòng cho thuê:", error);
            });
        }
    }, [infoUser]);


    const filteredBookedRooms = bookedRooms.map(bookedRoom =>
        allRooms.find(room => room.id === bookedRoom.maPhong)
    ).filter(room => room);

    const handleUpdate = () => {
        nguoidungService.editUser(infoUser.user?.id, userDetails).then(() => {
            dispatch(getInfoUSer(userDetails));
            showNotification('Cập nhật thành công', 'success', 2000);
            setIsEditing(false);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleGenderChange = (e) => {
        setUserDetails({ ...userDetails, gender: e.target.value === 'true' });
    };

    return (
        <div className="profile-container grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="profile-info bg-white p-4 shadow-lg rounded-lg h-min">
                <img
                    src={userDetails?.avatar || 'https://via.placeholder.com/150'}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full mx-auto"
                />
                <h2 className="text-center mt-4 text-xl underline">
                    Cập nhật ảnh
                </h2>
                <div className='space-y-4 mt-4'>
                    <GoShieldCheck size={20}/>
                    <h1 className='font-semibold text-gray-900' >Xác minh danh tính</h1>
                    <p className="text-sm text-gray-600">Xác thực danh tính của bạn với huy hiệu xác minh danh tính</p>
                    <button className="border border-black text-black px-4 py-2 rounded-md"> Nhận huy hiệu </button>
                    <hr className="hidden w-full mt-3 mb-1 border-b border-gray-200 border-opacity-60 sm:block" />
                    <h1 className='font-semibold capitalize text-gray-900' >{userDetails.name} đã xác nhận</h1>
                    <div className='flex space-x-2'>
                        <GiCheckMark size={20}/>
                        <p className="text-sm text-gray-600">Địa chỉ email</p>
                    </div>
                </div>

                {/* Hiển thị form chỉnh sửa nếu isEditing = true */}
                {isEditing && (
                    
                    <form className="mt-4 ">
                        <hr className="w-full mt-3 mb-1 border-t border-gray-200 border-opacity-60 " />
                        <h1 className="text-xl font-semibold text-gray-900">Thông tin</h1>
                        <div className="mb-4 mt-3">
                            <label className="block mb-2">Tên người dùng</label>
                            <input
                                type="text"
                                name="name"
                                value={userDetails.name || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={userDetails.phone || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Ngày sinh</label>
                            <input
                                type="date"
                                name="birthday"
                                value={userDetails.birthday || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Giới tính</label>
                            <select
                                name="gender"
                                value={userDetails.gender}
                                onChange={handleGenderChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="true">Nam</option>
                                <option value="false">Nữ</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Vai trò</label>
                            <input
                                type="text"
                                name="role"
                                value={userDetails.role || ''}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-300"
                                readOnly
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="w-full bg-green-500 text-white py-2 mt-4 rounded-lg">
                            Cập nhật hồ sơ
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="w-full bg-[#F72F5B] text-white py-2 mt-4 rounded-lg">
                            Hủy
                        </button>
                    </form>
                )}
            </div>
            <div className="booked-rooms col-span-1 md:col-span-2 bg-white p-4 shadow-lg rounded-lg">
                <div className="space-y-4 mb-4">
                    <h1 className="text-3xl mb-4">Xin chào tôi là {userDetails?.name}</h1>
                    <span className="text-gray-500">Bắt đầu tham gia vào 2024</span>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="block text-black py-2 mt-4 underline font-bold">
                        Chỉnh sửa hồ sơ
                    </button>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Phòng đã thuê</h2>
                {filteredBookedRooms.length > 0 ? (
                    <div className="space-y-4">
                        {filteredBookedRooms.map((room) => (
                            <div key={room.id} className='grid sm:grid-cols-[300px,1fr] py-5 border-gray-200 cursor-pointer sm:border-t grid-cols-1 gap-x-4' >
                                <div className='relative w-full mb-2 md:mb-0 sm:h-44 h-52'>
                                    <img
                                        src={room.hinhAnh}
                                        alt={room.tenPhong}
                                        className="w-full h-48 object-cover rounded-xl"
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
                    </div>
                ) : (
                    <p>Bạn chưa thuê phòng nào</p>
                )}

            </div>
        </div>
    );
};

export default Profile;
