import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import lizard from '../Images/lizard-pic.png'
import lizardPoison from '../Images/lizard-pic-poison.png'
import roundContainer from '../Images/round-container.png'
import BattleLog from './BattleLog'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'
import battleTheme from '../Music/capstone-battle.mp3'
import ReactAudioPlayer from 'react-audio-player'
// import useDelayedState from 'use-delayed-state'

function Battle1 () {
    const [enemyHealth, setEnemyHealth] = useState(175)
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
    const [phantomCD, setPhantomCD] = useState(4)
    const [lightningCD, setLightningCD] = useState(5)
    const [smiteCD, setSmiteCD] = useState(3)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
    const [battleLog, setBattleLog] = useState([])

// Controls damage popups when party characters attack an enemy.
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
        setFloatingDamage(0)
        
    }, [floatingDamage, setFloatingDamage])

   
// Damage Modification
// Rolls 1d6(One 6 sided die) with a +9 to the base damage.
    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 9)
    }
// Made enemyAttack variable to keep value consistent for logging.
    const enemyAttack = enemyDamageModifier()

// Setting up enemy accuracy. Uses a d20(20 sided die) to determine if attack is successful.
    const d20Roll = Math.floor(Math.random() * 20 + 1)
    
// Adding a base to hit chance.
    function enemyd20Roll() {
        return (d20Roll) + 7
    }
    const enemyRoll = enemyd20Roll()

// Update Battle Log with total roll value and outcome of the attack.
    function updateBattleLog(roll, info) {
        setBattleLog([...battleLog, roll, info])
    }
    

