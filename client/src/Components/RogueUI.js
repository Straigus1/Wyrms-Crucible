import {useState} from 'react'
import roguepic from '../Images/rogue-pic.png'
import roguedead from '../Images/rogue-pic-dead.png'
import rogueac from '../Images/rogue-armor.png'
import roguebless from '../Images/rogue-pic-bless.png'
import roguestun from '../Images/rogue-pic-stun.png'
import healingpotion from '../Images/healing-potion.png'
import potionused from '../Images/healing-potion-used.png'
import iris from '../Images/rogue-name.png'
import { ProgressBar } from 'react-bootstrap'
import press from '../Music/button-press.mp3'
import potionSound from '../Music/potion-use.mp3'
import phantomSound from '../Music/phantom-sound.wav'
import missSound from '../Music/miss-sound.mp3'



function RogueUI ({
    rogStunStatus,
    battleLog,
    setBattleLog,
    setRogueHealth,
    enemyArmorClass,
    phantomCD,
    setPhantomCD,
    blessStatus,
    setPoisonStatus,
    updateBattleLog, 
    rogTurn, 
    setRogTurn, 
    rogueHealth, 
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
    
    function phantomAudio() {
        const audio = new Audio(phantomSound);
        audio.volume = 0.3
        audio.play()
    }
    
    function missAudio() {
        const audio = new Audio(missSound);
        audio.volume = 0.3
        audio.play()
    }
        
// Setting up accuracy rolling for Rogue. Uses a d20 (20 sided die) to determine if attack is successful
// Paladin's Bless ability adds a d4 (4 sided die) to the d20 value with total of both the d4 and d20.
    const blessRoll = (Math.floor(Math.random() * 4 + 1))

    let diceRoll = 
        blessStatus > 0 
        ? (Math.floor(Math.random() * 20 + 1)) + (blessRoll)
        : (Math.floor(Math.random() * 20 + 1))

// Rogue attacks have a +6 to the base hit die(dice).
// Ex: Rogue rolls a 13 on the (d20). 13 + 6 = 19 total roll. 
    function rogueDiceRoll() {
        return (diceRoll) + 6
    }
    
    const rogueRoll = rogueDiceRoll()

// Damage modification for Rogue basic Attack.
// Rolls 2d6 (Two 6 sided dice) with a +7 to the base damage.
    function rogueDamageModifier() {
        return (Math.floor(Math.random() * 11 + 1) + 8)
    }

// Made the rogueAttack variable to keep the value of the damage modifier consistent with the damage it does and the message sent to the battle log
    const rogueAttack = rogueDamageModifier()

// This function rolls against the enemy armor class determined in Battle# Components then records the damage done as well as
// setting enemy hp to the difference of the attack value and its current hp. 
// Also resets potion to true if it was used and continues the turn order.
    function rogAttack() {
        const damage = (enemyHealth) - (rogueAttack)
        if (rogueRoll >= enemyArmorClass) {
            if (rogueAttack <= 12) {
                updateBattleLog(
                    `Iris rolled 🎲(${diceRoll}) + 6 against the enemy.`,
                    `Iris slashed the enemy for ${rogueAttack} damage! `)
            } else {
                updateBattleLog(
                    `Iris rolled 🎲(${diceRoll}) + 6 against the enemy.`,
                    `Iris mutilated the target for ${rogueAttack} damage!!`)
            }
            setEnemyHealth(damage)
            
        } else {
            updateBattleLog(
                `Iris rolled 🎲(${diceRoll}) + 6 against the enemy.`,
                'Iris missed the target.')
        }
        setPotionCD(true)
        setRogTurn(2)
        pressAudio()
        
    }
    
// Damage modificataion
// Rolls 1d6(One 6 sided die) with a +3 to the base damage.
    function rogueVenomStrikeModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 3)
    }

    const venomAttack = rogueVenomStrikeModifier()

// This function rolls against the enemy armor class determined in Battle# Components then records the damage done as well as
// setting enemy hp to the difference of the attack value and its current hp. 
// Resets potion to true if it was used and continues the turn order.
// Also sets poisonStatus to 3 which is lowered each round via the Battle# Component. Damage value can be seen in Battle# components.
    function rogVenomStrike() {
        const damage = (enemyHealth) - (venomAttack)
        if (rogueRoll >= enemyArmorClass) {
            updateBattleLog(
                    `Iris rolled 🎲(${diceRoll}) + 6 against the enemy.`,
                    `Iris dealt ${venomAttack} damage and poisoned the enemy!`)
            
            setEnemyHealth(damage)
            setPoisonStatus(3)
        } else {
            updateBattleLog(
                `Iris rolled 🎲(${diceRoll}) + 6 against the enemy.`,
                'Iris missed the target.')
        }
        setPotionCD(true)
        setRogTurn(2)
        pressAudio()
    }

// Damage Modification
// Rolls 3d6(Three 6 sided dice) with a +18 to the base damage.
    function roguePhantomAssultModifier() {
        return (Math.floor(Math.random() * 16 + 1) + 20)
    }

    const phantomAttack = roguePhantomAssultModifier()

// Phantom Attack (Signature Attack) has a higher base hit than regular attacks.
    function phantomDiceRoll() {
        return (diceRoll) + 11
    }

    const phantomRoll = phantomDiceRoll()


