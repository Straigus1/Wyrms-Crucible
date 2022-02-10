import React from 'react'
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'

function Beginning2() {
    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/battleone")
    }

    return (
        <div id='beginning-entrance-background' className='game-box'>
            <div>
                <h1 className='top-expo'>Beginning: Entering the Lighthouse</h1>
            </div>
            <div className='dialogue-box'>
                <div className='dialogue-box-inner'>
                    <Typewriter
                        onInit={(typewriter)=> {

                        typewriter
                        .pauseFor(200)
                        .changeDelay(10)
                        .typeString("Once every ten years, the gods host the Divinity Games - an event where mortals can compete for deification. ")   
                        .pauseFor(1000)
                        .typeString("Every entrant in the competition sacrifices their life, and the energies of the losers are used to empower the new deity. ")
                        .pauseFor(1000)
                        .typeString("If, in ten years, the deity has gathered enough followers to sustain their godhood they continue to live.")
                        .start();
                        }}
                        />
                    <button className='continue-exposition' onClick={continueClick}>Continue</button>
                </div>
            </div>

        </div>
    )

}

export default Beginning2