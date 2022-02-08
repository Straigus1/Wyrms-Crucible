import React from 'react'
import sorcererpic from '../Images/sorcerer-pic.png'
import sorcererdead from '../Images/sorcerer-pic-dead.png'
import sorcererac from '../Images/sorcerer-armor.png'
import { Button } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'

function SorcererUI ({setPalTurn, sorTurn, setSorTurn, setSorcererHealth, sorcererHealth, enemyHealth, setEnemyHealth}) {

    function sorcererDamageModifier() {
        return (Math.floor(Math.random() * 19 + 3) + 1)
    }

    const sorcererAttack = sorcererDamageModifier()

    

    function className() {
        if (sorTurn === 2) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    function sorcererDiceRoll() {
        return (Math.floor(Math.random() * 20 + 1) + 6)
    }
    const sorcererRoll = sorcererDiceRoll()

    function sorAttack() {
        const damage = (enemyHealth) - (sorcererAttack)
        if (sorcererRoll >= 14) {
        setEnemyHealth(damage)}
        setSorTurn(3)
        setPalTurn(1)
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
            {sorTurn === 2 ? 
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