import React from 'react'
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'
import ambientSound from '../Music/fable-lychfield-cemetery.mp3'
import ReactAudioPlayer from 'react-audio-player'

function Transition4() {
    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/battle-four")
    }

    return (
        <div id='transition-four-background' className='game-box'>
            <ReactAudioPlayer
            src={ambientSound}
            autoPlay
            loop
            volume={0.5}
            /> 
            <div>
                <h1 className='top-expo'>Eerie Sounds</h1>
            </div>
            <div className='dialogue-box'>
                <div className='dialogue-box-inner'>
                    <Typewriter
                        onInit={(typewriter)=> {

                        typewriter
                        .pauseFor(200)
                        .changeDelay(10)
                        .typeString("The Party questions Arngeir, who reveals that the shout goes against the creeds of the Greybeards. He directs the Dragonborn to Paarthurnax, who lives on the summit of the Throat, to better conceal his existence. Paarthurnax reveals that although neither he nor anyone else knows the shout, Alduin's defeat through the power of an Elder Scroll had left a gash in time, and theorizes that reading a Scroll would allow the Dragonborn to look through time and learn the shout from those who created it. Having delved into a massive Dwemer city called Blackreach, far below the ground, the Dragonborn retrieves the Scroll and reads it on the Throat, the site of the ancient battle. Alduin arrives and fights with Paarthurnax and the Dragonborn, who has learned the shout and overpowers Alduin, who flees.")
                        .start();
                        }}
                        />
                    <button className='continue-exposition' onClick={continueClick}>Continue</button>
                </div>
            </div>
            <div id='spinner' class="spinner-border text-warning" role="status">
                
            </div>
            <div className='loader'>
                <h3>Loading...</h3>
            </div>

        </div>
    )

}

export default Transition4