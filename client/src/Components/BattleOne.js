import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import harpyB from '../Images/harpybigv.png'
import BattleLog from './BattleLog'
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
    // initial state for battle log set to an empty array
    const [battleLog, setBattleLog] = useState([])

    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 11 + 2) + 2)
    }
    const enemyAttack = enemyDamageModifier()
    
    function enemyDiceRoll() {
        return (Math.floor(Math.random() * 20 + 1) + 9)
    }
    const enemyRoll = enemyDiceRoll()

    // updateBattleLog function
    // pass as a prop to each charachter UI 
    // accept a string and add it to battle state
    function updateBattleLog(roll, info) {
        setBattleLog([...battleLog, roll, info])
    }

    function enemyTarget () {
        let target = Math.floor(Math.random() * 10)
        if (target <= 2 || (paladinHealth <= 0 && sorcererHealth <= 0) ) {
            let damage = (rogueHealth) - (enemyAttack)
                // updateBattleLog(`Harpy rolled 🎲${enemyRoll} against the Rogue.`)
            if (enemyRoll >= 15) {
                updateBattleLog(
                    `Harpy rolled 🎲${enemyRoll} against the Rogue.`,
                    `Harpy attacked Rogue for ${enemyAttack} damage!`)
                setRogueHealth(damage)
            } else {
                updateBattleLog(
                    `Harpy rolled 🎲${enemyRoll} against the Rogue.`,
                    'Rogue avoided the attack!')
            }
        } else if ((target >= 3 && target <= 5) || (rogueHealth <= 0 && paladinHealth <= 0)) {
            let damage = (sorcererHealth) - (enemyAttack)
                // updateBattleLog(`Harpy rolled 🎲${enemyRoll} against the Sorcerer.`)
            if (enemyRoll >= 14) {
                updateBattleLog(
                    `Harpy rolled 🎲${enemyRoll} against the Sorcerer.`,
                    `Harpy attacked Sorcerer for ${enemyAttack} damage!`)
                setSorcererHealth(damage)
            } else {
                updateBattleLog(
                    `Harpy rolled 🎲${enemyRoll} against the Sorcerer.`,
                    'Sorcerer resisted the assault!')
            }
        } else if ((target >= 6 && target <= 9) || (rogueHealth <= 0 && sorcererHealth <= 0)) {
            let damage = (paladinHealth) - (enemyAttack)
                // updateBattleLog(`Harpy rolled 🎲${enemyRoll} against the Paladin.`)
            if (enemyRoll >= 19) {
                updateBattleLog(
                    `Harpy rolled 🎲${enemyRoll} against the Paladin.`,
                    `Harpy attacked Paladin for ${enemyAttack} damage!`)
                setPaladinHealth(damage)
            } else {
                updateBattleLog(
                    `Harpy rolled 🎲${enemyRoll} against the Paladin.`,
                    'Paladin blocked the strike!')
            }
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
        // setSorTurn(1)
    }
    // Sorcerer Turn
    else if (rogTurn === 2 && sorcererHealth > 0) {
        setSorTurn(1)
        setRogTurn(3)
    } else if (sorcererHealth <= 0 && palTurn === 0) {
        setSorTurn(2)
        setRogTurn(3)
        // setPalTurn(1)
    }
    // Paladin Turn
    else if (sorTurn === 2 && paladinHealth > 0) {
        setPalTurn(1)
        setSorTurn(3)
    } else if (paladinHealth <= 0 && palTurn === 0) {
        setPalTurn(2)
    }
    // Enemy Turn
    else if (palTurn === 2 & enemyHealth > 0) {
        enemyTarget()
        setRogTurn(0)
        setSorTurn(0)
        setPalTurn(0)
    }
    
    return (
        <div id="battle-one-background" className='game-box'>
            {/* Pass battlelog the array from state */}
            <BattleLog battleLog={battleLog}/>
            {enemyHealth > 0
            ? <div> <ProgressBar variant="danger" id='enemy-hp' now={healthBar} />
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