import React from 'react'
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'

function Beginning() {
    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/beginning-entrance")
    }

    return (
        <div id='beginning-background' className='game-box'>
            <div>
                <h1 className='top-expo'>Beginning: Finding the Lighthouse</h1>
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

export default Beginning