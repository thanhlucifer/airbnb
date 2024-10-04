import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationContext } from '../../../App';
import { Table, Space, Input, Button, Modal, Form, Select, DatePicker, InputNumber } from 'antd';
import { getDatphongApi } from '../../../redux/datPhongSlide';
import { datphongService } from '../../../service/datphong.service';
import { nguoidungService } from '../../../service/nguoidung.service';
import { phongthueService } from '../../../service/phongthue.service';
import moment from 'moment';


const ManagerBooking = () => {
    const dispatch = useDispatch();
    const { showNotification } = useContext(NotificationContext);
    const { listDatphong } = useSelector(state => state.datPhongSlide);
    const [filteredData, setFilteredData] = useState([]);
    const { Search } = Input;
    const { Option } = Select;
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [nguoiDungList, setNguoiDungList] = useState([]);
    const [phongThueList, setPhongThueList] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);


    useEffect(() => {
        dispatch(getDatphongApi());
        nguoidungService.getAll().then(res => {
            setNguoiDungList(res.data.content);
        });
        phongthueService.getAllphongthue().then(res => {
            setPhongThueList(res.data.content);
        });
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(listDatphong)) {
            setFilteredData(listDatphong);
        }
    }, [listDatphong]);

    useEffect(() => {
        const filtered = listDatphong?.filter((item) => {
            const nguoiDung = nguoiDungList.find(user => user.id === item.maNguoiDung);
            const matchMaPhong = item.maPhong.toString().includes(searchKeyword.toLowerCase());
            const matchTenNguoiDat = nguoiDung?.name.toLowerCase().includes(searchKeyword.toLowerCase());
            return matchMaPhong || matchTenNguoiDat;
        });
        setFilteredData(filtered);
    }, [searchKeyword, listDatphong, nguoiDungList]);

    const onSearch = (e) => {
        setSearchKeyword(e.target.value);
    };


    const showModal = () => {
        setIsModalVisible(true);
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const checkRoomAvailability = async (maPhong, ngayDen, ngayDi) => {
        const res = await datphongService.getAllDatPhongAdmin();
        const bookings = res.data.content;

        const isAvailable = bookings.every((booking) => {
            const isSameRoom = booking.maPhong === maPhong;
            const isOverlapping = (
                (ngayDen.isBefore(booking.ngayDi) && ngayDi.isAfter(booking.ngayDen)) ||
                (ngayDen.isSame(booking.ngayDen) || ngayDi.isSame(booking.ngayDi))
            );
            return !isSameRoom || !isOverlapping;
        });

        return isAvailable;
    };


    const handleOk = () => {
        form.validateFields().then(async (values) => {
            const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung } = values;

            // Kiểm tra phòng có trống không
            const isAvailable = await checkRoomAvailability(maPhong, ngayDen, ngayDi);

            if (isAvailable) {
                datphongService.addDatphongAdmin({
                    maPhong,
                    ngayDen: ngayDen.toISOString(),
                    ngayDi: ngayDi.toISOString(),
                    soLuongKhach,
                    maNguoiDung
                }).then((res) => {
                    showNotification('Thêm phòng đặt thành công', 'success');
                    dispatch(getDatphongApi());
                    handleCancel();
                }).catch(err => {
                    showNotification('Thêm phòng đặt thất bại', 'error');
                    console.log(err);
                });
            } else {
                showNotification('Phòng đã được đặt trong khoảng thời gian này', 'error');
            }
        });
    };

    const showEditModal = (record) => {
        setEditingBooking(record); // Set the booking record to be edited
        form.setFieldsValue({
            maPhong: record.maPhong,
            ngayDen: moment(record.ngayDen), // Assuming you're using Moment.js for date handling
            ngayDi: moment(record.ngayDi),
            soLuongKhach: record.soLuongKhach,
            maNguoiDung: record.maNguoiDung,
        });
        setIsEditModalVisible(true); // Show the edit modal
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        form.resetFields();
    };

    const handleEditOk = () => {
        form.validateFields().then(async (values) => {
            const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung } = values;

            // Call the edit API
            datphongService.editDatphongAdmin(editingBooking.id, {
                maPhong,
                ngayDen: ngayDen.toISOString(),
                ngayDi: ngayDi.toISOString(),
                soLuongKhach,
                maNguoiDung,
            }).then((res) => {
                showNotification('Cập nhật phòng đặt thành công', 'success');
                dispatch(getDatphongApi()); // Refresh the list
                handleEditCancel();
            }).catch(err => {
                showNotification('Cập nhật phòng đặt thất bại', 'error');
            });
        });
    };




    const columns = [
        {
            title: 'Mã đặt phòng',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Mã phòng',
            dataIndex: 'maPhong',
            key: 'maPhong',
        },
        {
            title: 'Ngày đến',
            dataIndex: 'ngayDen',
            key: 'ngayDen',
        },
        {
            title: 'Ngày đi',
            dataIndex: 'ngayDi',
            key: 'ngayDi',
        },
        {
            title: 'Số lượng khách',
            dataIndex: 'soLuongKhach',
            key: 'soLuongKhach',
        },
        {
            title: 'Người đặt',
            key: 'maNguoiDung',
            render: (_, record) => {
                const nguoiDung = nguoiDungList.find(user => user.id === record.maNguoiDung);
                return nguoiDung ? nguoiDung.name : 'Không tìm thấy người dùng';
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showEditModal(record)} className="btn bg-yellow-400 rounded-md py-2 px-2">Edit</Button>
                    <Button onClick={() => {
                        datphongService.deleteDatphongAdmin(record.id).then((res) => {
                            dispatch(getDatphongApi());
                            showNotification(res.data.message, 'success');
                        }).catch((err) => {
                            showNotification(err.response.data.message || err.response.data.content, 'error');
                        });
                    }} className="btn bg-red-500 rounded-md py-2 px-2 text-white">Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
                Thêm phòng đặt
            </Button>
            <Search
                placeholder="Tìm kiếm theo mã phòng hoặc tên người đặt"
                onChange={onSearch}
                style={{ marginBottom: '20px' }}
            />
            <Table columns={columns} dataSource={filteredData} rowKey={(record) => record.id} />

            <Modal title="Thêm phòng đặt" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Mã phòng" name="maPhong" rules={[{ required: true, message: 'Vui lòng nhập mã phòng' }]}>
                        <Select placeholder="Chọn mã phòng">
                            {phongThueList.map(phong => (
                                <Option key={phong.id} value={phong.id}>{phong.tenPhong}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Ngày đến" name="ngayDen" rules={[{ required: true, message: 'Vui lòng chọn ngày đến' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Ngày đi" name="ngayDi" rules={[{ required: true, message: 'Vui lòng chọn ngày đi' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Số lượng khách" name="soLuongKhach" rules={[{ required: true, message: 'Vui lòng nhập số lượng khách' }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item label="Người đặt" name="maNguoiDung" rules={[{ required: true, message: 'Vui lòng chọn người đặt' }]}>
                        <Select placeholder="Chọn người đặt">
                            {nguoiDungList.map(user => (
                                <Option key={user.id} value={user.id}>{user.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Cập nhật phòng đặt"
                open={isEditModalVisible}
                onOk={handleEditOk}
                onCancel={() => setIsEditModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Mã phòng" name="maPhong" rules={[{ required: true, message: 'Vui lòng nhập mã phòng' }]}>
                        <Select placeholder="Chọn mã phòng">
                            {phongThueList.map(phong => (
                                <Option key={phong.id} value={phong.id}>{phong.tenPhong}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Ngày đến" name="ngayDen" rules={[{ required: true, message: 'Vui lòng chọn ngày đến' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Ngày đi" name="ngayDi" rules={[{ required: true, message: 'Vui lòng chọn ngày đi' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Số lượng khách" name="soLuongKhach" rules={[{ required: true, message: 'Vui lòng nhập số lượng khách' }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item label="Người đặt" name="maNguoiDung" rules={[{ required: true, message: 'Vui lòng chọn người đặt' }]}>
                        <Select placeholder="Chọn người đặt">
                            {nguoiDungList.map(user => (
                                <Option key={user.id} value={user.id}>{user.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default ManagerBooking;
