import {useState} from 'react'
import paladinpic from '../Images/paladin-pic.png'
import paladindead from '../Images/paladin-pic-dead.png'
import paladinbless from '../Images/paladin-pic-bless.png'
import paladinstun from '../Images/paladin-pic-stun.png'
import paladinac from '../Images/paladin-armor.png'
import healingpotion from '../Images/healing-potion.png'
import potionused from '../Images/healing-potion-used.png'
import deus from '../Images/paladin-name.png'
import { ProgressBar } from 'react-bootstrap'
import press from '../Music/button-press.mp3'
import potionSound from '../Music/potion-use.mp3'
import smiteSound from '../Music/smite-sound.mp3'
import missSound from '../Music/miss-sound.mp3'



function PaladinUI ({
    palStunStatus,
    setPaladinHealth,
    enemyArmorClass,
    smiteCD,
    setSmiteCD,
    battleLog, 
    setBattleLog, 
    blessStatus, 
    setBlessStatus, 
    updateBattleLog, 
    palTurn, 
    setPalTurn, 
    paladinHealth, 
    enemyHealth, 
    setEnemyHealth}) {
    
    const [potionAmount, setPotionAmount] = useState(3)
    const [potionCD, setPotionCD] = useState(true)

// Sound effects for clicking abilities, potions, and missing signature actions.
    function pressAudio() {
        const audio = new Audio(press);
        audio.volume = 0.3
        audio.play()
    }

    function potionAudio() {
        const audio = new Audio(potionSound);
        audio.volume = 0.3
        audio.play()
    }

    function smiteAudio() {
        const audio = new Audio(smiteSound);
        audio.volume = 0.3
        audio.play()
    }

    function missAudio() {
        const audio = new Audio(missSound);
        audio.volume = 0.3
        audio.play()
    }

    
// Setting up accuracy rolling for Paladin. Uses a d20 (20 sided die) to determine if attack is successful
// Paladin's Bless ability adds a d4 (4 sided die) to the d20 value with total of both the d4 and d20.
    const blessRoll = (Math.floor(Math.random() * 4 + 1))
    
    let diceRoll = 
    blessStatus > 0 
    ? (Math.floor(Math.random() * 20 + 1)) + (blessRoll)
    : (Math.floor(Math.random() * 20 + 1))
    
    
// Paladin attacks have a +7 to the base hit die(dice).
// Ex: Paladin rolls a 8 on the (d20). 8 + 7 = 15 total roll. 
    function paladinDiceRoll() {
        return (diceRoll) + 7
    }

    const paladinRoll = paladinDiceRoll()
    
// Base attack damage modification for basic Attack.
// Rolls 1d6 (One 6 sided die) with a +5 to the base damage.
    function paladinDamageModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 5)
    }

// Made the paladinAttack variable to keep the value of the damage modifier consistent with the damage it does and the message sent to the battle log.
    const paladinAttack = paladinDamageModifier()

// This function rolls against the enemy armor class determined in Battle# Components then records the damage done as well as
// setting enemy hp to the difference of the attack value and its current hp. 
// Also resets potion to true if it was used and continues the turn order.
    function palAttack() {
        const damage = (enemyHealth) - (paladinAttack)
        if (paladinRoll >= enemyArmorClass) {
            if (paladinAttack <= 9) {
                updateBattleLog(
                    `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                    `Deus attacked the enemy for ${paladinAttack} damage!`)
            } else {
                updateBattleLog(
                    `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                    `Deus crushed the target for ${paladinAttack} damage!!`)
            }
            setEnemyHealth(damage)
        } else {
            updateBattleLog(
                `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                `Deus missed the mark.`)
        }
        setPotionCD(true)
        setPalTurn(2)
        pressAudio()
    }

// Damage modificataion
// Rolls 3d6(Three 6 sided dice) with a +11 to the base damage.
    function paladinDivineSmiteModifier() {
        return (Math.floor(Math.random() * 16 + 1) + 13)
    }

    const smiteAttack = paladinDivineSmiteModifier()

// This function rolls against the enemy armor class determined in Battle# Components then records the damage done as well as
// setting enemy hp to the difference of the attack value and its current hp. 
// Resets potion to true if it was used and continues the turn order.
// Sets Divine Smite cooldown to 0 upon use. Divine Smite cooldown value goes increments by 1 eac round.
// Determined in the Battle# components.
// Divine Smite usable again at the value of 3. 
    function palDivineSmite() {
        const damage = (enemyHealth) - (smiteAttack)
        if (paladinRoll >= enemyArmorClass) {
            if (smiteAttack <= 17) {
                updateBattleLog(
                    `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                    `Deus smited the enemy for ${smiteAttack} damage!`)
            } else {
                updateBattleLog(
                    `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                    `Deus gave divine judgement for ${smiteAttack} damage!!`)
            }
            setEnemyHealth(damage)
            smiteAudio()
        } else {
            updateBattleLog(
                `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                `Deus whiffed his holy swing!`)
            missAudio()
        }
        setPotionCD(true)
        setPalTurn(2)
        setSmiteCD(0)
        
    }

