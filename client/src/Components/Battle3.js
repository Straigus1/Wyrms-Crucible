import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import werewolf from '../Images/werewolf-pic.png'
import werewolfPoison from '../Images/werewolf-pic-poison.png'
import roundContainer from '../Images/round-container.png'
import BattleLog from './BattleLog'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'
import battleTheme from '../Music/capstone-battle.mp3'
import ReactAudioPlayer from 'react-audio-player'
// import useDelayedState from 'use-delayed-state'

function Battle3 () {
    const [enemyHealth, setEnemyHealth] = useState(300)
    const [floatingDamage, setFloatingDamage] = useState(0)
    const [paladinHealth, setPaladinHealth] = useState(47)
    const [rogueHealth, setRogueHealth] = useState(41)
    const [sorcererHealth, setSorcererHealth] = useState(38)
    const [palPopup, setPalPopup] = useState(0)
    const [rogPopup, setRogPopup] = useState(0)
    const [sorPopup, setSorPopup] = useState(0)
    const [round, setRound] = useState(1)
    const [poisonStatus, setPoisonStatus] = useState(0)
    const [blessStatus, setBlessStatus] = useState(0)
    const [rogStunStatus, setRogStunStatus] = useState(false)
    const [sorStunStatus, setSorStunStatus] = useState(false)
    const [palStunStatus, setPalStunStatus] = useState(false)
    const [phantomCD, setPhantomCD] = useState(4)
    const [lightningCD, setLightningCD] = useState(5)
    const [smiteCD, setSmiteCD] = useState(3)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
    const [battleLog, setBattleLog] = useState([])

    useEffect(() => {
        let popup = document.createElement("h3");
        let element = document.getElementById('popup-box')
        
        if (floatingDamage > 0) {
            
            if (floatingDamage >= 25) {
                popup.className = "high-damage-value"
                popup.textContent = `${floatingDamage}!`
            } else {
                popup.className = "damage-value"
                popup.textContent = `${floatingDamage}`
            }
        }
        if (floatingDamage === 'Miss') {
            popup.className = "missed-attack"
            popup.textContent = `${floatingDamage}`
        }
        element.appendChild(popup)
        setTimeout(() => {
            popup.remove()
        }, 1900)
        
    }, [floatingDamage])

// Rolls 2d6(Two 6 sided dice) with a +11 to the base damage
    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 11 + 1) + 12)
    }
    const enemyAttack = enemyDamageModifier()

    const d20Roll = Math.floor(Math.random() * 20 + 1)
    
    function enemyd20Roll() {
        return (d20Roll) + 10
    }
    const enemyRoll = enemyd20Roll()

    function updateBattleLog(roll, info) {
        setBattleLog([...battleLog, roll, info])
    }
