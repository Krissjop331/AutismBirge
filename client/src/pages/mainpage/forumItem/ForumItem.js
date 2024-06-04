import React from 'react'
import './ForumItem.css'
import { useNavigate } from 'react-router-dom'

export const ForumItem = (props) => {
    const item = props.item
    const navigate = useNavigate();
    return (
        <div className='forumItem'  onClick={() => {navigate('/item/' + item.id);
        console.log("OnCLIKC")}}>
            <div className="mainInfo">
                <div className="lastuser">
                    <img src="./img/avatar.png" alt="avatar" />
                    <div className="desc">
                        <p className="name">Antony Taylor</p>
                        <p className="time">2 минуты назад</p>
                    </div>
                </div>
                <div className="title">
                    <h5>{item.title}</h5>
                </div>
            </div>
            <div className="info">
                <div className="themes">
                    <span>Темы:</span> 128
                </div>
                <div className="messages">
                    <span>Сообщения:</span> 128 тыс.
                </div>
                <div className="date">
                    <span>Дата:</span> {item.create}
                </div>
            </div>
        </div>
    )
}
