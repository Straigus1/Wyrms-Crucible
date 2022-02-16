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
                <p className='credits-name'>Dayton Houston</p>
                <h2 className='credits-header'>Music Producer</h2>
                <p className='credits-name'>Tyler Smith</p>
                <h2 className='credits-header'>Special Thanks</h2>
                <p className='credits-name'>Akeem Smith</p>
                <p className='credits-name'>Babe Abulaila</p>
            </div>
            <ReactAudioPlayer
                src={ambientSound}
                className="music-control-title"
                autoPlay
                loop
            /> 
            <img 
            className='fin'
            src={fin}
            alt='fin'
            />
            <button className='continue-exposition' onClick={continueClick}>Continue</button>
        </div>
    )
}

export default Credits