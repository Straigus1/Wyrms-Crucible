import React from 'react'
import roguepic from '../Images/rogue-pic.png'
import roguedead from '../Images/rogue-pic-dead.png'
import rogueac from '../Images/rogue-armor.png'
import { Button } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'


function RogueUI ({updateBattleLog, rogTurn, setRogTurn, rogueHealth, enemyHealth, setEnemyHealth}) {

    function rogueDamageModifier() {
        return (Math.floor(Math.random() * 11 + 2) + 6)
    }

    const rogueAttack = rogueDamageModifier()

    function rogueDiceRoll() {
        return (Math.floor(Math.random() * 20 + 1) + 6)
    }
    
    
    const rogueRoll = rogueDiceRoll()
    
    function rogAttack() {
        const damage = (enemyHealth) - (rogueAttack)
       // updateBattleLog(`Rogue rolled 🎲${rogueRoll} against the opponent.`)
        if (rogueRoll >= 14) {
            if (rogueAttack <= 12) {
                updateBattleLog(
                    `Rogue rolled 🎲${rogueRoll} against the opponent.`,
                    `Rogue slashed the enemy for ${rogueAttack} damage! `)
            } else {
                updateBattleLog(
                    `Rogue rolled 🎲${rogueRoll} against the opponent.`,
                    `Rogue mutilated the target for ${rogueAttack} damage!!`)
            }
            setEnemyHealth(damage)
        } else {
            updateBattleLog(
                `Rogue rolled 🎲${rogueRoll} against the opponent.`,
                'Rogue missed the target')
        }
        setRogTurn(2)
        // setSorTurn(1)
        // updateBattleLog(`Rogue did ${damage} to enemy`)
    }

    if (rogueHealth < 0) {
        rogueHealth = 0
    }

    const healthBar = ((rogueHealth / 41) * 100)

    function className() {
        if (rogTurn === 1) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

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

    function rogueStatus() {
        if (rogueHealth > 0) {
            return roguepic
        } else {
            return roguedead
        }
    }
    
    

    return (
        <div className={className()}>
            
            <img 
            className='character-pics'
            src={rogueStatus()}
            alt='rogue pic'
            />
            <img 
            className='rogue-ac'
            src={rogueac}
            alt='rogue shield'
            />
            <div className='character-hp'>HP: {rogueHealth}/41</div>
            <ProgressBar variant={progressBarClass()} animated id='character-healthbar' now={healthBar} />
            {rogTurn === 1 ? 
            <Button 
                id='attack-turn'
                onClick={rogAttack}>
            Attack
            </Button> :
            <Button id='attack'>
            Standby
            </Button>
            }
        </div>
    )

}

export default RogueUI