import React from 'react'
import roguepic from '../Images/rogue-pic.png'
import { Button } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'


function RogueUI ({setSorTurn, rogTurn, setRogTurn, setRogueHealth, rogueHealth, enemyHealth, setEnemyHealth}) {

    function rogueDamageModifier() {
        return Math.floor(Math.random() * 5 + 9)
    }

    const rogueAttack = rogueDamageModifier()

    

    function className() {
        if (rogTurn === 1) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    function rogAttack() {
        const damage = (enemyHealth) - (rogueAttack)
        setEnemyHealth(damage)
        setRogTurn(2)
        setSorTurn(1)
    }

    const healthBar = ((rogueHealth / 41) * 100)
    

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={roguepic}
            alt='rogue pic'
            />
            <div className='character-hp'>HP: {rogueHealth}/41</div>
            <ProgressBar id='character-healthbar' now={healthBar} />
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