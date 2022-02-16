import React from 'react'
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'
import ambientSound from '../Music/ambient-theme-capstone-project.mp3'
import ReactAudioPlayer from 'react-audio-player'

function Transition3() {
    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/battle-three")
    }

    return (
        <div id='transition-three-background' className='game-box'>
            <ReactAudioPlayer
            src={ambientSound}
            autoPlay
            loop
            /> 
            <div>
                <h1 className='top-expo'>Entering the Lair</h1>
            </div>
            <div className='dialogue-box'>
                <div className='dialogue-box-inner'>
                    <Typewriter
                        onInit={(typewriter)=> {

                        typewriter
                        .pauseFor(200)
                        .changeDelay(10)
                        .typeString("The Party is intercepted on one training quest by Delphine, a member of the order of the Blades, who in ancient times had served the Dragonborn. Delphine arranges for the Dragonborn to infiltrate the Thalmor Embassy to gain information; they learn that another member of the Blades, named Esbern, is in hiding in Riften. When Delphine and the Dragonborn find him, he reveals that the ancient Blades had carved a massive engraving in a temple in the Reach, an unstable region in Skyrim's west. This carving, called Alduin's Wall, depicted the dragon's defeat at the hands of the ancient Nords, and Esbern deciphers that those warriors had used a special shout to remove his ability to fly.")
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

export default Transition3