import {useState, useEffect} from 'react'
import TypeWriterEffect from 'react-typewriter-effect';
import battlelog from '../Images/battle-log.png'

function BattleLog({setRogueHealth, setPaladinHealth, setSorcererHealth, setEnemyHealth, enemyAttack, rogueHealth, sorcererHealth, paladinHealth, enemyHealth}) {
    
  
    function logActions () {
        let damage = enemyAttack
        if (rogueHealth--) {
            return <p>Rogue took {damage} damage!</p>
        } else if (paladinHealth--) {
            return <p>Paladin took {damage} damage!</p>
        } else if (sorcererHealth--) {
            return <p>Sorcerer took {damage} damage!</p>
        }
    }
       

    return (
        <div className='battle-log'> 
            <img 
            className='log-image'
            src={battlelog}
            alt='battle log'
            />
            {logActions()}
        </div>
    )

}

export default BattleLog