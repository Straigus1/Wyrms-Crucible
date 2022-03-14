import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import Behemoth from '../Images/behemoth-pic.png'
import BehemothPoison from '../Images/behemoth-pic-poison.png'
import roundContainer from '../Images/round-container.png'
import BattleLog from './BattleLog'
import RogueUI from './RogueUI'
import PaladinUI from './PaladinUI'
import SorcererUI from './SorcererUI'
import AttackAnimations from './AttackAnimations'
import battleTheme from '../Music/magna-carta-2-battle-conditions.mp3'
import ReactAudioPlayer from 'react-audio-player'
import meteorSound from '../Music/meteor-sound.mp3'

function Battle4 () {
    const [enemyHealth, setEnemyHealth] = useState(400)
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
    const [meteorAvailable, setMeteorAvailable] = useState(true)
    const [phantomCD, setPhantomCD] = useState(4)
    const [lightningCD, setLightningCD] = useState(5)
    const [smiteCD, setSmiteCD] = useState(3)
    const [palTurn, setPalTurn] = useState(0) 
    const [rogTurn, setRogTurn] = useState(0) 
    const [sorTurn, setSorTurn] = useState(0) 
    const [battleLog, setBattleLog] = useState([])
    const [actionAnimate, setActionAnimate] = useState('')

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

// Rolls 1d6(One 6 sided die) with a +14 to the base damage.
    function enemyDamageModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 14)
    }
    const enemyAttack = enemyDamageModifier()

    const d20Roll = Math.floor(Math.random() * 20 + 1)
    
    function enemyd20Roll() {
        return (d20Roll) + 11
    }
    const enemyRoll = enemyd20Roll()

    function updateBattleLog(roll, info) {
        setBattleLog([...battleLog, roll, info])
    }

