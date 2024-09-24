import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { phongthueService } from '../../service/phongthue.service';
import { FaStar, FaRegHeart, FaRegCalendar, FaChevronRight } from "react-icons/fa";
import { RiMedal2Fill } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import avatar from '../../assets/avatar.png';
import { IoHomeOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { MdOutlineGTranslate } from "react-icons/md";
import { TbIroningSteam, TbIroning, TbAirConditioning, TbParkingCircle, TbPool, TbDeviceTv, TbWifi, TbToolsKitchen } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";

const RoomDetail = () => {
    const { id } = useParams();  // Get the room ID from the URL
    const [roomDetail, setRoomDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFullMap, setIsFullMap] = useState(false);
    useEffect(() => {
        setLoading(true);
        phongthueService.layChiTietPhong(id)
            .then(response => {
                setRoomDetail(response.data.content);
                setLoading(false);
            })
            .catch(error => {
                setError("Error fetching room details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className='container mx-auto mt-4'>
                <h1 className="text-3xl font-bold mb-4">{roomDetail.tenPhong}</h1>
                <div className="flex justify-between order-first sm:order-none mb-4">
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <FaStar className="h-5 text-[#FF385C]" />
                            <span className="mx-1 font-semibold">4.5</span>
                            <span className="text-sm text-gray-300 underline">(64)</span>
                        </div>
                        <div className="flex items-center ml-4">
                            <RiMedal2Fill className="h-5 text-[#FF385C]" />
                            <span className="mx-1 font-semibold">Chủ nhà siêu cấp</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <FiUpload className="h-5 text-[#FF385C]" />
                            <span className="mx-1 font-semibold underline">Chia sẻ</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaRegHeart className="h-5 text-[#FF385C]" />
                            <span className="mx-1 font-semibold underline">Lưu</span>
                        </div>
                    </div>
                </div>
                <img src={roomDetail.hinhAnh} alt={roomDetail.tenPhong} className='w-full rounded-md' />
            </div>
            <div className={`${!isFullMap && 'lg:grid-cols-[700px,1fr] xl:grid-cols-[840px,1fr]'
                } flex-grow grid grid-cols-1 duration-500`}>
                {/* left - cards */}
                <div
                    className={`${isFullMap && 'hidden'}  px-4 py-8 duration-500 lg:py-12 lg:px-7`}
                >
                    <div className="flex justify-between border-b border-gray-300 py-5">
                        <div className="items-center">
                            <h2 className="text-2xl font-bold">Toàn bộ căn hộ. Chủ nhà Lucifer</h2>
                            <span className="text-sm text-gray-600">{roomDetail.khach} khách - {roomDetail.giuong} giường - {roomDetail.phongNgu} phòng ngủ - {roomDetail.phongTam} phòng tắm </span> <br />
                        </div>
                        <div className="items-center md:block hidden">
                            <img src={avatar} alt="" className="w-10 h-10 rounded-full border border-gray-300" />
                        </div>
                    </div>
                    <div className='py-5 space-y-4 border-b border-gray-300'>
                        <div className='flex items-center space-x-3'>
                            <div className='flex-shrink-0'>
                                <IoHomeOutline className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <span className="font-semibold">Toàn bộ nhà</span>
                                <p className="text-sm text-gray-600">Bạn sẽ có chung cư cao cấp cho riêng mình</p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <div className='flex-shrink-0'>
                                <BsStars className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <span className="font-semibold">Vệ sinh tăng cường</span>
                                <p className="text-sm text-gray-600">Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb <span className='text-black font-medium underline'>Hiển thị thêm </span></p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <div className='flex-shrink-0'>
                                <RiMedal2Fill className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <span className="font-semibold">Lucifer là chủ nhà siêu cấp</span>
                                <p className="text-sm text-gray-600 text-wrap">Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách hàng</p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <div className='flex-shrink-0'>
                                <FaRegCalendar className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <span className="font-semibold">Miễn phí hủy trong 48 giờ</span>

                            </div>
                        </div>
                    </div>
                    <div className='py-5 border-b border-gray-300'>
                        <div className='flex items-center justify-between px-4 py-4 bg-primary rounded-md border border-gray-950'>
                            <span className="text-black font-semibold">Dịch sang tiếng việt</span>
                            <MdOutlineGTranslate className='w-8 h-8' />
                        </div>
                        <p className="text-sm text-gray-600 text-wrap mt-4 mb-4">{roomDetail.moTa}</p>
                        <span className="text-black font-semibold underline flex items-center">Hiển thị thêm <FaChevronRight /> </span>
                    </div>
                    <div className='py-5 border-b border-gray-300 space-y-4'>
                        <h1 className="text-2xl font-semibold">Tiện nghi</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {[
                                roomDetail.banLa && <div className='flex items-center space-x-3'><TbIroningSteam className='w-8 h-8' /> <span>Bàn là</span></div>,
                                roomDetail.banUi && <div className='flex items-center space-x-3'><TbIroning className='w-8 h-8' /> <span>Bàn ủi</span></div>,
                                roomDetail.wifi && <div className='flex items-center space-x-3'><TbWifi className='w-8 h-8' /> <span>Wifi</span></div>,
                                roomDetail.dieuHoa && <div className='flex items-center space-x-3'><TbAirConditioning className='w-8 h-8' /> <span>Điều hòa nhiệt độ</span></div>,
                                roomDetail.tivi && <div className='flex items-center space-x-3'><TbDeviceTv className='w-8 h-8' /> <span>Tivi với truyền hình cáp siêu chuẩn</span></div>,
                                roomDetail.bep && <div className='flex items-center space-x-3'><TbToolsKitchen className='w-8 h-8' /> <span>Bếp</span></div>,
                                roomDetail.mayGiat && <div className='flex items-center space-x-3'><GiWashingMachine className='w-8 h-8' /> <span>Máy giặt</span></div>,
                                roomDetail.doXe && <div className='flex items-center space-x-3'><TbParkingCircle className='w-8 h-8' /> <span>Bãi đỗ xe thu phí</span></div>,
                                roomDetail.hoBoi && <div className='flex items-center space-x-3'><TbPool className='w-8 h-8' /> <span>Hồ bơi  </span></div>,
                            ]}
                            <div className='flex '>
                                <button className="border border-black text-black px-4 py-2 rounded-md">Xem thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
        // <div className="room-detail">
        //   <h1>{roomDetail.tenPhong}</h1>
        //   <img src={roomDetail.hinhAnh} alt={roomDetail.tenPhong} />
        //   <p>Guests: {roomDetail.khach}</p>
        //   <p>Price: ${roomDetail.giaTien} / month</p>
        //   {/* Add other details as necessary */}
        // </div>
    );
};

export default RoomDetail;
