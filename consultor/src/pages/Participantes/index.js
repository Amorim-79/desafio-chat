import React, { useState, useEffect } from 'react'

import './styles.css'

import api from '../../services/api'

function Participantes() {
    const [participantes, setParticipantes] = useState([])

    
    useEffect(() => {
        async function loadParticipantes() {
            const response = await api.get('/participantes')

            setParticipantes(response.data)


        }

        loadParticipantes()
    }, [])

    return (

            <div className="box-names">
                <ul>
                    {participantes.map(participante => (
                        <li>{participante.name}</li>
                    ))}
                </ul>
            </div>
    )
}

export default Participantes