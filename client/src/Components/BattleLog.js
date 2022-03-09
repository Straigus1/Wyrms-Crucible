import React, {useEffect, useRef} from 'react'
import battlelog from '../Images/battle-log.png'

function BattleLog({battleLog}) {
    

    function displayBattleLog() {
        const log = battleLog.map((log) => {
            return <li className='log-appearance'>{log}</li>
        })
        return log
    }
    const battleLogEndRef = useRef(null)

    function scrolltoBottom() {
        battleLogEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrolltoBottom()
    }, [battleLog])
   
       

    return (
        <div className='battle-log'> 
            <img 
            className='log-image'
            src={battlelog}
            alt='battle log'
            />
            <div id="scroll">{displayBattleLog()}
            <div ref={battleLogEndRef} />
            </div>
            
        </div>
    )

}

export default BattleLog