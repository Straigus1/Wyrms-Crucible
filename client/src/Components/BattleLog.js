import React, {useEffect, useRef} from 'react'
import battlelog from '../Images/battle-log.png'

function BattleLog({battleLog}) {
    
    const battleLogEndRef = useRef(null)

    function displayBattleLog() {
        const log = battleLog.map((log) => {
            return (<li className='log-appearance'>{log}</li>  )
        })
        return log
    }

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
            <ul id="scroll">{displayBattleLog()}
            <div ref={battleLogEndRef} />
            </ul>
            
        </div>
    )

}

export default BattleLog