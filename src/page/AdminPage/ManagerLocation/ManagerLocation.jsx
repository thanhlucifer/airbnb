import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationContext } from '../../../App';
import {  Table, Space, Input, Button, Modal, Form, Upload } from 'antd';
import { getViTriApi } from '../../../redux/viTriSlide';
import { viTriService } from '../../../service/viTri.service';
import { UploadOutlined } from '@ant-design/icons';  
const ManagerLocation = () => {
  const dispatch = useDispatch();
  const tokenUser = useSelector(state => state.authSlide.infoUser?.token);
  const { showNotification } = useContext(NotificationContext);
  const { listViTri } = useSelector(state => state.viTriSlide);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Search } = Input;
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); 
  const [editingViTri, setEditingViTri] = useState(null); 
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);  
  const [selectedViTri, setSelectedViTri] = useState(null);  
  const [fileList, setFileList] = useState([]);  
  const [searchKeyword, setSearchKeyword] = useState(""); 

  useEffect(() => {
    dispatch(getViTriApi());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(listViTri)) {
      setFilteredData(listViTri);
    }
  }, [listViTri]);
   // Filter function based on search keyword
   useEffect(() => {
    const filtered = listViTri?.filter((item) =>
      item.tenViTri.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.tinhThanh.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.quocGia.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchKeyword, listViTri]);

  // Handle search input change
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

 
  const handleAddViTri = (values) => {
    viTriService.addViTriAdmin(tokenUser, values).then((res) => {
      showNotification('Thêm vị trí thành công!', 'success');
      dispatch(getViTriApi());
      handleCancel(); 
    }).catch((err) => {
      console.log(err);
      showNotification('Thêm vị trí thất bại!', 'error');
    });
  };

  const showEditModal = (record) => {
    setEditingViTri(record); 
    setIsEditModalVisible(true); 
    form.setFieldsValue(record); 
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false); 
    form.resetFields(); 
  };

  const handleEditViTri = (values) => {
    if (editingViTri) {
      viTriService.editViTriAdmin(tokenUser, editingViTri.id, values).then((res) => {
        showNotification('Chỉnh sửa vị trí thành công!', 'success');
        dispatch(getViTriApi()); 
        handleCancelEdit(); 
      }).catch((err) => {
        console.log(err);
        showNotification('Chỉnh sửa vị trí thất bại!', 'error');
      });
    }
  };

  const showUploadModal = (record) => {
    setSelectedViTri(record);  
    setIsUploadModalVisible(true);
  };

  const handleCancelUpload = () => {
    setIsUploadModalVisible(false);
    setFileList([]);  
  };

  const handleUpload = () => {
    if (fileList.length > 0) {
      const file = fileList[0];  
      viTriService.uploadHinhAnhViTri(tokenUser, selectedViTri.id, file).then((res) => {
        showNotification('Tải lên hình ảnh thành công!', 'success');
        dispatch(getViTriApi());  
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

  


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hinh anh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (text) => <img src={text} alt="avatar" className='h-10' />
    },
    {
      title: 'Tên vị trí',
      dataIndex: 'tenViTri',
      key: 'tenViTri',
    },
    {
      title: 'Tỉnh thành',
      dataIndex: 'tinhThanh',
      key: 'tinhThanh',
    },
    {
      title: 'Quốc gia',
      dataIndex: 'quocGia',
      key: 'quocGia',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => {
            viTriService.deleteViTriAdmin(tokenUser,record.id).then((res) => {
              console.log(res);
              dispatch(getViTriApi());
              showNotification(res.data.message, 'success');
            }).catch((err) => {
              console.log(err);
              showNotification(err.response.data.message || err.response.data.content, 'error');
            });
          }} className="btn bg-red-500 rounded-md py-2 px-2 text-white">Delete</button>
          <button onClick={() => showEditModal(record)} className="btn bg-yellow-400 rounded-md py-2 px-2">Edit</button>
          <button onClick={() => showUploadModal(record)} className="btn bg-blue-400 rounded-md py-2 px-2">Upload hình ảnh</button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Thêm vị trí
      </Button>
       
       <Search
        placeholder="Tìm kiếm vị trí"
        onChange={onSearch}
        style={{ marginBottom: '20px' }}
      />

      <Table columns={columns} dataSource={filteredData} rowKey={(record) => record.id} />

      <Modal title="Thêm vị trí" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddViTri}>
          <Form.Item name="tenViTri" label="Tên vị trí" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tinhThanh" label="Tỉnh thành" rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quocGia" label="Quốc gia" rules={[{ required: true, message: 'Vui lòng nhập quốc gia' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">Thêm</Button>
        </Form>
      </Modal>

     
      <Modal title="Chỉnh sửa người dùng" open={isEditModalVisible} onCancel={handleCancelEdit} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleEditViTri}>
        <Form.Item name="tenViTri" label="Tên vị trí" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tinhThanh" label="Tỉnh thành" rules={[{ required: true, message: 'Vui lòng nhập tỉnh thành' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quocGia" label="Quốc gia" rules={[{ required: true, message: 'Vui lòng nhập quốc gia' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">Chỉnh sửa</Button>
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

    </div>
  )
}

export default ManagerLocation