import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import harpyB from '../Images/harpybigv.png'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'

function BattleOne () {
    const [enemyHealth, setEnemyHealth] = useState(75)
    const [paladinHealth, setPaladinHealth] = useState(47)
    const [rogueHealth, setRogueHealth] = useState(41)
    const [sorcererHealth, setSorcererHealth] = useState(38)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
  

    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 11 + 2) + 2)
    }
    const enemyAttack = enemyDamageModifier()
    
    function enemyDiceRoll() {
        return (Math.floor(Math.random() * 20 + 1) + 9)
    }
    const enemyRoll = enemyDiceRoll()

    function enemyTarget () {
        let target = Math.floor(Math.random() * 10)
        if (target <= 2 || (paladinHealth <= 0 && sorcererHealth <= 0) ) {
            let damage = (rogueHealth) - (enemyAttack)
            if (enemyRoll >= 15) {
            setRogueHealth(damage)}
        } else if ((target >= 3 && target <= 5) || (rogueHealth <= 0 && paladinHealth <= 0)) {
            let damage = (sorcererHealth) - (enemyAttack)
            if (enemyRoll >= 14) {
            setSorcererHealth(damage)}
        } else if ((target >= 6 && target <= 9) || (rogueHealth <= 0 && sorcererHealth <= 0)) {
            let damage = (paladinHealth) - (enemyAttack)
            if (enemyRoll >= 19) {
            setPaladinHealth(damage)}
        }
    }
    const healthBar = ((enemyHealth / 75) * 100)

    const navigate = useNavigate()

    function continueClick () {
        navigate("/traverse3")
    }

    function renderEnemy() {
        if (enemyHealth > 0) {
            return harpyB
        } else {
            return null
        }

    }
    // Rogue Turn
    if (rogTurn === 0 && rogueHealth > 0) {
        setRogTurn(1)
    } else if (rogueHealth <= 0 && sorTurn === 0) {
        setRogTurn(2)
        setSorTurn(1)
    }
    // Sorcerer Turn
    else if (sorTurn === 1 && sorcererHealth > 0) {
        setSorTurn(2)
    } else if (sorcererHealth <= 0 && palTurn === 0 && sorTurn === 1) {
        setSorTurn(3)
        setPalTurn(1)
    }
    // Paladin Turn
    else if (palTurn === 1 && paladinHealth > 0) {
        setPalTurn(2)
    } else if (paladinHealth <= 0 && palTurn === 1) {
        setPalTurn(3)
    }
    // Enemy Turn
    else if (palTurn === 3 & enemyHealth > 0) {
        enemyTarget()
        setRogTurn(0)
        setSorTurn(0)
        setPalTurn(0)
    }
    


    


    return (
        <div id="battle-one-background" className='game-box'>
            {enemyHealth > 0
            ? <div> <ProgressBar id='enemy-hp' now={healthBar} />
            <img src={renderEnemy()} alt='harpyB' id='harpyB' />
        </div> 
            : <div className='victory'>
                Victory!
                <button className='continue' onClick={continueClick}> Continue </button>
            </div>}
            <div className='party-box'>
                <RogueUI setSorTurn={setSorTurn} rogTurn={rogTurn} setRogTurn={setRogTurn} rogueHealth={rogueHealth} setRogueHealth={setRogueHealth} enemyHealth={enemyHealth} setEnemyHealth={setEnemyHealth}/>
                <SorcererUI setPalTurn={setPalTurn} sorTurn={sorTurn} setSorTurn={setSorTurn} sorcererHealth={sorcererHealth} setSorcererHealth={setSorcererHealth} enemyHealth={enemyHealth} setEnemyHealth={setEnemyHealth} />
                <PaladinUI palTurn={palTurn} setPalTurn={setPalTurn} paladinHealth={paladinHealth} setPaladinHealth={setPaladinHealth} enemyHealth={enemyHealth} setEnemyHealth={setEnemyHealth} />
            </div>
        </div>
    )
  
}

export default BattleOne