// Grants the party Bless that increases the hit die roll (d20) by an additional 1d4(One 4 sided die).
// Sets the blessStatus to 6 that is decremented at the end of each round altered in Battle# components.
    function palBlessAction() {
        setBattleLog([...battleLog, "Deus blessed the team, increasing dice rolls!" ])
        setPotionCD(true)
        setBlessStatus(6)
        setPalTurn(2)
        pressAudio()
    }

// Potion Modification
// Rolls 1d6(One 6 sided die) with a +14 to the base.
    function potionRestoreModifier () {
        return (Math.floor(Math.random() * 6 + 1) + 14)
    }

    const potionRestore = potionRestoreModifier()

// Allows Paladin/player to use potion if it's ready, the Paladin's Turn, and if the Paladin is alive.
// Reduce the potionAmount and sets it to false allowing only 1 potion to be used per turn.
// Records the information into the Battle Log.
    function drinkPotion() {
        const restore = (paladinHealth) + (potionRestore)
        if (potionCD === true && palTurn === 1 && potionAmount > 0 && paladinHealth > 0) {
            potionAudio()
            setPaladinHealth(restore)
            setPotionAmount(potionAmount - 1)
            setPotionCD(false)
            setBattleLog([...battleLog, `Deus restored ${potionRestore} health.`])
        } 
    }

// Changes the UI element of the potion from red to greyscale based on availability.
    function potionStatus() {
        if (potionCD) {
            return healingpotion
        } else {
            return potionused
        }
    }

// Prevents Paladin's health from going above its max and lower than 0. 
    if (paladinHealth < 0) {
        setPaladinHealth(0)
    } else if (paladinHealth > 47) {
        setPaladinHealth(47)
    }

// To make the progress bar display a percentage of the health/cooldown value.
    const healthBar = ((paladinHealth / 47) * 100)

    const cooldownBar = ((smiteCD/3) * 100)

// Changes the color of the progress bar based on the percentage of the Paladin's remaining Health.
    function progressBarClass () {
        if (healthBar < 100 && healthBar >= 50) {
            return "success"
        } else if (healthBar < 50 && healthBar >= 25) {
            return "warning"
        } else if (healthBar < 25) {
            return "danger"
        } else {
            return ""
        }

    } 

// Determines the icon used to display Paladin's status based on truthy values of buffs/debuffs.
    function paladinStatus() {
        if (paladinHealth > 0 && blessStatus === 0) {
            if (palStunStatus) {
                return paladinstun
            } else {
                return paladinpic
            }
        } else if (blessStatus && paladinHealth > 0) {
            if (palStunStatus) {
                return paladinstun
            } else {
                return paladinbless
            }
        } else {
            return paladindead
        }
    }

// Conditionally renders based on the availability of Divine Smite. smiteCD is state that increments by 1 within the Battle# Component.
// smiteCD updates at the end of each Round and becomes available for use at 3.
    function smiteAvailable() {
        if (smiteCD === 3 ) {
            return <button
            className='attack-turn'
            id="divine-smite"
            onClick={palDivineSmite} >
                Divine Smite
        </button>
        } else {
            return <button
            className='attack'
            id='third-action'>
                Divine Smite
        </button>
        }
    }

// Conditionally renders the Paladin UI for when it is or not the Paladin's turn.
    function renderActions() {
        if (palTurn === 1) {
            return (
                <div className='attack-box' >
                <button 
                    className='attack-turn'
                    onClick={palAttack}>
                        Attack
                </button>
                <button 
                    className='attack-turn'
                    id='bless-action'
                    onClick={palBlessAction}>
                        Bless
                </button>
                {smiteAvailable()}
                </div>
               
                )
        } else {
            return (
                <div>
                <button 
                    className='attack'>
                        Attack
                </button>
                <button
                    className='attack'
                    id='second-action'>
                        Bless
                </button>
                <button
                    className='attack'
                    id='third-action'>
                        Divine Smite
                </button>
                </div>
                )
        }
    }

// Changes Paladin UI class based on turn value to allow players to use Paladin actions.
// When no longer Paladin's turn, actions go gray and are not usable. 
    function className() {
        if (palTurn === 1) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={paladinStatus()}
            alt='paladin pic'
            />
            <img 
            className='healing-potion-pld'
            src={potionStatus()}
            alt='healing-potion'
            onClick={drinkPotion}
            />
            <h1 className='potion-amount-pld'>{potionAmount}</h1>
            <img 
            className='paladin-ac'
            src={paladinac}
            alt='paladin shield'
            />
            <div className='character-hp' >HP: {paladinHealth}/47</div>
            <ProgressBar variant={progressBarClass()} animated id='character-healthbar' now={healthBar} />
            <ProgressBar variant='warning' animated id='smite-cooldown-bar' now={cooldownBar} />
            {renderActions()}
            <img 
            className='char-name'
            src={deus}
            alt='deus'
            />
         

            
        </div>
    )
}

export default PaladinUI