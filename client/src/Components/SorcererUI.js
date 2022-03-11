import {useState, useEffect} from 'react'
import sorcererpic from '../Images/sorcerer-pic.png'
import sorcererdead from '../Images/sorcerer-pic-dead.png'
import sorcererbless from '../Images/sorcerer-pic-bless.png'
import sorcererstun from '../Images/sorcerer-pic-stun.png'
import sorcererac from '../Images/sorcerer-armor.png'
import healingpotion from '../Images/healing-potion.png'
import potionused from '../Images/healing-potion-used.png'
import juhl from '../Images/sorcerer-name.png'
import { ProgressBar } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import { Tooltip } from 'react-bootstrap'
import press from '../Music/button-press.mp3'
import potionSound from '../Music/potion-use.mp3'
import lightning from '../Music/lightning.mp3'

function SorcererUI ({
    sorStunStatus,
    battleLog,
    setBattleLog,
    setSorcererHealth,
    enemyArmorClass,
    lightningCD,
    setLightningCD,
    blessStatus, 
    updateBattleLog, 
    sorTurn, 
    setSorTurn, 
    sorcererHealth, 
    enemyHealth, 
    setEnemyHealth,
    setFloatingDamage,
    sorPopup}) {

    const [potionAmount, setPotionAmount] = useState(3)
    const [potionCD, setPotionCD] = useState(true)
    const [restorePopup, setRestorePopup] = useState(0)

    useEffect(() => {
        let popup = document.createElement("h3");
        let element = document.getElementById('popup-box-sor')
        
        if (sorPopup > 0) {
            
            popup.className = "damage-float"
            popup.textContent = `-${sorPopup}`
        }
        if (sorPopup === 'Miss') {
            popup.className = "enemy-missed"
            popup.textContent = `${sorPopup}`
        }
        element.appendChild(popup)
        setTimeout(() => {
            popup.remove()
        }, 1900)
        
    }, [sorPopup])

    useEffect(() => {
        let popup = document.createElement("h3");
        let element = document.getElementById('popup-box-sor')
        if (restorePopup !== 0) {
            popup.className = "heal-float"
            popup.textContent = `+${restorePopup}`
        }
        element.appendChild(popup)
        setTimeout(() => {
            popup.remove()
        }, 1900)
        
    }, [restorePopup])

// Sound effects for clicking abilities and potions.
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

    function lightningAudio() {
        const audio = new Audio(lightning);
        audio.volume = 0.3
        audio.play()
    }

// Setting up accuracy rolling for Sorcerer. Uses a d20 (20 sided die) to determine if attack is successful
// Paladin's Bless ability adds a d4 (4 sided die) to the d20 value with total of both the d4 and d20.
    const blessRoll = (Math.floor(Math.random() * 4 + 1))
    const d20Roll = (Math.floor(Math.random() * 20 + 1))

    const diceRoll = 
        blessStatus > 0 
        ? d20Roll + (blessRoll)
        : d20Roll

// Sorcerer attacks have a +5 to the base hit die(dice).
// Ex: Sorcerer rolls a 17 on the (d20). 17 + 5 = 22 total roll. 
    function sorcererDiceRoll() {
        return (diceRoll) + 5
    }
    const sorcererRoll = sorcererDiceRoll() 
    
// Damage modification for Sorcerer basic Attack.
// Rolls 2d6 (Two 6 sided dice) with a +4 to the base damage.
    function sorcererDamageModifier() {
        return (Math.floor(Math.random() * 11 + 1) + 5)
    }
// Made the sorcererAttack variable to keep the value of the damage modifier consistent with the damage it does and the message sent to the battle log.   
    const sorcererAttack = sorcererDamageModifier()


// This function rolls against the enemy armor class determined in Battle# Components then records the damage done as well as
// setting enemy hp to the difference of the attack value and its current hp. 
// Also resets potion to true if it was used and continues the turn order.
    function sorAttack() {
        let damage = enemyHealth
        const critAttack = (sorcererAttack + (Math.floor(Math.random() * 11 + 1) + 1))
        if (d20Roll === 20) {
            damage = (enemyHealth) - (critAttack)
        } else {
            damage = (enemyHealth) - (sorcererAttack)
        }
        if (sorcererRoll >= enemyArmorClass) {
            if (d20Roll === 20) {
                updateBattleLog(
                    `Juhl rolled a natural 🎲(20) against the enemy!`,
                    `Juhl blasted the enemy for ${critAttack} damage!!!`)
                setFloatingDamage(critAttack)
            } else {
                updateBattleLog(
                    `Juhl rolled 🎲(${diceRoll}) + 5 against the enemy.`,
                    `Juhl blasted the enemy for ${sorcererAttack} damage!`)
                setFloatingDamage(sorcererAttack)
            }   
        setEnemyHealth(damage)
        } else {
            updateBattleLog(
                `Juhl rolled 🎲(${diceRoll}) + 5 against the enemy.`,
                `Juhl missed the target.`)
            setFloatingDamage('Miss')
        }
        setPotionCD(true)
        setSorTurn(2)
        pressAudio()
    }

// Damage modificataion
// Has damage variance based on the 'variant" variable value from 1 to 3.
    function sorcererMagicMissleModifier() {
        const variant = Math.floor(Math.random() * 3 + 1)
        if (variant === 3) {
    // Rolls 1d10(One 10 sided die) with a +6 to the base damage.
            return (Math.floor(Math.random() * 10 + 1) + 6)
        } else if (variant === 2) {
    // Rolls 1d6(One 6 sided die) with a +4 to the base damage.
            return (Math.floor(Math.random() * 6 + 1) + 4)
        } else {
    // Rolls 1d4(One 4 sided die) with a +2 to the base damage.
            return (Math.floor(Math.random() * 4 + 1) + 2)
        }
    }

    const magicMissleAttack = sorcererMagicMissleModifier()

// Unlike most attacks, this one does not roll against the enemy's armor class and will always be successful.
// Sets enemy HP to the difference of its current hp and attack value while recording data in the Battle Log.
    function sorMagicMissle() {
        const damage = (enemyHealth) - (magicMissleAttack)
        updateBattleLog(
                `Juhl cast Magic Missile.`,
                `Juhl pelted the enemy for ${magicMissleAttack} damage!`)
        setFloatingDamage(magicMissleAttack)
        setEnemyHealth(damage)
        setPotionCD(true)
        setSorTurn(2)
        pressAudio()
    }

// Damage modificataion
// Has a chance to do half the normal damage based the "variant" variable value.
// Increased base damage significantly for balancing purposes. 
// For a signature action, it should consistenly do more damage than base attacks.
    function sorcererLightningBoltModifier() {
        const variant = Math.floor(Math.random() * 5 + 1)
        if (variant >= 2) {
    // Rolls 4d6(Four 6 sided die) with a +24 to the base damage.
            return (Math.floor(Math.random() * 21 + 1) + 27)
        } else {
    // Does not necessarily roll. Simply emulates doing half damage.
            return (Math.floor(Math.random() * 11 + 1) + 13)
        }
    }

    const lightningBoltAttack = sorcererLightningBoltModifier()

// Does not roll against the enemy's armor class, thus always being successful.
// Sets enemy HP to the difference of its current hp and attack value while recording data in the Battle Log.
    function sorLightningBolt() {
        const damage = (enemyHealth) - (lightningBoltAttack)
        if (lightningBoltAttack <= 24) {
            updateBattleLog(
                `Juhl cast Lightning Bolt!`,
                `Juhl electrocuted the enemy for ${lightningBoltAttack} damage!`)
            setFloatingDamage(lightningBoltAttack)
        } else {
            updateBattleLog(
                `Juhl cast Lightning Bolt!`,
                `Juhl obliterated the target for ${lightningBoltAttack} damage!!!`)
            setFloatingDamage(lightningBoltAttack)
        }
        setEnemyHealth(damage)
        setPotionCD(true)
        setSorTurn(2)
        setLightningCD(0)
        lightningAudio()
    }

// Potion Modification
// Rolls 1d6(One 6 sided die) with a +14 to the base.
    function potionRestoreModifier () {
        return (Math.floor(Math.random() * 6 + 1) + 14)
    }

    const potionRestore = potionRestoreModifier()

// Allows Sorcerer/player to use potion if it's ready, the Sorcerer's Turn, and if Sorcerer is alive.
// Reduce the potionAmount and sets it to false allowing only 1 potion to be used per turn.
// Records the information into the Battle Log.
    function drinkPotion() {
        const restore = (sorcererHealth) + (potionRestore)
        if (potionCD === true && sorTurn === 1 && potionAmount > 0 && sorcererHealth > 0) {
            potionAudio()
            setRestorePopup(potionRestore)
            setSorcererHealth(restore)
            setPotionAmount(potionAmount - 1)
            setPotionCD(false)
            setBattleLog([...battleLog, `Juhl restored ${potionRestore} health.`])
        } 
    }

// Changes the UI element of the potion from red to greyscale based on availability 
    function potionStatus() {
        if (potionCD && sorTurn === 1 && potionAmount > 0) {
            return healingpotion
        } else {
            return potionused
        }
    }
    
// Prevents Sorcerer's health from going above its max and lower than 0.
    if (sorcererHealth < 0 ) {
        setSorcererHealth(0)
    } else if (sorcererHealth > 38) {
        setSorcererHealth(38)
    }

// To make the progress bar display a percentage of the health/cooldown value.
    const healthBar = ((sorcererHealth / 38) * 100)

    const cooldownBar = ((lightningCD/5) * 100)

// Changes the color of the progress bar based on the percentage of the Sorcerer's remaining Health. 
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

// Determines the icon used to display Sorcerer's status based on truthy values buffs/debuffs.
    function sorcererStatus() {
        if (sorcererHealth > 0 && blessStatus === 0) {
            if (sorStunStatus) {
                return sorcererstun
            } else {
                return sorcererpic
            }
        } else if (blessStatus && sorcererHealth > 0) {
            if (sorStunStatus) {
                return sorcererstun
            } else {
                return sorcererbless
            }
        } else {
            return sorcererdead
        }
    }

// Renders a button when it's the character's turn and displays a tooltip of the action.
function overlayTooltipAndAction(action, skillName, id, description) {
    return (
        <OverlayTrigger
            placement="top"
            delay={{show: 300, hide: 70}}
            overlay={
                <Tooltip id="button-tooltip">
                {description} 
                </Tooltip>
        }
        >
            <button 
                className='attack-turn'
                id={id}
                onClick={action}>
                    {skillName} 
            </button>
        </OverlayTrigger>
    )
}
   
// Conditionally renders based on the availability of Lightning Bolt. lightningCD is state that increments by 1 within the Battle# Component.
// lightningCD updates at the end of each Round and becomes available for use at 5.
    function lightningAvailable() {
        if (lightningCD === 5) {
            return (
                overlayTooltipAndAction(sorLightningBolt, 'Lightning Bolt', 'lightning-bolt', 'Deals 28-48 damage. \n 20% chance of reducing damage dealt by half. \n Cooldown: 5 Rounds \n Does not roll. Cannot miss. ')
            )
        } else {
            return <button
            className='attack'
            id='third-action'>
                Lightning Bolt
        </button>
        }
    }


// Conditionally renders the Sorcerer UI for when it is or not the Sorcerer's turn.
    function renderActions() {
        if (sorTurn === 1) {
            return (
                <div className='attack-box' >
                {overlayTooltipAndAction(sorAttack, 'Fire Bolt', '', 'Deals 6-16 damage. \n Hit Bonus: +5')}
                {overlayTooltipAndAction(sorMagicMissle, 'Magic Missile', 'magic-missle', 'Deals varied damage. \n Variances: 3-6, 5-10, 7-16. \n Does not roll. Cannot miss.')}
                {lightningAvailable()}
                </div>
               
                )
        } else {
            return (
                <div>
                <button 
                    className='attack'>
                        Fire Bolt
                </button>
                <button
                    className='attack'
                    id='second-action'>
                        Magic Missile
                </button>
                <button
                    className='attack'
                    id='third-action'>
                        Lightning Bolt
                </button>
                </div>
                )
        }
    }

// Render potion available and tooltip.
    function renderPotionAndTooltip () {
        if (sorTurn === 1) {
            return (
                <OverlayTrigger
                    placement="bottom"
                    delay={{show: 300, hide: 70}}
                    overlay={
                        <Tooltip id="potion-tooltip">
                            {"Restores 15-20 HP. \n Can only be used once per character's turn. \n Does not end Turn."}
                        </Tooltip>
            }
            >
                <img 
                    className='healing-potion-sor'
                    src={potionStatus()}
                    alt='healing-potion'
                    onClick={drinkPotion}
                />
            </OverlayTrigger>
            )
        } else {
            return (
                <img 
                    className='healing-potion-sor'
                    src={potionStatus()}
                    alt='healing-potion'
                    onClick={drinkPotion}
                />
            )
        }
        
    }

// Changes Sorcerer UI class based on turn value to allow players to use Sorcerer actions.
// When no longer Sorcerer's turn, actions go gray and are not usable. 
    function className() {
        if (sorTurn === 1) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={sorcererStatus()}
            alt='sorcerer pic'
            />
            {renderPotionAndTooltip()}
            <h1 className='potion-amount-sor'>{potionAmount}</h1>
            <img 
            className='sorcerer-ac'
            src={sorcererac}
            alt='sorcerer shield'
            />
            <div className='character-hp'>HP: {sorcererHealth}/38</div>
            <ProgressBar variant={progressBarClass()} animated id='character-healthbar' now={healthBar} />
            <ProgressBar variant='warning' animated id='lightning-cooldown-bar' now={cooldownBar} />
            {renderActions()}
            <img 
            className='char-name'
            src={juhl}
            alt='juhl'
            />
            <div id='popup-box-sor'></div>
        </div>
    )
}

export default SorcererUI