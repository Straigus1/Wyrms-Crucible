import React from 'react'
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'
import ambientSound from '../Music/ambient-theme-capstone-project.mp3'
import ReactAudioPlayer from 'react-audio-player'

function Transition2() {
    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/battle-two")
    }

    return (
        <div id='transition-two-background' className='game-box'>
            <ReactAudioPlayer
            src={ambientSound}
            autoPlay
            loop
            volume={0.5}
            /> 
            <div>
                <h1 className='top-expo'>Discovering the Crucible</h1>
            </div>
            <div className='dialogue-box'>
                <div className='dialogue-box-inner'>
                    <Typewriter
                        onInit={(typewriter)=> {

                        typewriter
                        .pauseFor(200)
                        .changeDelay(10)
                        .typeString("Imperial soldiers catch the party illegally crossing the border into Skyrim and mistake them for a Stormcloak rebel, a crime for which the player receives a death sentence. The execution of the player character by the Imperials in Helgen, a small settlement in Skyrim's south, is interrupted when Alduin starts laying waste to the village. The player manages to escape through the tunnels underneath the keep, and heads to the nearby village of Riverwood, whose inhabitants ask the player to inform the Jarl of Whiterun, a large town to the north, of the dragon attack. After meeting with Jarl Balgruuf, and retrieving a tablet with information about the dragons from a nearby barrow on his behalf, the player kills a dragon which attacks nearby and absorbs its soul. After shouting, the player is informed that they must be Dragonborn, and is soon summoned by the Greybeard monks. After a long journey and climb up the Throat of the World, the tallest mountain in Tamriel and home of the Greybeards, the Dragonborn is informed by Arngeir of their heritage and role in stopping Alduin, and begins their training.")
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

export default Transition2