import React from 'react'
import paladinpic from '../Images/paladin-pic.png'
import { Button } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'


function PaladinUI ({palTurn, setPalTurn, setPaladinHealth, paladinHealth, enemyHealth, setEnemyHealth}) {

    function paladinDamageModifier() {
        return Math.floor(Math.random() * 8 + 4)
    }

    const paladinAttack = paladinDamageModifier()

   

    function className() {
        if (palTurn === 2) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    function palAttack() {
        const damage = (enemyHealth) - (paladinAttack)
        setEnemyHealth(damage)
        setPalTurn(3)
    }

    const healthBar = ((paladinHealth / 47) * 100)

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={paladinpic}
            alt='paladin pic'
            />
            <div className='character-hp'>HP: {paladinHealth}/47</div>
            <ProgressBar id='character-healthbar' now={healthBar} />
            {palTurn === 2 ? 
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