import {useState} from 'react'
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'
import ambientSound from '../Music/ambient-theme-capstone-project.mp3'
import ReactAudioPlayer from 'react-audio-player'

function Transition5() {
    const navigate = useNavigate()

    const [finished, setFinished] = useState(false)
    function doneLoading() {
        setTimeout(() => {
            setFinished(true)
        }, 8000)
        if (finished) {
            return (
                <div>
                    <div id='circle' ></div>
                        <div className='loader'>
                            <h3>Finished.</h3>
                        </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div id='spinner' className="spinner-border text-warning" role="status">
                    </div>
                        <div className='loader'>
                            <h3>Loading...</h3>
                        </div>
                </div>
            )
        }
        
    }

    function continueClick (e) {
        e.preventDefault()
        navigate("/battle-five")
    }

    return (
        <div id='transition-five-background' className='game-box'>
            <ReactAudioPlayer
            src={ambientSound}
            autoPlay
            loop
            volume={0.5}
            /> 
            <div>
                <h1 className='top-expo'>Teleportation Trap</h1>
            </div>
            <div className='dialogue-box'>
                <div className='dialogue-box-inner'>
                    <Typewriter
                        onInit={(typewriter)=> {

                        typewriter
                        .pauseFor(200)
                        .changeDelay(10)
                        .typeString("The Party learns from Esbern how to summon a dragon named Odahviing, whom they trap in Whiterun with Jarl Balgruuf's assistance. Odahviing, believing that the Dragonborn is mightier than Alduin, turns on his former leader and reveals that he has gone to recover his strength in Sovngarde, the Nordic afterlife, where he feeds on the souls of the dead. Since the portal to Sovngarde cannot be reached on foot, Odahviing bargains his freedom in exchange for flying the Dragonborn there. Entering Sovngarde, the Dragonborn meets the three heroes who had defeated Alduin originally; with their help, the Dragonborn kills Alduin.")
                        .start();
                        }}
                        />
                    <button className='continue-exposition' onClick={continueClick}>Continue</button>
                </div>
            </div>
            {doneLoading()}

        </div>
    )

}

export default Transition5