import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

function BattleOne () {
    const [enemyHealth, setEnemyHealth] = useState(60)
    const [paladinHealth, setPaladinHealth] = useState(47)
    const [rogueHealth, setRogueHealth] = useState(41)
    const [sorcererHealth, setSorcererHealth] = useState(38)

    function enemyDamageModifier() {
        return Math.floor(Math.random() * 13 + 2)
    }
    function paladinDamageModifier() {
        return Math.floor(Math.random() * 8 + 4)
    }
    function rogueDamageModifier() {
        return Math.floor(Math.random() * 5 + 9)
    }
    function sorcererDamageModifier() {
        return Math.floor(Math.random() * 10 + 5)
    }

    const enemyAttack = enemyDamageModifier()
    const paladinAttack = paladinDamageModifier()
    const rogueAttack = rogueDamageModifier()
    const sorcererAttack = sorcererDamageModifier()

    function palAttack() {
        const damage = (enemyHealth) - (paladinAttack)
        setEnemyHealth(damage)
    }
    function rogAttack() {
        const damage = (enemyHealth) - (rogueAttack)
        setEnemyHealth(damage)
    }
    function sorAttack() {
        const damage = (enemyHealth) - (sorcererAttack)
        setEnemyHealth(damage)
    }


    const navigate = useNavigate()


    return (
        <div id="battle-one-background" className='game-box'>

        </div>
    )
  
}

export default BattleOne