// Algorithm to determine which party member an enemy attacks. "target" variable value chooses who will get attacked. Paladin innately has a higher chance of being the target.
// Needs major refactoring.
    function enemyTarget () {
        const critAttack = (enemyAttack + Math.floor(Math.random() * 6 + 1))
        let damage = 0
        let target = Math.floor(Math.random() * 10 + 1)
        // Critcal Attacks occur when a d20 roll equals 20 and doubles the amount of dice rolled.
        function alterDamageValueBasedOnDiceRoll(characterHealth) {
            if (d20Roll === 20) {
                damage = (characterHealth) - (critAttack)
            } else {
                damage = (characterHealth) - (enemyAttack)
            }
        }
        // Enemy enemyRoll must meet or exceed their target's Armor Class.     
        function updateLogWithDiceRollAndTarget(armorClass, name, setCharacterHealth, string, setCharacterPopup) {
            if (enemyRoll >= armorClass) {
                if (d20Roll === 20) {
                    updateBattleLog(
                        `Lizard rolled a natural 🎲(20) against ${name}!`,
                        `Lizard attacked ${name} for ${critAttack} damage!!!`)
                    setCharacterPopup(critAttack)
                } else {
                    updateBattleLog(
                        `Lizard rolled 🎲(${d20Roll}) + 7 against ${name}.`,
                        `Lizard attacked ${name} for ${enemyAttack} damage!`)
                    setCharacterPopup(enemyAttack)
                }  
                setCharacterHealth(damage)
                } else {
                updateBattleLog(
                    `Lizard rolled 🎲(${d20Roll}) + 7 against ${name}.`,
                    string)
                setCharacterPopup('Miss')
                }
        }
        // Additional conditionals are to prevent the enemy from targeting dead party members.
        if ((target <= 3 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(rogueHealth)  
            updateLogWithDiceRollAndTarget(15, 'Iris', setRogueHealth, 'Iris avoided the attack!', setRogPopup)             
        } else if ((target >= 4 && target <= 6 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(sorcererHealth)
            updateLogWithDiceRollAndTarget(14, 'Juhl', setSorcererHealth, 'Juhl resisted the assault!', setSorPopup)
        } else if ((target >= 7 && target <= 10 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth <= 0) || (target <= 2 && rogueHealth <= 0)) {
            alterDamageValueBasedOnDiceRoll(paladinHealth)
            updateLogWithDiceRollAndTarget(19, 'Deus', setPaladinHealth, 'Deus blocked the strike!', setPalPopup)
        }
        
        
    }
// Makes the progress bar display a pecentage of the enemy's current health value.
    const healthBar = ((enemyHealth / 175) * 100)

// Setting up navigation for "Continue"/"Game Over..." button after victory/loss.
    const navigate = useNavigate()

    function continueClick (e) {
        e.preventDefault()
        navigate("/transition-two")
    }

    function startOverClick (e) {
        e.preventDefault()
        navigate('/')
    }

// Displays if the enemy is poisoned by adding a green hue to icon. 
    function renderEnemy() {
        if (enemyHealth > 0 && poisonStatus <= 0) {
            return lizard
        } else if (enemyHealth > 0 && poisonStatus > 0) {
            return lizardPoison
        } else {
            return null
        }

    }

// To be passed down to character UIs for determining if their attacks are successful.
    const enemyArmorClass = 11

// Poison damage taken at the end of the turn if the Rogue applies it.
// Rolls 1d4(One 4 sided die) with a +4 to the base damage.
    function poisonDamageModifier() {
        return (Math.floor(Math.random() * 4 + 1) + 4)
    }

    const poisonDamage = poisonDamageModifier()

    const damagePoison = (enemyHealth) - (poisonDamage)

    if (poisonStatus < 0) {
        setPoisonStatus(0)
    }
    // Trying to add delay after paladin's turn, failing miserably.
    // Whenever delay is added, boss attacks twice. 

    // function enemyReadiesAttack() {
    //     setTimeout(enemyTarget, 1000);
    // }

    // function stopEnemyAttack() {
    //     clearTimeout(enemyTarget)
    // }

    // function changePalTurn () {
    //     setTimeout(() => {setPalTurn(3)}, 1000)
    // }
    
    
// Turn system using state integers to segue between turns
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
        // At the end of the Round, increase the Signature Action state value to emulate a cooldown.
        if (phantomCD >= 0 && phantomCD < 4 ){
            setPhantomCD(phantomCD + 1)
        }
        if (lightningCD >= 0 && lightningCD < 5){
            setLightningCD(lightningCD + 1)
        }
        if (smiteCD >= 0 && smiteCD < 3){
            setSmiteCD(smiteCD + 1)
        }
        // Slowly decrements blessStatus to emulate it having a 5 round duration.
        if (blessStatus > 0) {
            setBlessStatus(blessStatus - 1)
        }
        // Updating Round counter to display how many rounds have occurred.
        setRound(round + 1)
        // Reducing poisonStatus state to emulate the duration lasting 3 rounds.
        if (poisonStatus > 0) {
            setEnemyHealth(damagePoison)
            setPoisonStatus(poisonStatus - 1)
            if (poisonStatus === 1) {
            setBattleLog([...battleLog, `Lizard was dealt ${poisonDamage} damage from poison. \n Lizard is no longer poisoned.`])
            } else {
            setBattleLog([...battleLog, `Lizard was dealt ${poisonDamage} damage from poison.`])
            }
        }
    }

// If all allies are dead, display "You Lose" and a button to return to the title screen.
    function playerLost () {
        if (rogueHealth <= 0 && sorcererHealth <= 0 && paladinHealth <= 0) {
            return <div className='lose'>
                You Lose
                <button className='continue' id='lose-button' onClick={startOverClick}> Game Over... </button>
            </div>
        }
    }

    
// Displays enemy icon and hp. Conditionally renders winning or losing.
    function renderCurrentOutcome () {
        
        if (enemyHealth > 0) {
            return <div> 
                <h2 className='lizard-health-value'>{enemyHealth}/175 </h2>
                <ProgressBar variant="danger" id='lizard-hp' now={healthBar} />
                <img src={renderEnemy()} alt='lizard' id='lizard' />
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
        <div id="battle-one-background" className='game-box'>
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
                    setRogPopup={setRogPopup}
                    
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
                    setFloatingDamage={setFloatingDamage}
                    sorPopup={sorPopup}
                    setSorPopup={setSorPopup}
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
                    setFloatingDamage={setFloatingDamage}
                    palPopup={palPopup}
                    setPalPopup={setPalPopup}
                />
            </div>
        </div>
    )
  
}

export default Battle1