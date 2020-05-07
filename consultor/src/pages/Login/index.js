import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

function Login() {
    const[userName, setUserName] = useState('')
    const[password, setPassword] = useState('')

    const history = useHistory()

    function handleLogin(e) {
        e.preventDefault()

        localStorage.setItem('userName', userName)
        localStorage.setItem('password', password)

        history.push('/chat')

    }

    return(
        <form className="box-login" onSubmit={handleLogin} >
            <h1>Login do consultor</h1>
            <input
            type="text"
            placeholder="Nome do usuário"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            />
            <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
        </form>
    )
}

export default Login