import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { phongthueService } from '../../service/phongthue.service';
import { binhluanService } from '../../service/binhluan.service';
import { FaStar, FaRegHeart, FaRegCalendar, FaChevronRight } from "react-icons/fa";
import { RiMedal2Fill } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import avatar from '../../assets/avatar.png';
import { IoHomeOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { MdOutlineGTranslate } from "react-icons/md";
import { TbIroningSteam, TbIroning, TbAirConditioning, TbParkingCircle, TbPool, TbDeviceTv, TbWifi, TbToolsKitchen } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { datphongService } from '../../service/datphong.service';
import { NotificationContext } from '../../App';
const RoomDetail = () => {
    const { id } = useParams();
    const [roomDetail, setRoomDetail] = useState(null);
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState(4);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFullMap, setIsFullMap] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [visibleCount, setVisibleCount] = useState(6);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [numGuests, setNumGuests] = useState(1);
    const [bookingError, setBookingError] = useState(null);
    const [isBooking, setIsBooking] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [bookedRooms, setBookedRooms] = useState([]);
    const { showNotification } = useContext(NotificationContext);


    const infoUser = useSelector((state) => state.authSlide.infoUser);

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
        binhluanService.getBinhluantheophong(id)
            .then(response => {
                setComments(response.data.content);
            })
            .catch(error => {
                setError("Error fetching comments.");
            });

        datphongService.checkPhong()
            .then(response => {
                setBookedRooms(response.data.content);
            })
            .catch(error => {
                console.error("Error fetching booked rooms:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);



    const handleBookingSubmit = (e) => {
        e.preventDefault();

        if (!infoUser) {
            setBookingError('Bạn cần đăng nhập để đặt phòng.');
            return;
        }

        const roomExists = bookedRooms.some((room) => room.maPhong === roomDetail.id);
        if (roomExists) {
            setBookingError('Phòng này đã được đặt trước đó.');
            return;
        }

        const bookingData = {
            maPhong: roomDetail.id,
            ngayDen: startDate,
            ngayDi: endDate,
            soLuongKhach: numGuests,
            maNguoiDung: infoUser.user.id,
        };

        setIsBooking(true);

        datphongService.postDatphong(bookingData)
            .then((response) => {
                showNotification('Đặt phòng thành công', 'success');
                setIsBooked(true);
            })
            .catch((error) => {
                showNotification('Đặt phòng thất bại. Vui lòng thử lại.', 'error');
                console.error(error);
            })
            .finally(() => {
                setIsBooking(false);
            });
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const amenities = [
        roomDetail?.banLa && <div className='flex items-center space-x-3'><TbIroningSteam className='w-8 h-8' /> <span>Bàn là</span></div>,
        roomDetail?.banUi && <div className='flex items-center space-x-3'><TbIroning className='w-8 h-8' /> <span>Bàn ủi</span></div>,
        roomDetail?.wifi && <div className='flex items-center space-x-3'><TbWifi className='w-8 h-8' /> <span>Wifi</span></div>,
        roomDetail?.dieuHoa && <div className='flex items-center space-x-3'><TbAirConditioning className='w-8 h-8' /> <span>Điều hòa nhiệt độ</span></div>,
        roomDetail?.tivi && <div className='flex items-center space-x-3'><TbDeviceTv className='w-8 h-8' /> <span>Tivi với truyền hình cáp siêu chuẩn</span></div>,
        roomDetail?.bep && <div className='flex items-center space-x-3'><TbToolsKitchen className='w-8 h-8' /> <span>Bếp</span></div>,
        roomDetail?.mayGiat && <div className='flex items-center space-x-3'><GiWashingMachine className='w-8 h-8' /> <span>Máy giặt</span></div>,
        roomDetail?.doXe && <div className='flex items-center space-x-3'><TbParkingCircle className='w-8 h-8' /> <span>Bãi đỗ xe thu phí</span></div>,
        roomDetail?.hoBoi && <div className='flex items-center space-x-3'><TbPool className='w-8 h-8' /> <span>Hồ bơi</span></div>,
    ].filter(Boolean);

    const handleShowMoreTienNghi = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };

    const handleShowMore = () => {
        setVisibleComments((prev) => prev + 4);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleRatingChange = (e) => {
        setNewRating(e.target.value);
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        const commentData = {
            maPhong: id,
            maNguoiBinhLuan: 1,
            ngayBinhLuan: new Date().toISOString(),
            noiDung: newComment,
            saoBinhLuan: newRating,
        };

        binhluanService.postBinhluan(commentData)
            .then(response => {
                setComments([response.data.content, ...comments]);
                setNewComment("");
                setNewRating(0);
            })
            .catch(error => {
                showNotification(error.response.data.content, 'error');
            });
    };


    return (
        <>
            <div className='container mx-auto mt-4'>
                <h1 className="text-3xl font-bold mb-4">{roomDetail?.tenPhong}</h1>
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
                <img src={roomDetail?.hinhAnh} alt={roomDetail?.tenPhong} className='w-full rounded-md' />
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
                            <span className="text-sm text-gray-600">{roomDetail?.khach} khách - {roomDetail?.giuong} giường - {roomDetail?.phongNgu} phòng ngủ - {roomDetail?.phongTam} phòng tắm </span> <br />
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
                        <p className="text-sm text-gray-600 text-wrap mt-4 mb-4">{roomDetail?.moTa}</p>
                        <span className="text-black font-semibold underline flex items-center">Hiển thị thêm <FaChevronRight /> </span>
                    </div>
                    <div className='py-5 border-b border-gray-300 space-y-4'>
                        <h1 className="text-2xl font-semibold">Tiện nghi</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {amenities.slice(0, visibleCount)}
                            {visibleCount < amenities.length && (
                                <div className='flex '>
                                    <button className="border border-black text-black px-4 py-2 rounded-md" onClick={handleShowMoreTienNghi}>Xem thêm</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='py-5 border-b border-gray-300 space-y-4'>
                        {/* Bình luận */}
                        <h2 className="text-2xl font-bold">Bình luận</h2>
                        {comments?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {comments.slice(0, visibleComments).map(comment => (
                                    <div key={comment.id} className="py-4 ">
                                        <div className="flex items-center space-x-4">
                                            <img src={comment.avatar || avatar} alt={comment.tenNguoiBinhLuan} className="w-10 h-10 rounded-full border border-gray-300" />
                                            <div>
                                                <h4 className="font-semibold">{comment.tenNguoiBinhLuan}</h4>
                                                <p className="text-sm text-gray-600">{comment.ngayBinhLuan}</p>
                                            </div>
                                        </div>
                                        <p className="mt-2">{comment.noiDung}</p>
                                        <div className="flex items-center mt-2">
                                            <FaStar className="text-yellow-500" />
                                            <span className="ml-1">{comment.saoBinhLuan}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Chưa có bình luận nào.</p>
                        )}
                        {visibleComments < comments.length && (
                            <button
                                onClick={handleShowMore}
                                className="mt-4 text-black underline flex items-center font-semibold"
                            >
                                Hiển thị thêm <FaChevronRight />
                            </button>
                        )}
                    </div>
                    {/* Form để thêm bình luận */}
                    <div className='py-5 border-b border-gray-300 hidden sm:block'>
                        <h2 className="text-2xl font-bold mb-4">Thêm bình luận</h2>
                        <form onSubmit={handleSubmitComment} className="space-y-4">
                            <textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Nhập bình luận của bạn..."
                                className="w-full p-2 border rounded"
                                required
                            />
                            <div>
                                <label className="block font-semibold">Đánh giá:</label>
                                <select value={newRating} onChange={handleRatingChange} className="border rounded p-2">
                                    <option value={0}>Chọn sao</option>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <option key={star} value={star}>{star} sao</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Gửi bình luận</button>
                        </form>
                    </div>
                </div>
                {/* Form đặt phòng */}
                <div className='sm:mt-4 py-5 border-b border-gray-300 rounded-md shadow-xl px-4 h-min sticky top-40'>
                    <h2 className="text-xl font-semibold mb-3">Đặt phòng</h2>
                    <form onSubmit={handleBookingSubmit}>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Ngày nhận phòng</label>
                            <input
                                type="date"
                                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Ngày trả phòng</label>
                            <input
                                type="date"
                                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Số lượng khách</label>
                            <input
                                type="number"
                                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                min="1"
                                value={numGuests}
                                onChange={(e) => setNumGuests(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`bg-[#F72F5B] w-full text-white px-4 py-2 rounded-md transition duration-300 
                ${isBooking || isBooked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'}`}
                            disabled={isBooking || isBooked} 
                        >
                            {isBooking ? 'Đang đặt...' : isBooked ? 'Đã đặt' : 'Đặt phòng'}
                        </button>
                        {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}
                    </form>
                </div>

            </div>

        </>
    );
};

export default RoomDetail;
