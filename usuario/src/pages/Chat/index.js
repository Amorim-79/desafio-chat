import React, { useState, useEffect } from 'react'
import { animateScroll } from 'react-scroll'
import { FiSend, FiCircle } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

function Chat() {
    const [messages, setmessages] = useState([])
    
    const [message, setMessage] = useState('')
    const name = localStorage.getItem('name')
    
    function scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "box-messages"
        })
    }

    useEffect(() => {
        async function loadMessages() {
            const response = await api.get('/messages')

            setmessages(response.data)

            scrollToBottom()
        }

        loadMessages()
    }, [])

    async function handleSendMessage(e) {
        e.preventDefault()

        const data = {
            name,
            message
        }

        try {
            const response = await api.post('/messages', data)

            setmessages([...messages, response.data])

            scrollToBottom()

        } catch (err) {
            alert('Erro ao enviar mensagem, tente novamente.')
        }

    }


    return (
        <div className="content">
            <div className="container">
                <ul id="box-messages" className="box-messages">
                    {messages.map(message => (
                        <li key={message._id}>
                            <p><strong>{message.date.slice(0,10)} - {message.name} - {message.date.slice(11, 16)} =></strong>{message.message}</p>
                        </li>
                    ))}
                </ul>

                <form className="form-send" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button type="submit">
                        <FiSend size={25} color="#E02041" />
                    </button>
                </form>
            </div>

            <aside className="show-users">
                <strong>
                    <FiCircle size={8} color="#25ec13" /> {name}
                </strong>
            </aside>

        </div>
    )
}

export default Chat