// Rolls 2d8(Two 8 sided dice) with a +7 to the base damage.
    function upheavalDamage() {
        return (Math.floor(Math.random() * 15 + 1) + 8)
    }

    function meteorAudio() {
        const audio = new Audio(meteorSound);
       audio.volume = 0.3
       audio.play()
    }

    const upheavalAttack = upheavalDamage()
    // No longer attack dead heroes
    function enemyTarget () {
        const baseCritAttack = (enemyAttack + (Math.floor(Math.random() * 6 + 1)))
        const upheavalCritAttack = (upheavalAttack + (Math.floor(Math.random() * 15 + 1) + 1))
        const variant = Math.floor(Math.random() * 10 + 1)
        const stunChance = Math.floor(Math.random() * 10 + 1)
        let target = Math.floor(Math.random() * 10 + 1)
        let damage = 0
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
                        `Behemoth rolled a natural 🎲(20) against ${name}!`,
                        `Behemoth critically struck ${name} for ${baseCritAttack} damage!!!`)
                    setCharacterPopup(baseCritAttack)
                } else {
                    updateBattleLog(
                        `Behemoth rolled 🎲(${d20Roll}) + 11 against ${name}.`,
                        `Behemoth attacked ${name} for ${enemyAttack} damage!`)
                    setCharacterPopup(enemyAttack)
                }  
                setCharacterHealth(damage)
                } else {
                updateBattleLog(
                    `Behemoth rolled 🎲(${d20Roll}) + 11 against ${name}.`,
                    string)
                setCharacterPopup('Miss')
                }
        }
        function updateLogWithUpheavalInfo(armorClass, name, setCharacterHealth, setCharacterStunStatus, string, setCharacterPopup) {
            if (enemyRoll >= armorClass) {
                if (d20Roll === 20) {
                    updateBattleLog(
                        `Behemoth used Upheaval, rolled a natural 🎲(20) against ${name}!`,
                        `Behemoth ejected ${name} into the ceiling for ${upheavalCritAttack} critical damage and applied stun!!!`)
                    setCharacterStunStatus(true)
                    setCharacterPopup(upheavalCritAttack) 
                    
                } else {
                    // Using "stunChance" to determine if target is stunned.
                    if (stunChance <= 4) {
                        updateBattleLog(
                            `Behemoth used Upheaval, rolled 🎲(${d20Roll}) + 11 against ${name}.`,
                            `Behemoth rammed ${name} into the wall for ${upheavalAttack} damage and stunned ${name}!`)
                        setCharacterStunStatus(true) 
                    } else {
                        updateBattleLog(
                            `Behemoth used Upheaval, rolled 🎲(${d20Roll}) + 11 against ${name}.`,
                            `Behemoth lifted ${name} sky high for ${upheavalAttack} damage!`)
                    }
                    setCharacterPopup(upheavalAttack)
                } 
                setCharacterHealth(damage)
                } else {
                updateBattleLog(
                    `Behemoth used Upheaval, rolled 🎲(${d20Roll}) + 11 against ${name}.`,
                    string)
                setCharacterPopup('Miss')
                }
        }
        // Cast meteor when reduced below 30% hp, only once.
        if (enemyHealth < 120 && meteorAvailable === true) {
            updateBattleLog(
                "Behemoth cast Meteor!!",
                "The Party's HP was reduced to 1!!"
            )
            setMeteorAvailable(false)
            if (rogueHealth > 0) {
                setRogueHealth(1)
                setRogPopup(rogueHealth - 1)
            }
            if (sorcererHealth > 0) {
                setSorcererHealth(1)
                setSorPopup(sorcererHealth - 1)
            }
            if (paladinHealth > 0) {
                setPaladinHealth(1)
                setPalPopup(paladinHealth - 1)
            }
            meteorAudio()
        } else {
        // Using "variant" to determine if Upheaval is used.   
        if (variant <= 4) {
            if ((target <= 3 && rogueHealth > 0) || (paladinHealth <= 0 && sorcererHealth <= 0)) {
                alterDamageValueBasedOnDiceRoll(rogueHealth, upheavalAttack, upheavalCritAttack)            
                updateLogWithUpheavalInfo(15, 'Iris', setRogueHealth, setRogStunStatus, 'Iris avoided the attack!', setRogPopup)
            } else if ((target >= 4 && target <= 6 && sorcererHealth > 0) || (rogueHealth <= 0 && paladinHealth <= 0) || (target >= 6 && target <= 9 && paladinHealth <= 0)) {
                alterDamageValueBasedOnDiceRoll(sorcererHealth, upheavalAttack, upheavalCritAttack)            
                updateLogWithUpheavalInfo(14, 'Juhl', setSorcererHealth, setSorStunStatus, 'Juhl resisted the assault!', setSorPopup)
            } else if ((target >= 7 && target <= 10 && paladinHealth > 0) || (rogueHealth <= 0 && sorcererHealth <= 0) || (target >= 3 && target <= 5 && sorcererHealth <= 0) || (target <= 2 && rogueHealth <= 0)) {
                alterDamageValueBasedOnDiceRoll(paladinHealth, upheavalAttack, upheavalCritAttack)            
                updateLogWithUpheavalInfo(19, 'Deus', setPaladinHealth, setPalStunStatus, 'Deus blocked the strike!', setPalPopup)
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
            if (poisonStatus === 1) {
            setBattleLog([...battleLog, `Behemoth was dealt ${poisonDamage} damage from poison. \n Behemoth is no longer poisoned.`])
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
            <ReactAudioPlayer
            src={battleTheme}
            className="music-control-battle"
            autoPlay
            controls
            loop
            volume={0.2}
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
            <AttackAnimations
                    actionAnimate={actionAnimate}
                    setActionAnimate={setActionAnimate} />
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
                    setRogPopup={setRogPopup}
                    setActionAnimate={setActionAnimate}
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
                    setSorPopup={setSorPopup}
                    setActionAnimate={setActionAnimate}
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
                    setPalPopup={setPalPopup}
                    setActionAnimate={setActionAnimate}
                />
            </div>
        </div>
    )
  
}

export default Battle4