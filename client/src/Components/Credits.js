import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import ambientSound from '../Music/ambient-theme-capstone-project.mp3'
import fin from '../Images/fin.png'
import { useNavigate } from 'react-router'


function Credits() {

    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/")
    }
    return (
        <div id="credits-background" className='game-box'>
            <div>
                <h2 className='credits-header'>Game Developer</h2>
                <p className='credits-name'>Dayton Lyrik Houston</p>
                <h2 className='credits-header'>Music Producer</h2>
                <p className='credits-name'>Tyler Smith</p>
                <h2 className='credits-header'>Special Thanks</h2>
                <p className='credits-name'>Akeem Smith</p>
                <p className='credits-name'>Babe Abulaila</p>
                <p className='credits-name'>Nick Lunn</p>
            </div>
            <div id='other music'>
                <h1 className='feature-music'>Featured Music</h1>
                <h2 className='credits-header'>Dark Souls</h2>
                <p className='credits-name'>Great Grey Wolf Sif</p>
                <h2 className='credits-header'>Fable</h2>
                <p className='credits-name'>Darkwood</p>
                <p className='credits-name'>Witchwood</p>
                <p className='credits-name'>Lychfield Cemetery</p>
                <h2 className='credits-header'>Magna Carta 2</h2>
                <p className='credits-name'>Battle Conditions</p>
            </div>
            <ReactAudioPlayer
                src={ambientSound}
                className="music-control-title"
                autoPlay
                loop
                volume={0.5} 
            /> 
            <img 
            className='fin'
            src={fin}
            alt='fin'
            />
            <button id='credits-button' className='continue-exposition' onClick={continueClick}>Continue</button>
        </div>
    )
}

export default Credits