import React from 'react'
import './LiveCard.scss'
const items = [
    {
        id: 1,
        title: 'Toàn bộ nhà',
        img: '/card/lfh58vu7.png'
    },
    {
        id: 2,
        title: 'Chỗ ở độc đáo',
        img: '/card/jgj3wd49.png'
    },
    {
        id: 3,
        title: 'Trang trại và thiên nhiên',
        img: '/card/b7jpyjv7.png'
    },
    {
        id: 4,
        title: 'Cho phép thú cưng',
        img: '/card/8hrjjchp.png'
    },
]
const LiveCard = () => {
    return (
        <>
            <h2 className='text-2xl font-bold mb-4 mt-8'>Ở bất cứ đâu</h2>
            <div className="cards">
                {items.map((item) => (
                    <div className="live-card-item space-y-2" key={item.id}>
                        <img src={item.img} alt="" width={256} height={256} />
                        <span>
                            <h3 className='text-xl'>{item.title}</h3>
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LiveCard