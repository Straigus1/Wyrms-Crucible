import {useState, useEffect} from 'react'
import TypeWriterEffect from 'react-typewriter-effect';
import battlelog from '../Images/battle-log.png'

function BattleLog({battleLog}) {

    function displayBattleLog() {
        const log = battleLog.map((log) => {
            return <p>{log}</p>
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
            {displayBattleLog()}
        </div>
    )

}

export default BattleLog