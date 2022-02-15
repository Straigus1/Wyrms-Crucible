import React from 'react'
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'
import ambientSound from '../Music/ambient-theme-capstone-project.mp3'

function Transition3() {
    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/battle-three")
    }

    return (
        <div id='transition-three-background' className='game-box'>
            <iframe
            src={ambientSound}
            allow="autoplay"
            style={{ display: "none" }}
            id="iframeAudio"
        ></iframe>
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
                        .typeString("Upon entering the lighthouse, it immediately becomes clear that something isn’t right. ")   
                        .pauseFor(1000)
                        .typeString("The player will find the corpse of a Redguard woman lying in the central room, with a Falmer sword next to her. ")
                        .pauseFor(1000)
                        .typeString("By the fireplace will be a Chaurus carcass and a wooden ax laying among the remains, hinting that the woman put up a fight but ultimately lost.")
                        .start();
                        }}
                        />
                    <button className='continue-exposition' onClick={continueClick}>Continue</button>
                </div>
            </div>

        </div>
    )

}

export default Transition3