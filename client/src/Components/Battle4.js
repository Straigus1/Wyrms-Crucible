import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import Behemoth from '../Images/behemoth-pic.png'
import BehemothPoison from '../Images/behemoth-pic-poison.png'
import roundContainer from '../Images/round-container.png'
import BattleLog from './BattleLog'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'
import battleTheme from '../Music/capstone-battle.mp3'

function Battle4 () {
    const [enemyHealth, setEnemyHealth] = useState(400)
    const [paladinHealth, setPaladinHealth] = useState(47)
    const [rogueHealth, setRogueHealth] = useState(41)
    const [sorcererHealth, setSorcererHealth] = useState(38)
    const [round, setRound] = useState(1)
    const [poisonStatus, setPoisonStatus] = useState(0)
    const [blessStatus, setBlessStatus] = useState(0)
    const [rogStunStatus, setRogStunStatus] = useState(false)
    const [sorStunStatus, setSorStunStatus] = useState(false)
    const [palStunStatus, setPalStunStatus] = useState(false)
    const [meteorAvailable, setMeteorAvailable] = useState(true)
    const [phantomCD, setPhantomCD] = useState(4)
    const [lightningCD, setLightningCD] = useState(5)
    const [smiteCD, setSmiteCD] = useState(3)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
    const [battleLog, setBattleLog] = useState([])

    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 14)
    }
    const enemyAttack = enemyDamageModifier()

    const diceRoll = Math.floor(Math.random() * 20 + 1)
    
    function enemyDiceRoll() {
        return (diceRoll) + 11
    }
    const enemyRoll = enemyDiceRoll()

    function updateBattleLog(roll, info) {
        setBattleLog([...battleLog, roll, info])
    }

    function upheavalDamage() {
        return (Math.floor(Math.random() * 6 + 1) + 18)
    }

    const upheavalAttack = upheavalDamage()
    // No longer attack dead heroes
    function enemyTarget () {
        const variant = Math.floor(Math.random() * 10 + 1)
        const stunChance = Math.floor(Math.random() * 10 + 1)
        let target = Math.floor(Math.random() * 10)
        if (enemyHealth < 120 && meteorAvailable === true) {
            updateBattleLog(
                "Behemoth cast Meteor!!",
                "The Party's HP was reduced to 1!!"
            )
            setMeteorAvailable(false)
            if (rogueHealth > 0) {
                setRogueHealth(1)
            }
            if (sorcererHealth > 0) {
                setSorcererHealth(1)
            }
            if (paladinHealth > 0) {
                setPaladinHealth(1)
            }
        } else {
        if (variant <= 4) {
            if ((target <= 2 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
                let damage = (rogueHealth) - (upheavalAttack)                
                if (enemyRoll >= 15) {
                    updateBattleLog(
                        `Behemoth used Upheaval, rolled 🎲(${diceRoll}) + 11 against Iris.`,
                        `Behemoth lifted Iris sky high for ${upheavalAttack} damage, may apply stun!`)
                    if (stunChance <= 6) {
                        setRogStunStatus(true)
                    }
                    setRogueHealth(damage)
                } else {
                    updateBattleLog(
                        `Behemoth used Upheaval, rolled 🎲(${diceRoll}) + 11 against Iris.`,
                        'Iris avoided the attack!')
                }
            } else if ((target >= 3 && target <= 5 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth <= 0)) {
                let damage = (sorcererHealth) - (upheavalAttack)
                if (enemyRoll >= 14) {
                    updateBattleLog(
                        `Behemoth used Upheaval, rolled 🎲(${diceRoll}) + 11 against Juhl.`,
                        `Behemoth lifted Juhl sky high for ${upheavalAttack} damage, may apply stun!`)
                        if (stunChance <= 6) {
                            setSorStunStatus(true)
                        }
                    setSorcererHealth(damage)
                } else {
                    updateBattleLog(
                        `Behemoth used Upheaval, rolled 🎲(${diceRoll}) + 11 against Juhl.`,
                        'Juhl resisted the assault!')
                }
            } else if ((target >= 6 && target <= 9 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth <= 0) || (target <= 2 && rogueHealth <= 0)) {
                let damage = (paladinHealth) - (upheavalAttack)
                if (enemyRoll >= 19) {
                    updateBattleLog(
                        `Behemoth used Upheaval, rolled 🎲(${diceRoll}) + 11 against Deus.`,
                        `Behemoth lifted Deus sky high for ${upheavalAttack} damage, may apply stun!`)
                        if (stunChance <= 6) {
                            setPalStunStatus(true)
                        }
                    setPaladinHealth(damage)
                } else {
                    updateBattleLog(
                        `Behemoth used Upheaval, rolled 🎲(${diceRoll}) + 11 against Deus.`,
                        'Deus blocked the strike!')
                }
            }
        } else {
        if ((target <= 2 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
            let damage = (rogueHealth) - (enemyAttack)                
            if (enemyRoll >= 15) {
                updateBattleLog(
                    `Behemoth rolled 🎲(${diceRoll}) + 11 against Iris.`,
                    `Behemoth attacked Iris for ${enemyAttack} damage!`)
                setRogueHealth(damage)
            } else {
                updateBattleLog(
                    `Behemoth rolled 🎲(${diceRoll}) + 11 against Iris.`,
                    'Iris avoided the attack!')
            }
        } else if ((target >= 3 && target <= 5 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth <= 0)) {
            let damage = (sorcererHealth) - (enemyAttack)
            if (enemyRoll >= 14) {
                updateBattleLog(
                    `Behemoth rolled 🎲(${diceRoll}) + 11 against Juhl.`,
                    `Behemoth attacked Juhl for ${enemyAttack} damage!`)
                setSorcererHealth(damage)
            } else {
                updateBattleLog(
                    `Behemoth rolled 🎲(${diceRoll}) + 11 against Juhl.`,
                    'Juhl resisted the assault!')
            }
        } else if ((target >= 6 && target <= 9 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth <= 0) || (target <= 2 && rogueHealth <= 0)) {
            let damage = (paladinHealth) - (enemyAttack)
            if (enemyRoll >= 19) {
                updateBattleLog(
                    `Behemoth rolled 🎲(${diceRoll}) + 11 against Deus.`,
                    `Behemoth attacked Deus for ${enemyAttack} damage!`)
                setPaladinHealth(damage)
            } else {
                updateBattleLog(
                    `Behemoth rolled 🎲(${diceRoll}) + 11 against Deus.`,
                    'Deus blocked the strike!')
            }
        }
    }
    }
    }
    const healthBar = ((enemyHealth / 400) * 100)

    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/transition-five")
    }

    function startOverClick (e) {
        e.preventDefault()
        navigate('/')
    }

    function renderEnemy() {
        if (enemyHealth > 0 && poisonStatus <= 0) {
            return Behemoth
        } else if (enemyHealth > 0 && poisonStatus > 0) {
            return BehemothPoison
        } else {
            return null
        }

    }

    const enemyArmorClass = 14

    function poisonDamageModifier() {
        return (Math.floor(Math.random() * 4 + 1) + 4)
    }

    const poisonDamage = poisonDamageModifier()

    const damagePoison = (enemyHealth) - (poisonDamage)

    if (poisonStatus < 0) {
        setPoisonStatus(0)
    }
    // Rogue Turn
    if (rogTurn === 0 && rogueHealth > 0 && rogStunStatus === false) {
        setRogTurn(1)
    } else if ((rogueHealth <= 0 || rogStunStatus === true) && rogTurn === 0) {
        setRogTurn(2)
        setSorTurn(3)
        setRogStunStatus(false)
    }
    // Sorcerer Turn
    else if (rogTurn === 2 && sorcererHealth > 0 && sorStunStatus === false) {
        setSorTurn(1)
        setRogTurn(3)
    } else if ((sorcererHealth <= 0 || sorStunStatus === true) && rogTurn === 2) {
        setSorTurn(2)
        setRogTurn(3)
        setPalTurn(3)
        setSorStunStatus(false)
     
    }
    // Paladin Turn
    else if (sorTurn === 2 && paladinHealth > 0 && palStunStatus === false) {
        setPalTurn(1)
        setSorTurn(3)
    } else if ((paladinHealth <= 0 || palStunStatus === true) && sorTurn === 2 ) {
        setPalTurn(2)
        setSorTurn(3)
        setPalStunStatus(false)
    }
    // Enemy Turn
    else if (palTurn === 2 && enemyHealth > 0) {
        enemyTarget()
        setPalTurn(4)
    } else if (palTurn === 4 && (rogueHealth > 0 || sorcererHealth > 0 || paladinHealth > 0)) {
        setRogTurn(0)
        setSorTurn(0)
        setPalTurn(0)
        if (phantomCD >= 0 && phantomCD < 4 ){
            setPhantomCD(phantomCD + 1)
        }
        if (lightningCD >= 0 && lightningCD < 5){
            setLightningCD(lightningCD + 1)
        }
        if (smiteCD >= 0 && smiteCD < 3){
            setSmiteCD(smiteCD + 1)
        }
        if (blessStatus > 0) {
            setBlessStatus(blessStatus - 1)
        }
        setRound(round + 1)
        if (poisonStatus > 0) {
            setEnemyHealth(damagePoison)
            setPoisonStatus(poisonStatus - 1)
            if (poisonStatus === 0) {
            setBattleLog([...battleLog, `Behemoth was dealt ${poisonDamage} damage from poison.`])
            setBattleLog([...battleLog, `The enemy is no longer poisoned.`])
            } else {
            setBattleLog([...battleLog, `Behemoth was dealt ${poisonDamage} damage from poison.`])
            }
        }
    }

    function playerLost () {
        if (rogueHealth <= 0 && sorcererHealth <= 0 && paladinHealth <= 0) {
            return <div className='lose'>
                You Lose
                <button className='continue' id='lose-button' onClick={startOverClick}> Game Over... </button>
            </div>
        }
    }

    

    function renderCurrentOutcome () {
        
        if (enemyHealth > 0) {
            return <div>
                <h2 className='behemoth-health-value'>{enemyHealth}/400 </h2>
                <ProgressBar variant="danger" id='behemoth-hp' now={healthBar} />
                <img src={renderEnemy()} alt='BehemothB' id='behemoth' />
            {playerLost()}
            </div>
            
            
        } else { 
            return <div className='victory'>
            Victory!
            <button className='continue' onClick={continueClick}> Continue </button>
        </div>
        }
    }
    
    return (
        <div id="battle-four-background" className='game-box'>
            <iframe
            src={battleTheme}
            allow="autoplay"
            style={{ display: "none" }}
            id="iframeAudio"
        ></iframe>
            <BattleLog battleLog={battleLog}/>
            <img 
            className='round-container'
            src={roundContainer}
            alt='round container'
            />
            <div className='round-tracker'>
                <h3>Round: {round} </h3>
            </div>
            {renderCurrentOutcome()}
            
            
            <div className='party-box'>
                <RogueUI 
                    rogStunStatus={rogStunStatus}
                    updateBattleLog={updateBattleLog}
                    rogTurn={rogTurn} 
                    setRogTurn={setRogTurn}
                    rogueHealth={rogueHealth}
                    enemyHealth={enemyHealth} 
                    setEnemyHealth={setEnemyHealth}
                    setPoisonStatus={setPoisonStatus}
                    blessStatus={blessStatus}
                    phantomCD={phantomCD}
                    setPhantomCD={setPhantomCD}
                    enemyArmorClass={enemyArmorClass}
                    setRogueHealth={setRogueHealth}
                    battleLog={battleLog}
                    setBattleLog={setBattleLog}
                />
                <SorcererUI
                    sorStunStatus={sorStunStatus}
                    updateBattleLog={updateBattleLog} 
                    sorTurn={sorTurn} 
                    setSorTurn={setSorTurn} 
                    sorcererHealth={sorcererHealth} 
                    enemyHealth={enemyHealth} 
                    setEnemyHealth={setEnemyHealth}
                    blessStatus={blessStatus}
                    lightningCD={lightningCD}
                    setLightningCD={setLightningCD}
                    enemyArmorClass={enemyArmorClass}
                    setSorcererHealth={setSorcererHealth}
                    battleLog={battleLog}
                    setBattleLog={setBattleLog}
                />
                <PaladinUI 
                    palStunStatus={palStunStatus}
                    updateBattleLog={updateBattleLog} 
                    palTurn={palTurn} 
                    setPalTurn={setPalTurn} 
                    paladinHealth={paladinHealth} 
                    enemyHealth={enemyHealth} 
                    setEnemyHealth={setEnemyHealth} 
                    blessStatus={blessStatus}
                    setBlessStatus={setBlessStatus}
                    battleLog={battleLog}
                    setBattleLog={setBattleLog}
                    smiteCD={smiteCD}
                    setSmiteCD={setSmiteCD}
                    enemyArmorClass={enemyArmorClass}
                    setPaladinHealth={setPaladinHealth}
                />
            </div>
        </div>
    )
  
}

export default Battle4