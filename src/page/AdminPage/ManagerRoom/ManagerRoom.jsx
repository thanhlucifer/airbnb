import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationContext } from '../../../App';
import { Table, Space, Input, Button, Modal, Form, Upload, Checkbox, Radio, Select } from 'antd';
import { getPhongthueApi } from '../../../redux/phongThueSlide';
import { phongthueService } from '../../../service/phongthue.service';
import { UploadOutlined } from '@ant-design/icons';
import { viTriService } from '../../../service/viTri.service';

const ManagerRoom = () => {
  const dispatch = useDispatch();
  const tokenUser = useSelector(state => state.authSlide.infoUser?.token);
  const { showNotification } = useContext(NotificationContext);
  const { listPhongthue } = useSelector(state => state.phongThueSlide);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Search } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingPhongThue, setEditingPhongThue] = useState(null);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [selectedPhongThue, setSelectedPhongThue] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [viTriList, setViTriList] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedPhongThueDetail, setSelectedPhongThueDetail] = useState(null);


  useEffect(() => {
    dispatch(getPhongthueApi());
    viTriService.getAllVitri().then(res => {
      setViTriList(res.data.content);
    });
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(listPhongthue)) {
      setFilteredData(listPhongthue);
    }
  }, [listPhongthue]);

  useEffect(() => {
    const filtered = listPhongthue?.filter((item) =>
      item.tenPhong.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchKeyword, listPhongthue]);


  const onSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const RoomModel = {
    tenPhong: '',
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: '',
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
  };


  const handleAddPhongThue = (values) => {
    phongthueService.addPhongthue(tokenUser, values).then((res) => {
      showNotification('Thêm phòng thuê thành công!', 'success');
      dispatch(getPhongthueApi());
      handleCancel();
    }).catch((err) => {
      console.log(err);
      showNotification('Thêm phòng thuê thất bại!', 'error');
    });
  };

  const showEditModal = (record) => {
    setEditingPhongThue(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleEditPhongThue = (values) => {
    if (editingPhongThue) {
      phongthueService.editPhongthue(tokenUser, editingPhongThue.id, values).then((res) => {
        showNotification('Chỉnh sửa phòng thuê thành công!', 'success');
        dispatch(getPhongthueApi());
        handleCancelEdit();
      }).catch((err) => {
        console.log(err);
        showNotification('Chỉnh sửa vị trí thất bại!', 'error');
      });
    }
  };

  const showUploadModal = (record) => {
    setSelectedPhongThue(record);
    setIsUploadModalVisible(true);
  };

  const handleCancelUpload = () => {
    setIsUploadModalVisible(false);
    setFileList([]);
  };

  const handleUpload = () => {
    if (fileList.length > 0) {
      const file = fileList[0];
      phongthueService.uploadHinhPhong(tokenUser, selectedPhongThue.id, file).then((res) => {
        showNotification('Tải lên hình ảnh thành công!', 'success');
        dispatch(getPhongthueApi());
        handleCancelUpload();
      }).catch((err) => {
        console.log(err);
        showNotification('Tải lên hình ảnh thất bại!', 'error');
      });
    } else {
      showNotification('Vui lòng chọn một hình ảnh!', 'warning');
    }
  };


  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };


  const showDetailModal = (record) => {
    setSelectedPhongThueDetail(record);
    setIsDetailModalVisible(true);
  };

  const handleCancelDetail = () => {
    setIsDetailModalVisible(false);
  }



  const columns = [
    {
      title: 'Mã phòng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên phòng',
      dataIndex: 'tenPhong',
      key: 'tenPhong',
    },
    {
      title: 'Hinh anh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (text) => <img src={text} alt="avatar" className='h-10' />
    },
    {
      title: 'Giá tiền',
      dataIndex: 'giaTien',
      key: 'giaTien',
      render: (text) => <span>{text} $</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showDetailModal(record)} className="btn bg-green-400 rounded-md py-2 px-2">Detail</Button>
          <Button onClick={() => {
            phongthueService.deletePhongthue(tokenUser, record.id).then((res) => {
              console.log(res);
              dispatch(getPhongthueApi());
              showNotification(res.data.message, 'success');
            }).catch((err) => {
              console.log(err);
              showNotification(err.response.data.message || err.response.data.content, 'error');
            });
          }} className="btn bg-red-500 rounded-md py-2 px-2 text-white">Delete</Button>
          <Button onClick={() => showEditModal(record)} className="btn bg-yellow-400 rounded-md py-2 px-2">Edit</Button>
          <Button onClick={() => showUploadModal(record)} className="btn bg-blue-400 rounded-md py-2 px-2">Upload IMG</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Thêm phòng
      </Button>
      <Search
        placeholder="Tìm kiếm phòng"
        onChange={onSearch}
        style={{ marginBottom: '20px' }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey={(record) => record.id} />

      <Modal title="Thêm Phòng" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          onFinish={handleAddPhongThue}
          initialValues={{ ...RoomModel }}
        >
          <Form.Item label="Tên Phòng" name="tenPhong" rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Khách" name="khach" rules={[{ required: true, message: 'Vui lòng nhập số khách!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Phòng Ngủ" name="phongNgu" rules={[{ required: true, message: 'Vui lòng nhập số phòng ngủ!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Giường" name="giuong" rules={[{ required: true, message: 'Vui lòng nhập số giường!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Phòng Tắm" name="phongTam" rules={[{ required: true, message: 'Vui lòng nhập số phòng tắm!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Mô Tả" name="moTa">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Giá Tiền" name="giaTien" rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="mayGiat" valuePropName="checked">
            <Checkbox>Máy Giặt</Checkbox>
          </Form.Item>
          <Form.Item name="banLa" valuePropName="checked">
            <Checkbox>Bàn Là</Checkbox>
          </Form.Item>
          <Form.Item name="tivi" valuePropName="checked">
            <Checkbox>Tivi</Checkbox>
          </Form.Item>
          <Form.Item name="dieuHoa" valuePropName="checked">
            <Checkbox>Điều Hòa</Checkbox>
          </Form.Item>
          <Form.Item name="wifi" valuePropName="checked">
            <Checkbox>Wifi</Checkbox>
          </Form.Item>
          <Form.Item name="bep" valuePropName="checked">
            <Checkbox>Bếp</Checkbox>
          </Form.Item>
          <Form.Item name="doXe" valuePropName="checked">
            <Checkbox>Đỗ Xe</Checkbox>
          </Form.Item>
          <Form.Item name="hoBoi" valuePropName="checked">
            <Checkbox>Hồ Bơi</Checkbox>
          </Form.Item>
          <Form.Item name="banUi" valuePropName="checked">
            <Checkbox>Bàn Ủi</Checkbox>
          </Form.Item>
          <Form.Item label="Vị trí" name="maViTri" rules={[{ required: true, message: 'Vui lòng chọn vị trí' }]}>
            <Select placeholder="Chọn vị trí">
              {viTriList.map((viTri) => (
                <Option key={viTri.id} value={viTri.id}>
                  {viTri.tenViTri}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm Phòng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Chỉnh sửa phòng" open={isEditModalVisible} onCancel={handleCancelEdit} footer={null}>
        <Form
          form={form}
          onFinish={handleEditPhongThue}
          initialValues={{ ...RoomModel }}
        >
          <Form.Item label="Tên Phòng" name="tenPhong" rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Khách" name="khach" rules={[{ required: true, message: 'Vui lòng nhập số khách!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Phòng Ngủ" name="phongNgu" rules={[{ required: true, message: 'Vui lòng nhập số phòng ngủ!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Giường" name="giuong" rules={[{ required: true, message: 'Vui lòng nhập số giường!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Phòng Tắm" name="phongTam" rules={[{ required: true, message: 'Vui lòng nhập số phòng tắm!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Mô Tả" name="moTa">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Giá Tiền" name="giaTien" rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="mayGiat" valuePropName="checked">
            <Checkbox>Máy Giặt</Checkbox>
          </Form.Item>
          <Form.Item name="banLa" valuePropName="checked">
            <Checkbox>Bàn Là</Checkbox>
          </Form.Item>
          <Form.Item name="tivi" valuePropName="checked">
            <Checkbox>Tivi</Checkbox>
          </Form.Item>
          <Form.Item name="dieuHoa" valuePropName="checked">
            <Checkbox>Điều Hòa</Checkbox>
          </Form.Item>
          <Form.Item name="wifi" valuePropName="checked">
            <Checkbox>Wifi</Checkbox>
          </Form.Item>
          <Form.Item name="bep" valuePropName="checked">
            <Checkbox>Bếp</Checkbox>
          </Form.Item>
          <Form.Item name="doXe" valuePropName="checked">
            <Checkbox>Đỗ Xe</Checkbox>
          </Form.Item>
          <Form.Item name="hoBoi" valuePropName="checked">
            <Checkbox>Hồ Bơi</Checkbox>
          </Form.Item>
          <Form.Item name="banUi" valuePropName="checked">
            <Checkbox>Bàn Ủi</Checkbox>
          </Form.Item>
          <Form.Item label="Vị trí" name="maViTri" rules={[{ required: true, message: 'Vui lòng chọn vị trí' }]}>
            <Select placeholder="Chọn vị trí">
              {viTriList.map((viTri) => (
                <Option key={viTri.id} value={viTri.id}>
                  {viTri.tenViTri}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Upload hình ảnh */}
      <Modal
        title="Upload Hình Ảnh"
        open={isUploadModalVisible}
        onCancel={handleCancelUpload}
        onOk={handleUpload}
        okText="Tải lên"
      >
        <Upload {...uploadProps} listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
        </Upload>
      </Modal>


      <Modal title={
        <span className="text-lg font-bold text-black">
          Chi Tiết Phòng Thuê
        </span>
      } open={isDetailModalVisible} onCancel={handleCancelDetail} footer={null}>
        {selectedPhongThueDetail && (
          <div className='space-y-1'>
            <h2 className='font-bold '> Tên Phòng: <span className='text-sm text-[#F72F5B]'>{selectedPhongThueDetail.tenPhong}</span></h2>
            <p className='font-bold '>Số Khách: <span className='text-sm text-[#F72F5B]'>{selectedPhongThueDetail.khach}</span></p>
            <p className='font-bold '>Số Phòng Ngủ: <span className='text-sm text-[#F72F5B]'>{selectedPhongThueDetail.phongNgu}</span></p>
            <p className='font-bold '>Số Giường: <span className='text-sm text-[#F72F5B]'>{selectedPhongThueDetail.giuong}</span></p>
            <p className='font-bold '>Số Phòng Tắm: <span className='text-sm text-[#F72F5B]'>{selectedPhongThueDetail.phongTam}</span></p>
            <p className='font-bold '>Mô Tả: <span className='text-sm text-[#F72F5B]'>{selectedPhongThueDetail.moTa}</span></p>
            <p className='font-bold '>Giá Tiền: <span className='text-sm text-[#F72F5B]'> {selectedPhongThueDetail.giaTien} $</span></p>
            <p className='font-bold'>
              Tiện ích:
              <span className='text-sm text-[#F72F5B]'>
                {[
                  selectedPhongThueDetail.mayGiat && 'Máy Giặt',
                  selectedPhongThueDetail.banLa && 'Bàn Là',
                  selectedPhongThueDetail.tivi && 'Tivi',
                  selectedPhongThueDetail.dieuHoa && 'Điều Hòa',
                  selectedPhongThueDetail.wifi && 'Wifi',
                  selectedPhongThueDetail.bep && 'Bếp',
                  selectedPhongThueDetail.doXe && 'Đỗ xe',
                  selectedPhongThueDetail.hoBoi && 'Hồ Bơi',
                  selectedPhongThueDetail.banUi && 'Bàn Ủi',
                ]
                  .filter(Boolean)
                  .join(' - ')}
              </span>

            </p>
            <p className='font-bold '>Hình Ảnh: <img src={selectedPhongThueDetail.hinhAnh} alt="Hình Ảnh" /></p>
          </div>
        )}
      </Modal>

    </div>
  )
}

export default ManagerRoom