import React from 'react'
import { FaFacebook, FaTwitter , FaInstagram } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import './Footer.scss'
const itemsfooter = [
    {
        id: 1,
        title: 'About Airbnb',
        list:[
            'Phương thức hoạt động của airbnb',
            'Trang tin tức',
            'Nhà đầu tư',
            'Airbnb Plus',
            'Airbnb Luxe',
            'HotelTonight',
            'Airbnb for Work',
            'Made possible by Hosts',
            'Cơ hội nghề nghiệp',
            'Thư của nhà sáng lập,'
        ]
    },
    {
        id: 2,
        title: 'Cộng đồng',
        list:[
            'Sự đa dạng và cảm giác thân thuộc',
            'Tiện nghi phù hợp cho người khuyết tật',
            'Đối tác liên kết Airbnb',
            'Chỗ ở cho tuyến đầu',
            'Lượt giới thiệu của khách',
            'Airbnb.org',
            
        ]
    },
    {
        id: 3,
        title: 'Đón tiếp khách',
        list:[
            'Cho thuê nhà',
            'Tổ chức trải nghiệm trực tuyến',
            'Tổ chức trải nghiệm',
            'Đón tiếp khách có trách nhiệm',
            'Trung tâm tài nguyên',
            'Trung tâm cộng đồng',
        ]
    },
    {
        id: 4,
        title: 'Hỗ trợ',
        list:[
            'Trung tâm trợ giúp',
            'Các tùy chọn hủy',
            'Hỗ trợ khu dân cư',
            'Tin cậy và an toàn',
        ]
    }
]








const Footer = () => {
  return (
    <div className="footer">
         <div className="footerInner">
        <span>
          <h2>{itemsfooter[0].title}</h2>
          <ul>
            {itemsfooter[0].list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </span>
        <span>
          <h2>{itemsfooter[1].title}</h2>
          <ul>
            {itemsfooter[1].list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </span>
        <span>
          <h2>{itemsfooter[2].title}</h2>
          <ul>
            {itemsfooter[2].list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </span>
        <span>
          <h2>{itemsfooter[3].title}</h2>
          <ul>
            {itemsfooter[3].list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </span>
        <span className="footer-bottom">
          <p>
            <span>
              <CiGlobe className="globe" />
              Tiếng Việt(VN)
            </span>
            <span>
              <FiDollarSign className="dollar" />
              USD
            </span>
            <span>
              <FaFacebook />
            </span>
            <span>
              <FaTwitter />
            </span>
            <span>
              <FaInstagram />
            </span>
          </p>
          <p>
            &copy; 2024 Airbnb, Inc.{" "}
            <a href="https://lucifer-portfolio-nextjs.vercel.app/" target="_blank" rel="noreferrer">
              Lucifer
            </a>
          </p>
        </span>
      </div>
    </div>
  )
}

export default Footer