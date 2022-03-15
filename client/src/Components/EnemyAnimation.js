import {useEffect} from 'react'
import dragonBreathOuter from '../AnimationImages/dragon-breath-outer.png'
import meteorFall from '../AnimationImages/meteor-fall.png'
import meteorAftermath from '../AnimationImages/meteor-aftermath.png'
import electricSurge from '../AnimationImages/electric-surge.png'


function EnemyAnimations({enemyAnimate, setEnemyAnimate}) {

    useEffect(() => {
        let element = document.getElementById('enemy-animation-box')

        function setAnimate(className, image, duration) {
            let animation = document.createElement("IMG")
            animation.className = className
            animation.src = image
            element.appendChild(animation)

            setTimeout(() => {
                animation.remove()
            }, duration)
        }

        switch(enemyAnimate) {
            case 'Dragon Breath':
                setAnimate('animate-dragon-breath-outer', dragonBreathOuter, 4000)
                break
            case 'Meteor':
                setAnimate('animate-meteor-fall', meteorFall, 1600)
                setAnimate('animate-meteor-aftermath', meteorAftermath, 4000)
                break
            case 'Electric Surge':
                setAnimate('animate-electric-surge', electricSurge, 2000)
                break
            case 'Attack':
                setAnimate('animate-attack')
                break
            default:
                console.log('No Animation')
        } 
        
        setEnemyAnimate('')         
        
    
    }, [enemyAnimate, setEnemyAnimate])
    // When function goes off, render div/image with animation
    return (
        <div id='enemy-animation-box'>  </div>
    )
}

export default EnemyAnimations