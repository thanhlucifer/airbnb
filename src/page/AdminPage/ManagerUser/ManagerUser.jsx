import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationContext } from '../../../App';
import { Tag, Table, Space, Input, Button, Modal, Form, Radio, Select } from 'antd';
import { getValueUserApi } from '../../../redux/nguoiDungSilde';
import { nguoidungService } from '../../../service/nguoidung.service';

const ManagerUser = () => {
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const { listNguoiDung } = useSelector(state => state.nguoiDungSilde);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Search } = Input;
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State cho modal chỉnh sửa
  const [editingUser, setEditingUser] = useState(null); // Lưu thông tin người dùng cần chỉnh sửa


  useEffect(() => {
    dispatch(getValueUserApi());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(listNguoiDung)) {
      setFilteredData(listNguoiDung);
    }
  }, [listNguoiDung]);

  const handleSearch = (value) => {
    if (value) {
      nguoidungService.searchUserName(value).then((res) => {
        setFilteredData(res.data.content || []); // Đảm bảo là mảng
      }).catch((err) => {
        console.log(err);
        showNotification('Không tìm thấy người dùng', 'error');
      });
    } else {
      setFilteredData(listNguoiDung);
    }
  };

  // Hàm hiển thị modal thêm người dùng
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Xóa dữ liệu trong form sau khi đóng
  };

  // Hàm submit form thêm người dùng
  const handleAddUser = (values) => {
    nguoidungService.addUser(values).then((res) => {
      showNotification('Thêm người dùng thành công!', 'success');
      dispatch(getValueUserApi());
      handleCancel(); // Đóng modal sau khi thêm thành công
    }).catch((err) => {
      console.log(err);
      showNotification('Thêm người dùng thất bại!', 'error');
    });
  };

  const showEditModal = (record) => {
    setEditingUser(record); // Lưu thông tin người dùng đang chỉnh sửa
    setIsEditModalVisible(true); // Mở modal chỉnh sửa
    form.setFieldsValue(record); // Đổ dữ liệu của người dùng vào form
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false); // Đóng modal chỉnh sửa
    form.resetFields(); // Xóa dữ liệu trong form
  };

  const handleEditUser = (values) => {
    if (editingUser) {
      nguoidungService.editUserAdmin(editingUser.id, values).then((res) => {
        showNotification('Chỉnh sửa người dùng thành công!', 'success');
        dispatch(getValueUserApi()); // Lấy lại danh sách người dùng sau khi chỉnh sửa
        handleCancelEdit(); // Đóng modal sau khi chỉnh sửa thành công
      }).catch((err) => {
        console.log(err);
        showNotification('Chỉnh sửa người dùng thất bại!', 'error');
      });
    }
  };


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <img src={text} alt="avatar" className='h-10' />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => <Tag color={text ? 'green' : 'red'}>{text ? 'Male' : 'Female'}</Tag>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <Tag color={text === 'USER' ? 'cyan-inverse' : 'red-inverse'}>{text}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => {
            nguoidungService.deleteUser(record.id).then((res) => {
              console.log(res);
              dispatch(getValueUserApi());
              showNotification(res.data.message, 'success');
            }).catch((err) => {
              console.log(err);
              showNotification(err.response.data.message || err.response.data.content, 'error');
            });
          }} className="btn bg-red-500 rounded-md py-2 px-2 text-white">Delete</Button>
          <Button onClick={() => showEditModal(record)} className="btn bg-yellow-400 rounded-md py-2 px-2">Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Nút thêm người dùng */}
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Thêm người dùng
      </Button>
      <Search
        placeholder="Nhập tên người dùng"
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: '20px' }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey={(record) => record.id} />
      {/* Modal thêm người dùng */}
      <Modal title="Thêm người dùng" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddUser}>
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' }]}
          >
            <Input
              onBlur={(e) => {
                const value = e.target.value;
                // Kiểm tra nếu email không có @gmail.com thì thêm nó vào
                if (value && !value.includes('@')) {
                  form.setFieldsValue({ email: `${value}@gmail.com` });
                }
              }}
            />
          </Form.Item>

          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}>
            <Select>
              <Select.Option value="ADMIN">Admin</Select.Option>
              <Select.Option value="USER">User</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Thêm</Button>
        </Form>
      </Modal>

      {/* Modal thay đổi người dùng */}
      <Modal title="Chỉnh sửa người dùng" open={isEditModalVisible} onCancel={handleCancelEdit} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleEditUser}>
          <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email', message: 'Email không hợp lệ' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}>
            <Select>
              <Select.Option value="ADMIN">Admin</Select.Option>
              <Select.Option value="USER">User</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Chỉnh sửa</Button>
        </Form>
      </Modal>

    </div>
  );
}

export default ManagerUser;
