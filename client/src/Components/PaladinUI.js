import React from 'react'
import paladinpic from '../Images/paladin-pic.png'
import paladindead from '../Images/paladin-pic-dead.png'
import paladinac from '../Images/paladin-armor.png'
import { Button } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'


function PaladinUI ({updateBattleLog, palTurn, setPalTurn, paladinHealth, enemyHealth, setEnemyHealth}) {

    function paladinDamageModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 7)
    }
    const paladinAttack = paladinDamageModifier()

    function paladinDiceRoll() {
        return (Math.floor(Math.random() * 20 + 1) + 6)
    }
    const paladinRoll = paladinDiceRoll()

   

    function className() {
        if (palTurn === 2) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    function palAttack() {
        const damage = (enemyHealth) - (paladinAttack)
        // updateBattleLog(`Paladin rolled 🎲${paladinRoll} against the opponent.`)
        if (paladinRoll >= 14) {
            if (paladinAttack <= 11) {
                updateBattleLog(
                    `Paladin rolled 🎲${paladinRoll} against the opponent.`,
                    `Paladin attacked the enemy for ${paladinAttack} damage!`)
            } else {
                updateBattleLog(
                    `Paladin rolled 🎲${paladinRoll} against the opponent.`,
                    `Paladin crushed the target for ${paladinAttack} damage!!`)
            }
            setEnemyHealth(damage)
        } else {
            updateBattleLog(
                `Paladin rolled 🎲${paladinRoll} against the opponent.`,
                `Paladin misses the mark!`)
        }
            setPalTurn(2)
    }
    if (paladinHealth < 0) {
        paladinHealth = 0
    }

    const healthBar = ((paladinHealth / 47) * 100)

    function progressBarClass () {
        if (healthBar < 100 && healthBar >= 50) {
            return "success"
        } else if (healthBar < 50 && healthBar >= 25) {
            return "warning"
        } else if (healthBar < 25) {
            return "danger"
        } else {
            return ""
        }

    } 

    function paladinStatus() {
        if (paladinHealth > 0) {
            return paladinpic
        } else {
            return paladindead
        }
    }

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={paladinStatus()}
            alt='paladin pic'
            />
            <img 
            className='paladin-ac'
            src={paladinac}
            alt='paladin shield'
            />
            <div className='character-hp' >HP: {paladinHealth}/47</div>
            <ProgressBar variant={progressBarClass()} animated id='character-healthbar' now={healthBar} />
            {palTurn === 1 ? 
            <Button 
                id='attack-turn'
                onClick={palAttack}>
            Attack
            </Button> :
            <Button id='attack'>
            Standby
            </Button>
            }
         

            
        </div>
    )
}

export default PaladinUI