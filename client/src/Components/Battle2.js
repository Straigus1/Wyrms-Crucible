import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import harpy from '../Images/harpy-pic.png'
import harpyPoison from '../Images/harpy-pic-poison.png'
import roundContainer from '../Images/round-container.png'
import BattleLog from './BattleLog'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'
import battleTheme from '../Music/capstone-battle.mp3'
import ReactAudioPlayer from 'react-audio-player'
// import useDelayedState from 'use-delayed-state'

function Battle2 () {
    const [enemyHealth, setEnemyHealth] = useState(220)
    const [paladinHealth, setPaladinHealth] = useState(47)
    const [rogueHealth, setRogueHealth] = useState(41)
    const [sorcererHealth, setSorcererHealth] = useState(38)
    const [round, setRound] = useState(1)
    const [poisonStatus, setPoisonStatus] = useState(0)
    const [blessStatus, setBlessStatus] = useState(0)
    const [phantomCD, setPhantomCD] = useState(4)
    const [lightningCD, setLightningCD] = useState(5)
    const [smiteCD, setSmiteCD] = useState(3)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
    const [battleLog, setBattleLog] = useState([])

// Rolls 1d6(One sided die) with a +10 to the base damage.
    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 10)
    }
    const enemyAttack = enemyDamageModifier()

    const d20Roll = Math.floor(Math.random() * 20 + 1)
    
    function enemyd20Roll() {
        return (d20Roll) + 8
    }
    const enemyRoll = enemyd20Roll()

    function updateBattleLog(roll, info) {
        setBattleLog([...battleLog, roll, info])
    }
// Harpy unique action, Feather Rain. Uses random variance to decide if it is used.
// Rolls 1d4(One 4 sided die) with a +5 to the base damage.
    function featherRainDamage() {
        return (Math.floor(Math.random() * 4 + 1) + 5)
    }

    const featherAttack = featherRainDamage()

    // No longer attack dead heroes.
    // Needs major refactoring.
    function enemyTarget () {
        const critAttack = (enemyAttack + Math.floor(Math.random() * 6 + 1))
        const variant = Math.floor(Math.random() * 10 + 1)
        let damage = 0
        let target = Math.floor(Math.random() * 10)
        // Using "variant" variable to determine if Feather Rain is used.
        let damageFRog = (rogueHealth) - (featherAttack)
        let damageFSor = (sorcererHealth) - (featherAttack)
        let damageFPal = (paladinHealth) - (featherAttack)
        function alterDamageValueBasedOnDiceRoll(characterHealth) {
            if (d20Roll === 20) {
                damage = (characterHealth) - (critAttack)
            } else {
                damage = (characterHealth) - (enemyAttack)
            }
        }
        function updateLogWithDiceRollAndTarget(armorClass, name, setCharacterHealth, string) {
            if (enemyRoll >= armorClass) {
                if (d20Roll === 20) {
                    updateBattleLog(
                        `Harpy rolled a natural 🎲(20) against ${name}!`,
                        `Harpy critically struck ${name} for ${critAttack} damage!!!`)
                } else {
                    updateBattleLog(
                        `Harpy rolled 🎲(${d20Roll}) + 8 against ${name}.`,
                        `Harpy attacked ${name} for ${enemyAttack} damage!`)
                }  
                setCharacterHealth(damage)
                } else {
                updateBattleLog(
                    `Harpy rolled 🎲(${d20Roll}) + 8 against ${name}.`,
                    string)
                }
        }
        if (variant <= 4) { 
            updateBattleLog(
                'Harpy used Feather Rain!',
                `The Party was dealt ${featherAttack} damage!`)
            // Attacks all characters in the form of an AoE(Area of Effect)
            setRogueHealth(damageFRog)
            setSorcererHealth(damageFSor)
            setPaladinHealth(damageFPal)
        } else {  
        if ((target <= 2 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(rogueHealth)
            updateLogWithDiceRollAndTarget(15, 'Iris', setRogueHealth, 'Iris avoided the attack!')
        } else if ((target >= 3 && target <= 5 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(sorcererHealth)
            updateLogWithDiceRollAndTarget(14, 'Juhl', setSorcererHealth, 'Juhl resisted the assault!')
        } else if ((target >= 6 && target <= 9 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth <= 0) || (target <= 2 && rogueHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(paladinHealth)
            updateLogWithDiceRollAndTarget(19, 'Deus', setPaladinHealth, 'Deus blocked the strike!')
        }
        }   
        
        
    }
    const healthBar = ((enemyHealth / 220) * 100)

    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/transition-three")
    }

    function startOverClick (e) {
        e.preventDefault()
        navigate('/')
    }

    function renderEnemy() {
        if (enemyHealth > 0 && poisonStatus <= 0) {
            return harpy
        } else if (enemyHealth > 0 && poisonStatus > 0) {
            return harpyPoison
        } else {
            return null
        }

    }

    const enemyArmorClass = 12

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
            setBattleLog([...battleLog, `Harpy was dealt ${poisonDamage} damage from poison.`])
            setBattleLog([...battleLog, `The enemy is no longer poisoned.`])
            } else {
            setBattleLog([...battleLog, `Harpy was dealt ${poisonDamage} damage from poison.`])
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
                <h2 className='harpy-health-value'>{enemyHealth}/220 </h2>
                <ProgressBar variant="danger" id='harpy-hp' now={healthBar} />
                <img src={renderEnemy()} alt='harpy' id='harpy' />
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
        <div id="battle-two-background" className='game-box'>
            <ReactAudioPlayer
            src={battleTheme}
            className="music-control-battle"
            autoPlay
            controls
            loop
            volume={0.3}
            /> 
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

export default Battle2