import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import harpyB from '../Images/harpybigv.png'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'

function BattleOne () {
    const [enemyHealth, setEnemyHealth] = useState(500)
    const [paladinHealth, setPaladinHealth] = useState(47)
    const [rogueHealth, setRogueHealth] = useState(41)
    const [sorcererHealth, setSorcererHealth] = useState(38)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
    const [victory, setVictory] = useState(false)

    function enemyDamageModifier() {
        return Math.floor(Math.random() * 13 + 2)
    }

    const enemyAttack = enemyDamageModifier()

    function enemyTarget () {
        let target = Math.floor(Math.random() * 10)
        if (target <= 2) {
            let damage = (rogueHealth) - (enemyAttack)
            setRogueHealth(damage)
        } else if (target >= 3 && target <= 5) {
            let damage = (sorcererHealth) - (enemyAttack)
            setSorcererHealth(damage)
        } else if (target >= 6 && target <= 9) {
            let damage = (paladinHealth) - (enemyAttack)
            setPaladinHealth(damage)
        }
    }
    
    // Turn Order
    if (enemyHealth <= 0) {
        setVictory(true)
    } 
    // Rogue Turn
    else if (rogTurn === 0 && rogueHealth > 0) {
        setRogTurn(1)
    } else if (rogueHealth <= 0 && sorTurn !== 1 && sorTurn === 0) {
        setSorTurn(1)
    }
    //Sorcerer Turn
    else if (sorTurn === 1 && sorcererHealth > 0) {
        setSorTurn(2)
    } else if (sorcererHealth <= 0 && palTurn !== 1 && palTurn === 0) {
        setPalTurn(1)
    }
    // Paladin
    else if (palTurn === 1 && paladinHealth > 0) {
        setPalTurn(2)
    } else if (paladinHealth <= 0 && palTurn !== 3 && palTurn === 0) {
        setPalTurn(3)
    }
    //Enemy Turn
    else if (palTurn === 3) {
        enemyTarget()
        setRogTurn(0)
        setSorTurn(0)
        setPalTurn(0)
    }
    const healthBar = ((enemyHealth / 500) * 100)

    const navigate = useNavigate()


    


    return (
        <div id="battle-one-background" className='game-box'>
            <ProgressBar id='enemy-hp' now={healthBar} />
            <img src={harpyB} alt='harpyB' id='harpyB' />
            <div className='party-box'>
                <RogueUI setSorTurn={setSorTurn} rogTurn={rogTurn} setRogTurn={setRogTurn} rogueHealth={rogueHealth} setRogueHealth={setRogueHealth} enemyHealth={enemyHealth} setEnemyHealth={setEnemyHealth}/>
                <SorcererUI setPalTurn={setPalTurn} sorTurn={sorTurn} setSorTurn={setSorTurn} sorcererHealth={sorcererHealth} setSorcererHealth={setSorcererHealth} enemyHealth={enemyHealth} setEnemyHealth={setEnemyHealth} />
                <PaladinUI palTurn={palTurn} setPalTurn={setPalTurn} paladinHealth={paladinHealth} setPaladinHealth={setPaladinHealth} enemyHealth={enemyHealth} setEnemyHealth={setEnemyHealth} />
            </div>
        </div>
    )
  
}

export default BattleOne