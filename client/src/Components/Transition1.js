import React from 'react'
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'
import ambientSound from '../Music/ambient-theme-capstone-project.mp3'
import ReactAudioPlayer from 'react-audio-player'


function Transition1() {
    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/battle-one")
    }

    return (
        <div id='transition-one-background' className='game-box'>
            <ReactAudioPlayer
            src={ambientSound}
            autoPlay
            loop
            volume={0.5}
            /> 
            <div>
                <h1 className='top-expo'>Finding the Swamp</h1>
            </div>
            <div className='dialogue-box'>
                <div className='dialogue-box-inner'>
                    <Typewriter
                        onInit={(typewriter)=> {

                        typewriter
                        .pauseFor(200)
                        .changeDelay(10)
                        .typeString("A shanty town on the swamp’s edge, is where the adventure begins. Aged buildings stand on raised supports, with wooden walkways connecting them. Farm plots cover the ground level, making use of the once-fertile soil that is now poisoned by the cursed corruption. The town is largely self-sustaining, thanks to its crop and animal farming as well as hunters. Toward the center of town is a tavern, the ‘Sodden Coffer’, created long ago as one in a chain of inns. Its original proprietors abandoned it due to lack of business, leaving it to a local family. Overgrowth creeps up the supports and structures, and the town is quiet as the party enter. ")   
                        .start();
                        }}
                        />
                    <button className='continue-exposition' onClick={continueClick}>Continue</button>
                </div>
            </div>
            <div id='spinner' className="spinner-border text-warning" role="status">
                
            </div>
            <div className='loader'>
                <h3>Loading...</h3>
            </div>

        </div>
    )

}

export default Transition1