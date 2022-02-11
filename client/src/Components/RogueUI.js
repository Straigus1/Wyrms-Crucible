import {useState} from 'react'
import roguepic from '../Images/rogue-pic.png'
import roguedead from '../Images/rogue-pic-dead.png'
import rogueac from '../Images/rogue-armor.png'
import roguebless from '../Images/rogue-pic-bless.png'
import healingpotion from '../Images/healing-potion.png'
import potionused from '../Images/healing-potion-used.png'
import iris from '../Images/rogue-name.png'
import { ProgressBar } from 'react-bootstrap'


function RogueUI ({
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
    setEnemyHealth}) 
            {
    const [potionAmount, setPotionAmount] = useState(3)
    const [potionCD, setPotionCD] = useState(true)

    function rogueDamageModifier() {
        return (Math.floor(Math.random() * 11 + 2) + 6)
    }

    const rogueAttack = rogueDamageModifier()

    const blessRoll = (Math.floor(Math.random() * 4 + 1))

    let diceRoll = 
        blessStatus > 0 
        ? (Math.floor(Math.random() * 20 + 1)) + (blessRoll)
        : (Math.floor(Math.random() * 20 + 1))

    function rogueDiceRoll() {
        return (diceRoll) + 6
    }
    
    
    const rogueRoll = rogueDiceRoll()
    
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
                'Iris missed the target')
        }
        setPotionCD(true)
        setRogTurn(2)
    }

    function rogueVenomStrikeModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 3)
    }

    const venomAttack = rogueVenomStrikeModifier()

    function rogVenomStrike() {
        const damage = (enemyHealth) - (venomAttack)
        if (rogueRoll >= enemyArmorClass) {
            updateBattleLog(
                    `Iris rolled 🎲(${diceRoll}) + 6 against the enemy.`,
                    `Iris dealt ${venomAttack} damage, and poisoned the enemy!`)
            
            setEnemyHealth(damage)
            setPoisonStatus(3)
        } else {
            updateBattleLog(
                `Iris rolled 🎲(${diceRoll}) + 6 against the enemy.`,
                'Iris missed the target')
        }
        setPotionCD(true)
        setRogTurn(2)
    }

    function roguePhantomAssultModifier() {
        return (Math.floor(Math.random() * 15 + 4) + 18)
    }

    const phantomAttack = roguePhantomAssultModifier()

    function phantomDiceRoll() {
        return (diceRoll) + 11
    }

    const phantomRoll = phantomDiceRoll()

    function rogPhantomAssault() {
        const damage = (enemyHealth) - (phantomAttack)
        if (phantomRoll >= enemyArmorClass) {
            updateBattleLog(
                    `Iris rolled 🎲(${diceRoll}) + 11 against the enemy.`,
                    `Iris eviscerated the enemy for ${phantomAttack} damage! `)
            setEnemyHealth(damage)
        } else {
            updateBattleLog(
                `Iris rolled 🎲(${diceRoll}) + 11 against the enemy.`,
                'Iris lamentably missed the mark.')
        }
        setPotionCD(true)
        setRogTurn(2)
        setPhantomCD(0)
    }

    if (rogueHealth < 0) {
        setRogueHealth(0)
    } else if (rogueHealth > 41) {
        setRogueHealth(41)
    }

    const healthBar = ((rogueHealth / 41) * 100)

    const cooldownBar = ((phantomCD/4) * 100)

    function className() {
        if (rogTurn === 1) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

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

    function rogueStatus() {
        if (rogueHealth > 0 && blessStatus === 0) {
            return roguepic
        } else if (blessStatus && rogueHealth > 0) {
            return roguebless
        } else {
            return roguedead
        }
    }

    function potionStatus() {
        if (potionCD) {
            return healingpotion
        } else {
            return potionused
        }
    }

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

    function potionRestoreModifier () {
        return (Math.floor(Math.random() * 8 + 1) + 12)
    }

    const potionRestore = potionRestoreModifier()


    function drinkPotion() {
        const restore = (rogueHealth) + (potionRestore)
        if (potionCD === true && rogTurn === 1 && potionAmount > 0 && rogueHealth > 0) {
            setRogueHealth(restore)
            setPotionAmount(potionAmount - 1)
            setPotionCD(false)
            setBattleLog([...battleLog, `Iris restored ${potionRestore} health.`])
        } 
    }
    
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
        </div>
    )

}

export default RogueUI