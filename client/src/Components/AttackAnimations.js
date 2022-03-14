import {useEffect} from 'react'
import bloodSplatter from '../AnimationImages/blood-splatter.png'
import shuriken from '../AnimationImages/shuriken.png'
import rightSlash from '../AnimationImages/right-slash.png'
import leftSlash from '../AnimationImages/left-slash.png'
import lightningBolt from '../AnimationImages/lightning-bolt.png'
import divineSmite from '../AnimationImages/divine-smite.png'


function AttackAnimations({actionAnimate, setActionAnimate}) {

    useEffect(() => {
        let element = document.getElementById('animation-box')

        function setAnimate(className, image, duration) {
            let animation = document.createElement("IMG")
            animation.className = className
            animation.src = image
            element.appendChild(animation)

            setTimeout(() => {
                animation.remove()
            }, duration)
        }

        switch(actionAnimate) {
            case 'Phantom Assault':
                setAnimate('animate-shuriken', shuriken, 1000)
                setAnimate('animate-right-slash', rightSlash, 1500)
                setAnimate('animate-left-slash', leftSlash, 1500)
                setAnimate('animate-blood-splatter', bloodSplatter, 2000)
                break
            case 'Lightning Bolt':
                setAnimate('animate-lightning-bolt', lightningBolt, 1000)
                break
            case 'Divine Smite':
                setAnimate('animate-divine-smite', divineSmite, 1200)
                break
            case 'Attack':
                setAnimate('animate-attack')
                break
            case 'Fire Bolt':
                setAnimate('animate-fire-bolt')
                break
            case 'Venomous Strike':
                setAnimate('animate-venomous-strike')
                break
            case 'Magic Missile':
                setAnimate('animate-magic-missile')
                break
            default:
                console.log('No Animation')
        } 
        
        setActionAnimate('')         
        
    
    }, [actionAnimate, setActionAnimate])
    // When function goes off, render div/image with animation
    return (
        <div id='animation-box'>  </div>
    )
}

export default AttackAnimations