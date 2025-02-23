import { Button } from '@mui/material'
import React from 'react'
import './hero.css'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className='text-center hero'>
            <div className="hero-info">
                <h1>Genera un proyecto funcional utilizando diferentes agentes interconectados entre sí</h1>
                <Button onClick={()=>navigate('/rubro')} className='hero-info__button' size='large' variant="contained">Comenzar</Button>
            </div>
        </div>
    )
}

export default Hero