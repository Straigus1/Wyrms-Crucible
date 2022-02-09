import React from 'react'
import sorcererpic from '../Images/sorcerer-pic.png'
import sorcererdead from '../Images/sorcerer-pic-dead.png'
import sorcererac from '../Images/sorcerer-armor.png'
import { Button } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'

function SorcererUI ({updateBattleLog, sorTurn, setSorTurn, sorcererHealth, enemyHealth, setEnemyHealth}) {

    function sorcererDamageModifier() {
        return (Math.floor(Math.random() * 19 + 3) + 1)
    }

    const sorcererAttack = sorcererDamageModifier()

    

    function className() {
        if (sorTurn === 1) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    const diceRoll = Math.floor(Math.random() * 20 + 1)

    function sorcererDiceRoll() {
        return (diceRoll) + 5
    }
    const sorcererRoll = sorcererDiceRoll()

    function sorAttack() {
        const damage = (enemyHealth) - (sorcererAttack)
        if (sorcererRoll >= 14) {
            if (sorcererAttack <= 14) {
                updateBattleLog(
                    `Sorcerer rolled 🎲(${diceRoll}) + 5 against the enemy.`,
                    `Sorcerer blasted the enemy for ${sorcererAttack} damage!`)
            } else {
                updateBattleLog(
                    `Sorcerer rolled 🎲(${diceRoll}) + 5 against the enemy.`,
                    `Sorcerer obliterated the target for ${sorcererAttack} damage!!`)
            }
        setEnemyHealth(damage)
        } else {
            updateBattleLog(
                `Sorcerer rolled (${diceRoll}) + 5 against the enemy.`,
                `Sorcerer missed the target`)
        }
        setSorTurn(2)
        // setPalTurn(1)
    }

    

    if (sorcererHealth < 0 ) {
        sorcererHealth = 0
    }

    const healthBar = ((sorcererHealth / 38) * 100)

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
    function sorcererStatus() {
        if (sorcererHealth > 0) {
            return sorcererpic
        } else {
            return sorcererdead
        }
    }

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={sorcererStatus()}
            alt='rogue pic'
            />
            <img 
            className='sorcerer-ac'
            src={sorcererac}
            alt='sorcerer shield'
            />
            <div className='character-hp'>HP: {sorcererHealth}/38</div>
            <ProgressBar variant={progressBarClass()} animated id='character-healthbar' now={healthBar} />
            {sorTurn === 1 ? 
            <Button 
                id='attack-turn'
                onClick={sorAttack}>
            Attack
            </Button> :
            <Button id='attack'>
            Standby
            </Button>
            }
         

            
        </div>
    )
}

export default SorcererUI