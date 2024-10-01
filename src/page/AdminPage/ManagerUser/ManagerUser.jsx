import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationContext } from '../../../App';
import { Tag, Table, Space, Input } from 'antd';
import { getValueUserApi } from '../../../redux/nguoiDungSilde';
import { nguoidungService } from '../../../service/nguoidung.service';

const ManagerUser = () => {
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const { listNguoiDung } = useSelector(state => state.nguoiDungSilde);
  const [filteredData, setFilteredData] = useState([]); // Khởi tạo là mảng rỗng
  const { Search } = Input;

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
          <button onClick={() => {
            nguoidungService.deleteUser(record.id).then((res) => {
              console.log(res);
              dispatch(getValueUserApi());
              showNotification(res.data.message, 'success');
            }).catch((err) => {
              console.log(err);
              showNotification(err.response.data.message || err.response.data.content, 'error');
            });
          }} className="btn bg-red-500 rounded-md py-2 px-2 text-white">Delete</button>
          <button className="btn bg-yellow-400 rounded-md py-2 px-2">Edit</button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Nhập tên người dùng"
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: '20px' }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey={(record) => record.id} />
    </div>
  );
}

export default ManagerUser;
