import React from 'react'
import sorcererpic from '../Images/sorcerer-pic.png'
import { Button } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'

function SorcererUI ({setPalTurn, sorTurn, setSorTurn, setSorcererHealth, sorcererHealth, enemyHealth, setEnemyHealth}) {

    function sorcererDamageModifier() {
        return Math.floor(Math.random() * 10 + 5)
    }

    const sorcererAttack = sorcererDamageModifier()

    

    function className() {
        if (sorTurn === 2) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    function sorAttack() {
        const damage = (enemyHealth) - (sorcererAttack)
        setEnemyHealth(damage)
        setSorTurn(3)
        setPalTurn(1)
    }

    const healthBar = ((sorcererHealth / 38) * 100)

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={sorcererpic}
            alt='rogue pic'
            />
            <div className='character-hp'>HP: {sorcererHealth}/38</div>
            <ProgressBar id='character-healthbar' now={healthBar} />
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