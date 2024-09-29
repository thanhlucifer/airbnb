import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import { FaLocationPin } from "react-icons/fa6";
import { MdRoomPreferences } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
const AdminTemplate = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout className='min-h-screen'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="flex justify-center items-center mt-5 mb-5 text-[#F72F5B] font-bold text-2xl">
                    <SiNginxproxymanager />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link to="/admin">Quản lý người dùng</Link>,
                        },
                        {
                            key: '2',
                            icon: <FaLocationPin />,
                            label: <Link to="/admin/manager-location">Quản lý vị trí</Link>,
                        },
                        {
                            key: '3',
                            icon: <MdRoomPreferences />,
                            label: <Link to="/admin/manager-room">Quản lý phòng</Link>,
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet>

                    </Outlet>
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminTemplate;