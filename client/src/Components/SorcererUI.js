import {useState} from 'react'
import sorcererpic from '../Images/sorcerer-pic.png'
import sorcererdead from '../Images/sorcerer-pic-dead.png'
import sorcererbless from '../Images/sorcerer-pic-bless.png'
import sorcererac from '../Images/sorcerer-armor.png'
import healingpotion from '../Images/healing-potion.png'
import potionused from '../Images/healing-potion-used.png'
import juhl from '../Images/sorcerer-name.png'
import { ProgressBar } from 'react-bootstrap'

function SorcererUI ({
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
    setEnemyHealth}) {

    const [potionAmount, setPotionAmount] = useState(3)
    const [potionCD, setPotionCD] = useState(true)

    function sorcererDamageModifier() {
        return (Math.floor(Math.random() * 12 + 1) + 4)
    }

    const sorcererAttack = sorcererDamageModifier()

    function className() {
        if (sorTurn === 1) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

    const blessRoll = (Math.floor(Math.random() * 4 + 1))

    let diceRoll = 
        blessStatus > 0 
        ? (Math.floor(Math.random() * 20 + 1)) + (blessRoll)
        : (Math.floor(Math.random() * 20 + 1))

    function sorcererDiceRoll() {
        return (diceRoll) + 5
    }
    const sorcererRoll = sorcererDiceRoll()

    function sorAttack() {
        const damage = (enemyHealth) - (sorcererAttack)
        if (sorcererRoll >= enemyArmorClass) {
            updateBattleLog(
                `Juhl rolled 🎲(${diceRoll}) + 5 against the enemy.`,
                `Juhl blasted the enemy for ${sorcererAttack} damage!`)
             
        setEnemyHealth(damage)
        } else {
            updateBattleLog(
                `Juhl rolled 🎲(${diceRoll}) + 5 against the enemy.`,
                `Juhl missed the target`)
        }
        setPotionCD(true)
        setSorTurn(2)
    }

    function sorcererMagicMissleModifier() {
        const variant = Math.floor(Math.random() * 3 + 1)
        if (variant === 3) {
            return (Math.floor(Math.random() * 9 + 1) + 6)
        } else if (variant === 2) {
            return (Math.floor(Math.random() * 6 + 1) + 4)
        } else {
            return (Math.floor(Math.random() * 3 + 1) + 2)
        }
    }

    const magicMissleAttack = sorcererMagicMissleModifier()

    function sorMagicMissle() {
        const damage = (enemyHealth) - (magicMissleAttack)
        updateBattleLog(
                `Juhl cast Magic Missle.`,
                `Juhl pelted the enemy for ${magicMissleAttack} damage!`)
        
        setEnemyHealth(damage)
        setPotionCD(true)
        setSorTurn(2)
    }

    function sorcererLightningBoltModifier() {
        const variant = Math.floor(Math.random() * 4)
        if (variant >= 1) {
            return (Math.floor(Math.random() * 42 + 1) + 6)
        } else {
            return (Math.floor(Math.random() * 21 + 1) + 3)
        }
    }

    const lightningBoltAttack = sorcererLightningBoltModifier()

    function sorLightningBolt() {
        const damage = (enemyHealth) - (lightningBoltAttack)
        if (lightningBoltAttack <= 24) {
            updateBattleLog(
                `Juhl cast Lightning Bolt!`,
                `Juhl electrocuted the enemy for ${lightningBoltAttack} damage!`)
        } else {
            updateBattleLog(
                `Juhl cast Lightning Bolt!`,
                `Juhl obliterated the target for ${lightningBoltAttack} damage!!!`)
        }
        setEnemyHealth(damage)
        setPotionCD(true)
        setSorTurn(2)
        setLightningCD(0)
    }

    

    if (sorcererHealth < 0 ) {
        setSorcererHealth(0)
    } else if (sorcererHealth > 38) {
        setSorcererHealth(38)
    }

    const healthBar = ((sorcererHealth / 38) * 100)

    const cooldownBar = ((lightningCD/5) * 100)

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
    function sorcererStatus() {
        if (sorcererHealth > 0 && blessStatus === 0) {
            return sorcererpic
        } else if (blessStatus) {
            return sorcererbless
        } else {
            return sorcererdead
        }
    }

    function potionStatus() {
        if (potionCD) {
            return healingpotion
        } else {
            return potionused
        }
    }

    function lightningAvailable() {
        if (lightningCD === 5) {
            return <button
            className='attack-turn'
            id="lightning-bolt"
            onClick={sorLightningBolt} >
                Lightning Bolt
        </button>
        } else {
            return <button
            className='attack'
            id='third-action'>
                Lightning Bolt
        </button>
        }
    }

    function potionRestoreModifier () {
        return (Math.floor(Math.random() * 8 + 1) + 12)
    }

    const potionRestore = potionRestoreModifier()


    function drinkPotion() {
        const restore = (sorcererHealth) + (potionRestore)
        if (potionCD === true && sorTurn === 1 && potionAmount > 0 && sorcererHealth > 0) {
            setSorcererHealth(restore)
            setPotionAmount(potionAmount - 1)
            setPotionCD(false)
            setBattleLog([...battleLog, `Juhl restored ${potionRestore} health.`])
        } 
    }

    function renderActions() {
        if (sorTurn === 1) {
            return (
                <div className='attack-box' >
                <button 
                    className='attack-turn'
                    onClick={sorAttack}>
                        Fire Bolt
                </button>
                <button 
                    className='attack-turn'
                    id='magic-missle'
                    onClick={sorMagicMissle}>
                        Magic Missle
                </button>
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
                        Magic Missle
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

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={sorcererStatus()}
            alt='rogue pic'
            />
            <img 
            className='healing-potion-sor'
            src={potionStatus()}
            alt='healing-potion'
            onClick={drinkPotion}
            />
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
         

            
        </div>
    )
}

export default SorcererUI