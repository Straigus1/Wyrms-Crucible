import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import harpyB from '../Images/harpybigv.png'
import BattleLog from './BattleLog'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'

function BattleOne () {
    const [enemyHealth, setEnemyHealth] = useState(275)
    const [paladinHealth, setPaladinHealth] = useState(47)
    const [rogueHealth, setRogueHealth] = useState(41)
    const [sorcererHealth, setSorcererHealth] = useState(38)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
    const [battleLog, setBattleLog] = useState([])

    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 11 + 2) + 30)
    }
    const enemyAttack = enemyDamageModifier()

    const diceRoll = Math.floor(Math.random() * 20 + 1)
    
    function enemyDiceRoll() {
        return (diceRoll) + 10
    }
    const enemyRoll = enemyDiceRoll()

    // updateBattleLog function
    // pass as a prop to each charachter UI 
    // accept a string and add it to battle state
    function updateBattleLog(roll, info) {
        setBattleLog([...battleLog, roll, info])
    }
    // No longer attack dead heroes
    function enemyTarget () {
        let target = Math.floor(Math.random() * 10)
        if ((target <= 2 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
            let damage = (rogueHealth) - (enemyAttack)                
            if (enemyRoll >= 15) {
                updateBattleLog(
                    `Harpy rolled 🎲(${diceRoll}) + 10 against the Rogue.`,
                    `Harpy attacked Rogue for ${enemyAttack} damage!`)
                setRogueHealth(damage)
            } else {
                updateBattleLog(
                    `Harpy rolled 🎲(${diceRoll}) + 10 against the Rogue.`,
                    'Rogue avoided the attack!')
            }
        } else if ((target >= 3 && target <= 5 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth === 0)) {
            let damage = (sorcererHealth) - (enemyAttack)
            if (enemyRoll >= 14) {
                updateBattleLog(
                    `Harpy rolled 🎲(${diceRoll}) + 10 against the Sorcerer.`,
                    `Harpy attacked Sorcerer for ${enemyAttack} damage!`)
                setSorcererHealth(damage)
            } else {
                updateBattleLog(
                    `Harpy rolled 🎲(${diceRoll}) + 10 against the Sorcerer.`,
                    'Sorcerer resisted the assault!')
            }
        } else if ((target >= 6 && target <= 9 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth === 0) || (target <= 2 && rogueHealth === 0)) {
            let damage = (paladinHealth) - (enemyAttack)
            if (enemyRoll >= 19) {
                updateBattleLog(
                    `Harpy rolled 🎲(${diceRoll}) + 10 against the Paladin.`,
                    `Harpy attacked Paladin for ${enemyAttack} damage!`)
                setPaladinHealth(damage)
            } else {
                updateBattleLog(
                    `Harpy rolled 🎲(${diceRoll}) + 10 against the Paladin.`,
                    'Paladin blocked the strike!')
            }
        }
    }
    const healthBar = ((enemyHealth / 275) * 100)

    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
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
    } else if (rogueHealth <= 0 && rogTurn === 0) {
        setRogTurn(2)
        setSorTurn(3)
       
    }
    // Sorcerer Turn
    else if (rogTurn === 2 && sorcererHealth > 0) {
        setSorTurn(1)
        setRogTurn(3)
    } else if (sorcererHealth <= 0 && rogTurn === 2) {
        setSorTurn(2)
        setRogTurn(3)
        setPalTurn(3)
     
    }
    // Paladin Turn
    else if (sorTurn === 2 && paladinHealth > 0) {
        setPalTurn(1)
        setSorTurn(3)
    } else if (paladinHealth <= 0 && sorTurn === 2) {
        setPalTurn(2)
        setSorTurn(3)
    }
    // Enemy Turn
    else if (palTurn === 2 && enemyHealth > 0) {
        enemyTarget()
        setPalTurn(4)
    } else if (palTurn === 4 && (rogueHealth > 0 || sorcererHealth > 0 || paladinHealth > 0)) {
        setRogTurn(0)
        setSorTurn(0)
        setPalTurn(0)
    }
    
    return (
        <div id="battle-one-background" className='game-box'>
            
            <BattleLog battleLog={battleLog}/>
            {enemyHealth > 0
            ?<div> <ProgressBar variant="danger" id='enemy-hp' now={healthBar} />
                <img src={renderEnemy()} alt='harpyB' id='harpyB' />
            </div> 
            : <div className='victory'>
                Victory!
                <button className='continue' onClick={continueClick}> Continue </button>
            </div>}
            
            <div className='party-box'>
                <RogueUI 
                    updateBattleLog={updateBattleLog}
                    rogTurn={rogTurn} 
                    setRogTurn={setRogTurn}
                    rogueHealth={rogueHealth}
                    enemyHealth={enemyHealth} 
                    setEnemyHealth={setEnemyHealth}
                />
                <SorcererUI
                    updateBattleLog={updateBattleLog} 
                    sorTurn={sorTurn} 
                    setSorTurn={setSorTurn} 
                    sorcererHealth={sorcererHealth} 
                    enemyHealth={enemyHealth} 
                    setEnemyHealth={setEnemyHealth}
                />
                <PaladinUI 
                    updateBattleLog={updateBattleLog} 
                    palTurn={palTurn} 
                    setPalTurn={setPalTurn} 
                    paladinHealth={paladinHealth} 
                    enemyHealth={enemyHealth} 
                    setEnemyHealth={setEnemyHealth} 
                />
            </div>
        </div>
    )
  
}

export default BattleOne