import {useState, useEffect} from 'react'
import Typewriter from "typewriter-effect";
import battlelog from '../Images/battle-log.png'

function BattleLog({battleLog}) {

    function displayBattleLog() {
        const log = battleLog.map((log) => {
            return <li>{log}</li>
        })
        return log
    }

    
       

    return (
        <div className='battle-log'> 
            <img 
            className='log-image'
            src={battlelog}
            alt='battle log'
            />
            <ul id="scroll">{displayBattleLog()}</ul>
           
        </div>
    )

}

export default BattleLog