//Werewolf unique action, Electrical Surge.
//Rolls 2d6(Two 6 sided dice) with a +8 to the base damage.
    function electricalSurgeDamage () {
        return (Math.floor(Math.random() * 11 + 1) + 9)
    }

    const electricAttack = electricalSurgeDamage()

    // No longer attack dead heroes.
    // Needs major, major refactoring.
    function enemyTarget () {
        const baseCritAttack = (enemyAttack + (Math.floor(Math.random() * 11 + 1) + 1))
        const surgeCritAttack = (electricAttack + (Math.floor(Math.random() * 11 + 1) + 1))
        const variant = Math.floor(Math.random() * 10 + 1)
        let damage = 0
        let target = Math.floor(Math.random() * 10 + 1)
        function alterDamageValueBasedOnDiceRoll(characterHealth, normalAttack, critAttack) {
            if (d20Roll === 20) {
                damage = (characterHealth) - (critAttack)
            } else {
                damage = (characterHealth) - (normalAttack)
            }
        }
        function updateLogWithDiceRollAndTarget(armorClass, name, setCharacterHealth, string, setCharacterPopup) {
            if (enemyRoll >= armorClass) {
                if (d20Roll === 20) {
                    updateBattleLog(
                        `Werewolf rolled a natural 🎲(20) against ${name}!`,
                        `Werewolf critically struck ${name} for ${baseCritAttack} damage!!!`)
                    setCharacterPopup(baseCritAttack)
                } else {
                    updateBattleLog(
                        `Werewolf rolled 🎲(${d20Roll}) + 10 against ${name}.`,
                        `Werewolf attacked ${name} for ${enemyAttack} damage!`)
                    setCharacterPopup(enemyAttack)
                }  
                setCharacterHealth(damage)
                } else {
                updateBattleLog(
                    `Werewolf rolled 🎲(${d20Roll}) + 10 against ${name}.`,
                    string)
                setCharacterPopup('Miss')
                }
        }
        function updateLogWithElectricSurgeInfo(armorClass, name, setCharacterHealth, setCharacterStunStatus, string, setCharacterPopup) {
            if (enemyRoll >= armorClass) {
                if (d20Roll === 20) {
                    updateBattleLog(
                        `Werewolf cast Electric Surge, rolled a natural 🎲(20) against ${name}!`,
                        `Werewolf electrocuted ${name} for ${surgeCritAttack} critical damage and applied stun!!!`)
                    setCharacterPopup(surgeCritAttack)
                } else {
                    updateBattleLog(
                        `Werewolf cast Electric Surge, rolled 🎲(${d20Roll}) + 10 against ${name}.`,
                        `Werewolf electrified ${name} for ${electricAttack} damage and applied stun!`)
                    setCharacterPopup(electricAttack)
                } 
                setCharacterStunStatus(true) 
                setCharacterHealth(damage)
                } else {
                updateBattleLog(
                    `Werewolf cast Electric Surge, rolled 🎲(${d20Roll}) + 10 against ${name}.`,
                    string)
                setCharacterPopup('Miss')
                }
        }
        // Electric Surge applies stun when it is successful, forcing the target to lose its next turn.
        if (variant <= 6) {
            if ((target <= 3 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
                alterDamageValueBasedOnDiceRoll(rogueHealth, electricAttack, surgeCritAttack)
                updateLogWithElectricSurgeInfo(15, 'Iris', setRogueHealth, setRogStunStatus, 'Iris avoided the attack!', setRogPopup)
            } else if ((target >= 4 && target <= 6 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth <= 0)) {
                alterDamageValueBasedOnDiceRoll(sorcererHealth, electricAttack, surgeCritAttack)
                updateLogWithElectricSurgeInfo(14, 'Juhl', setSorcererHealth, setSorStunStatus, 'Juhl resisted the assault!', setSorPopup)
            } else if ((target >= 7 && target <= 10 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth <= 0) || (target <= 2 && rogueHealth <= 0)) {
                alterDamageValueBasedOnDiceRoll(paladinHealth, electricAttack, surgeCritAttack)
                updateLogWithElectricSurgeInfo(19, 'Deus', setPaladinHealth, setPalStunStatus, 'Deus blocked the strike', setPalPopup)
            }
        } else {
        if ((target <= 3 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(rogueHealth, enemyAttack, baseCritAttack)               
            updateLogWithDiceRollAndTarget(15, 'Iris', setRogueHealth, 'Iris avoided the attack!', setRogPopup)
        } else if ((target >= 4 && target <= 6 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(sorcererHealth, enemyAttack, baseCritAttack)
            updateLogWithDiceRollAndTarget(14, 'Juhl', setSorcererHealth, 'Juhl resisted the assault!', setSorPopup)
        } else if ((target >= 7 && target <= 10 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth <= 0) || (target <= 2 && rogueHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(paladinHealth, enemyAttack, baseCritAttack)
            updateLogWithDiceRollAndTarget(19, 'Deus', setPaladinHealth, 'Deus blocked the strike!', setPalPopup)
        }
        
    }
    }
    const healthBar = ((enemyHealth / 300) * 100)

    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/transition-four")
    }

    function startOverClick (e) {
        e.preventDefault()
        navigate('/')
    }

    function renderEnemy() {
        if (enemyHealth > 0 && poisonStatus <= 0) {
            return werewolf
        } else if (enemyHealth > 0 && poisonStatus > 0) {
            return werewolfPoison
        } else {
            return null
        }

    }

    const enemyArmorClass = 13

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
            setBattleLog([...battleLog, `Werewolf was dealt ${poisonDamage} damage from poison.`])
            setBattleLog([...battleLog, `The enemy is no longer poisoned.`])
            } else {
            setBattleLog([...battleLog, `Werewolf was dealt ${poisonDamage} damage from poison.`])
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
                <h2 className='werewolf-health-value'>{enemyHealth}/300 </h2>
                <ProgressBar variant="danger" id='werewolf-hp' now={healthBar} />
                <img src={renderEnemy()} alt='werewolf' id='werewolf' />
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
        <div id="battle-three-background" className='game-box'>
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
            
            <div id='popup-box'></div>
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
                    setFloatingDamage={setFloatingDamage}
                    rogPopup={rogPopup}
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
                    setFloatingDamage={setFloatingDamage}
                    sorPopup={sorPopup}
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
                    setFloatingDamage={setFloatingDamage}
                    palPopup={palPopup}
                />
            </div>
        </div>
    )
  
}

export default Battle3