// This function rolls against the enemy armor class determined in Battle# Components then records the damage done as well as
// setting enemy hp to the difference of the attack value and its current hp. 
// Resets potion to true if it was used and continues the turn order.
// Sets Phantom Assault cooldown to 0 upon use. Phantom Assault cooldown value goes increments by 1 each round, determined in Battle# components. 
// Phantom Assault usable again at the value of 4.
    function rogPhantomAssault() {
        const damage = (enemyHealth) - (phantomAttack)
        if (phantomRoll >= enemyArmorClass) {
            updateBattleLog(
                    `Iris rolled 🎲(${diceRoll}) + 11 against the enemy.`,
                    `Iris eviscerated the enemy for ${phantomAttack} damage! `)
            setEnemyHealth(damage)
            phantomAudio()
        } else {
            updateBattleLog(
                `Iris rolled 🎲(${diceRoll}) + 11 against the enemy.`,
                'Iris lamentably missed the mark.')
            missAudio()
        }
        setPotionCD(true)
        setRogTurn(2)
        setPhantomCD(0)
        
    }

// Potion Modification
// Rolls 1d6(One 6 sided die) with a +14 to the base.
function potionRestoreModifier () {
    return (Math.floor(Math.random() * 6 + 1) + 14)
}

const potionRestore = potionRestoreModifier()

// Allows Rogue/player to use potion if it's ready, the Rogue's Turn, and if the Rogue is alive.
// Reduce the potionAmount and sets it to false allowing only 1 potion to be used per turn.
// Records the information into the Battle Log.
function drinkPotion() {
    const restore = (rogueHealth) + (potionRestore)
    if (potionCD === true && rogTurn === 1 && potionAmount > 0 && rogueHealth > 0) {
        potionAudio()
        setRogueHealth(restore)
        setPotionAmount(potionAmount - 1)
        setPotionCD(false)
        setBattleLog([...battleLog, `Iris restored ${potionRestore} health.`])
    } 
}

// Changes the UI element of the potion from red to greyscale based on availability 
function potionStatus() {
    if (potionCD) {
        return healingpotion
    } else {
        return potionused
    }
}

// Prevents Rogue's health from going above its max and lower than 0.
    if (rogueHealth < 0) {
        setRogueHealth(0)
    } else if (rogueHealth > 41) {
        setRogueHealth(41)
    }

// To make the progress bar display a percentage of the health/cooldown value.
    const healthBar = ((rogueHealth / 41) * 100)

    const cooldownBar = ((phantomCD/4) * 100)

// Changes the color of the progress bar based on the percentage of the Rogue's remaining Health. 
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

// Determines the icon used to display Rogue's status based on truthy values buffs/debuffs.
    function rogueStatus() {
        if (rogueHealth > 0 && blessStatus === 0) {
            if (rogStunStatus) {
                return roguestun
            } else {
                return roguepic
            }
        } else if (blessStatus && rogueHealth > 0) {
            if (rogStunStatus) {
                return roguestun
            } else {
                return roguebless
            }
        } else {
            return roguedead
        }
    }

// Conditionally renders based on the availability of Phantom Assault. phantomCD is state that increments by 1 within the Battle# Component.
// phantomCD updates at the end of each Round and becomes available for use at 4.
    function phantomAvailable() {
        if (phantomCD === 4 ) {
            return <button
            className='attack-turn'
            id="phantom-assault"
            onClick={rogPhantomAssault} >
                Phantom Assault
        </button>
        } else {
            return <button
            className='attack'
            id='third-action'>
                Phantom Assault
        </button>
        }
    }

// Conditionally renders the Rogue UI for when it is or not the Rogue's turn.
    function renderActions() {
        if (rogTurn === 1) {
            return (
                <div className='attack-box' >
                <button 
                    className='attack-turn'
                    onClick={rogAttack}>
                        Attack
                </button>
                <button 
                    className='attack-turn'
                    id='venom-strike'
                    onClick={rogVenomStrike}>
                        Venomous Strike
                </button>
                {phantomAvailable()}
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
                        Venomous Strike
                </button>
                <button
                    className='attack'
                    id='third-action'>
                        Phantom Assault
                </button>
                </div>
                )
        }
    }

// Changes Rogue UI class based on turn value to allow players to use Rogue actions.
// When no longer Rogue's turn, actions go gray and are not usable. 
function className() {
    if (rogTurn === 1) {
        return 'characterUI-turn'
    } else {
        return 'characterUI'
    }
}

    return (
        <div className={className()}>
            
            <img 
            className='character-pics'
            src={rogueStatus()}
            alt='rogue pic'
            />
            <img 
            className='healing-potion-rog'
            src={potionStatus()}
            alt='healing-potion'
            onClick={drinkPotion}
            />
            <h1 className='potion-amount-rog'>{potionAmount}</h1>
            <img 
            className='rogue-ac'
            src={rogueac}
            alt='rogue shield'
            />
            <div className='character-hp'>HP: {rogueHealth}/41</div>
            <ProgressBar variant={progressBarClass()} animated id='character-healthbar' now={healthBar} />
            <ProgressBar variant='warning' animated id='phantom-cooldown-bar' now={cooldownBar} />
            {renderActions()}
            <img 
            className='char-name'
            src={iris}
            alt='iris'
            />
            {/* <h1 className='damage-dealt'>{damageValue}</h1> */}
        </div>
    )

}

export default RogueUI