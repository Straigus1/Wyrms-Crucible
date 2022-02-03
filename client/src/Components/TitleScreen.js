import React from 'react'
// import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import title from '../Images/Group 107.png'




function TitleScreen () {
    return (
<div id="title-background" className="game-box">
    <div id="title-menu">
        <img src={title} id="title" alt="title" />
        <Button>Login</Button>
        
        <Button>Signup</Button>

  

        <Button>Credits</Button>
        <Button>Tutorials/Tips</Button>




    </div>
</div>
    )
}

export default TitleScreen