import React from 'react'
import paladinpic from '../Images/paladin-pic.png'
import paladindead from '../Images/paladin-pic-dead.png'
import paladinbless from '../Images/paladin-pic-bless.png'
import paladinac from '../Images/paladin-armor.png'
import deus from '../Images/paladin-name.png'
import { ProgressBar } from 'react-bootstrap'



function PaladinUI ({
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

    function paladinDamageModifier() {
        return (Math.floor(Math.random() * 6 + 1) + 4)
    }
    const paladinAttack = paladinDamageModifier()

    const blessRoll = (Math.floor(Math.random() * 4 + 1))

    let diceRoll = 
        blessStatus > 0 
        ? (Math.floor(Math.random() * 20 + 1)) + (blessRoll)
        : (Math.floor(Math.random() * 20 + 1))
    

    function paladinDiceRoll() {
        return (diceRoll) + 7
    }
    const paladinRoll = paladinDiceRoll()

   

    function className() {
        if (palTurn === 1) {
            return 'characterUI-turn'
        } else {
            return 'characterUI'
        }
    }

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
                `Deus missed the mark!`)
        }
        setPalTurn(2)
    }

    function paladinDivineSmiteModifier() {
        return (Math.floor(Math.random() * 15 + 3) + 5)
    }

    const smiteAttack = paladinDivineSmiteModifier()

    function palDivineSmite() {
        const damage = (enemyHealth) - (smiteAttack)
        if (paladinRoll >= enemyArmorClass) {
            if (paladinAttack <= 11) {
                updateBattleLog(
                    `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                    `Deus smited the enemy for ${smiteAttack} damage!`)
            } else {
                updateBattleLog(
                    `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                    `Deus gave divine judgement for ${smiteAttack} damage!!`)
            }
            setEnemyHealth(damage)
        } else {
            updateBattleLog(
                `Deus rolled 🎲(${diceRoll}) + 7 against the enemy.`,
                `Deus whiffed his holy swing`)
        }
        setPalTurn(2)
        setSmiteCD(0)
    }

    function palBlessAction() {
        setBattleLog([...battleLog, "Deus blessed the team, increasing dice rolls!" ])
        setBlessStatus(6)
        setPalTurn(2)
    }
    if (paladinHealth < 0) {
        paladinHealth = 0
    }

    const healthBar = ((paladinHealth / 47) * 100)

    const cooldownBar = ((smiteCD/3) * 100)

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

    

    function paladinStatus() {
        if (paladinHealth > 0 && blessStatus === 0) {
            return paladinpic
        } else if (blessStatus) {
            return paladinbless
        } else {
            return paladindead
        }
    }

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

    return (
        <div className={className()}>
            <img 
            className='character-pics'
            src={paladinStatus()}
            alt='paladin pic'
            />
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