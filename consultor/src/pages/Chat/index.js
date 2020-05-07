import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { FiSend, FiCircle, FiArrowRight, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

function Chat() {
    const [messages, setmessages] = useState([])
    const [message, setMessage] = useState('')

    const [name, setName] = useState('')
    const [date, setDate] = useState('')

    const userName = localStorage.getItem('userName')

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

        const name = userName

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

    async function handleDeleteMessage(_id) {
        try {
            await api.delete(`/messages/${_id}`)

            setmessages(messages.filter(message => message._id !== _id))

        }catch(err) {
            alert('Erro ao deletar mensagem, tente novamente.')
        }
    }

    async function filterByName(e) {
        e.preventDefault()

        try {
            const response = await api.get('/messages/name', {
                params: {
                    name
                }
            })

            setmessages(response.data)

            scrollToBottom()
        } catch (err) {
            alert('Erro ao filtrar mensagens')
        }
    }

    async function filterByDate(e) {
        e.preventDefault()

        try {
            const response = await api.get('/messages/date', {
                params: {
                    date
                }
            })

            setmessages(response.data)

            scrollToBottom()
        } catch (err) {
            alert('Erro ao filtrar mensagens')
        }
    }

    async function FilterRecents(e) {
        e.preventDefault()

        try {
            const response = await api.get('/messages/sort', {
                params: {
                    toggle: 1
                }
            })

            setmessages(response.data)

            scrollToBottom()
        } catch (err) {
            alert('Erro ao filtrar mensagens')
        }
    }

    async function FilterOlders(e) {
        e.preventDefault()

        try {
            const response = await api.get('/messages/sort', {
                params: {
                    toggle: -1
                }
            })

            setmessages(response.data)

            scrollToBottom()
        } catch (err) {
            alert('Erro ao filtrar mensagens')
        }
    }




    return (
        <>
            <Link className="link" to="/participantes">
                Lista de participantes <FiArrowRight size={16}/>
            </Link>

            <aside className="box-filters" >
                <form className="filter" onSubmit={filterByName} >
                    <label>Filtrar por nome</label>
                    <input
                        type="text"
                        placeholder="Digite o nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button type="submit" >Filtrar</button>
                </form>

                <form className="filter" onSubmit={filterByDate} >
                    <label>Filtrar por data</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <button>Filtrar</button>
                </form>

                <form>
                    <label>Ordenar por:</label>
                    <button className="button-filter" onClick={FilterRecents}>Mais recentes</button>
                    <button className="button-filter" onClick={FilterOlders}>Mais antigas</button>
                </form>

            </aside>

            <div className="content">
                <div className="container">
                    <ul id="box-messages" className="box-messages">
                        {messages.map(message => (
                            <>
                            <li key={message._id}>
                                <p><strong>{message.date.slice(0, 10)} - {message.name} - {message.date.slice(11, 16)} =></strong>{message.message}</p>
                            </li>
                            <button onClick={() => handleDeleteMessage(message._id)} type="button">
                                <FiTrash2 size={12} color="a8a8b3"/>
                            </button>
                            </>
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
                        <FiCircle size={8} color="#25ec13" /> {userName}
                    </strong>
                </aside>

            </div>

        </>
    )
}

export default Chat