import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import dragon from '../Images/dragon-pic.png'
import dragonPoison from '../Images/dragon-pic-poison.png'
import roundContainer from '../Images/round-container.png'
import BattleLog from './BattleLog'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'
import battleTheme from '../Music/capstone-battle.mp3'
import ReactAudioPlayer from 'react-audio-player'
import breathSound from '../Music/dragon-breath.mp3'
// import useDelayedState from 'use-delayed-state'

function Battle5 () {
    const [enemyHealth, setEnemyHealth] = useState(430)
    const [paladinHealth, setPaladinHealth] = useState(47)
    const [rogueHealth, setRogueHealth] = useState(41)
    const [sorcererHealth, setSorcererHealth] = useState(38)
    const [round, setRound] = useState(1)
    const [breathReady, setBreathReady] = useState(true)
    const [poisonStatus, setPoisonStatus] = useState(0)
    const [blessStatus, setBlessStatus] = useState(0)
    const [phantomCD, setPhantomCD] = useState(4)
    const [lightningCD, setLightningCD] = useState(5)
    const [smiteCD, setSmiteCD] = useState(3)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
    const [battleLog, setBattleLog] = useState([])

    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 8 + 1) + 3)
    }
    const enemyAttack = enemyDamageModifier()

    const diceRoll = Math.floor(Math.random() * 20 + 1)
    
    function enemyDiceRoll() {
        return (diceRoll) + 12
    }
    const enemyRoll = enemyDiceRoll()

    function updateBattleLog(roll, info) {
        setBattleLog([...battleLog, roll, info])
    }

    function dragonBreathDamage() {
        return (Math.floor(Math.random() * 4 + 1) + 12)
    }

    const breathAttack = dragonBreathDamage()

    const breathRecharge = Math.floor(Math.random() * 7 + 1)

    function breathAudio() {
        const audio = new Audio(breathSound);
       audio.volume = 0.2
       audio.play()
    }
    // No longer attack dead heroes
    function enemyTarget () {
        let target = Math.floor(Math.random() * 10)
        let damageFRog = (rogueHealth) - (breathAttack)
        let damageFSor = (sorcererHealth) - (breathAttack)
        let damageFPal = (paladinHealth) - (breathAttack)
        if (breathReady) {
            updateBattleLog(
                'Dragon used Dragon Breath!',
                `The Party was dealt ${breathAttack} damage!`)
            setBreathReady(false)
            setRogueHealth(damageFRog)
            setSorcererHealth(damageFSor)
            setPaladinHealth(damageFPal)
            breathAudio()
        } else {
        if ((target <= 2 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
            let damage = (rogueHealth) - (enemyAttack)                
            if (enemyRoll >= 15) {
                updateBattleLog(
                    `Dragon rolled 🎲(${diceRoll}) + 12 against Iris.`,
                    `Dragon attacked Iris for ${enemyAttack} damage!`)
                setRogueHealth(damage)
            } else {
                updateBattleLog(
                    `Dragon rolled 🎲(${diceRoll}) + 12 against Iris.`,
                    'Iris avoided the attack!')
            }
        } else if ((target >= 3 && target <= 5 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth <= 0)) {
            let damage = (sorcererHealth) - (enemyAttack)
            if (enemyRoll >= 14) {
                updateBattleLog(
                    `Dragon rolled 🎲(${diceRoll}) + 12 against Juhl.`,
                    `Dragon attacked Juhl for ${enemyAttack} damage!`)
                setSorcererHealth(damage)
            } else {
                updateBattleLog(
                    `Dragon rolled 🎲(${diceRoll}) + 12 against Juhl.`,
                    'Juhl resisted the assault!')
            }
        } else if ((target >= 6 && target <= 9 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth <= 0) || (target <= 2 && rogueHealth <= 0)) {
            let damage = (paladinHealth) - (enemyAttack)
            if (enemyRoll >= 19) {
                updateBattleLog(
                    `Dragon rolled 🎲(${diceRoll}) + 12 against Deus.`,
                    `Dragon attacked Deus for ${enemyAttack} damage!`)
                setPaladinHealth(damage)
            } else {
                updateBattleLog(
                    `Dragon rolled 🎲(${diceRoll}) + 12 against Deus.`,
                    'Deus blocked the strike!')
            }
        }
        
    }
    }
    const healthBar = ((enemyHealth / 430) * 100)

    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/credits")
    }

    function startOverClick (e) {
        e.preventDefault()
        navigate('/')
    }

    function renderEnemy() {
        if (enemyHealth > 0 && poisonStatus <= 0) {
            return dragon
        } else if (enemyHealth > 0 && poisonStatus > 0) {
            return dragonPoison
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
    // Trying to add delay after paladin's turn, failing miserably.
    // Whenever delayed is added, boss attacks twice. 

    // function enemyReadiesAttack() {
    //     setTimeout(enemyTarget, 1000);
    // }

    // function stopEnemyAttack() {
    //     clearTimeout(enemyTarget)
    // }

    // function changePalTurn () {
    //     setTimeout(() => {setPalTurn(3)}, 1000)
    // }
    
    

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
        if (breathReady === false && breathRecharge >= 6 ) {
            setBreathReady(true)
        }
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
            setBattleLog([...battleLog, `Dragon was dealt ${poisonDamage} damage from poison.`])
            setBattleLog([...battleLog, `The enemy is no longer poisoned.`])
            } else {
            setBattleLog([...battleLog, `Dragon was dealt ${poisonDamage} damage from poison.`])
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
                <h2 className='dragon-health-value'>{enemyHealth}/430 </h2>
                <ProgressBar variant="danger" id='dragon-hp' now={healthBar} />
                <img src={renderEnemy()} alt='dragon' id='dragon' />
            {playerLost()}
            </div>
            
            
        } else { 
            return <div className='victory'>
            Victory!
            <button className='continue' onClick={continueClick}> The End </button>
        </div>
        }
    }
    
    return (
        <div id="battle-five-background" className='game-box'>
            <ReactAudioPlayer
            src={battleTheme}
            className="music-control-battle"
            autoPlay
            controls
            loop
            volume={0.25}
            /> 
            <BattleLog battleLog={battleLog}/>
            {renderCurrentOutcome()}
            <img 
            className='round-container'
            src={roundContainer}
            alt='round container'
            />
            <div className='round-tracker'>
                <h3>Round: {round} </h3>
            </div>
            
            
            <div className='party-box'>
                <RogueUI 
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

export default Battle5