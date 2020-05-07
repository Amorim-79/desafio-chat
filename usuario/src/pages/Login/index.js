import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

function Login() {
    const [name, setName] = useState('')

    const history = useHistory()
    
    function handleLogon(e) {
        e.preventDefault()

        localStorage.setItem('name', name)

        history.push('/Chat')
    }
    
    return(
        <form className="container-login" onSubmit={handleLogon}>
            <input
            className="input-name"
            placeholder="Digite seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <button className="button" type="submit">Entrar</button>
        </form>
    )
}

export default Login