import React from 'react'
// import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import title from '../Images/Group 107.png'
import { useHistory } from 'react-router-dom'




function TitleScreen ({player, setPlayer}) {

    const history = useHistory();

    function handleClick(path) {
        history.push(path)
    }
    return (
<div id="title-background" className="game-box">
    <div id="title-menu">
        <img src={title} id="title" alt="title" />
        <Button
            onClick={() => handleClick("/login")} 
            >Login</Button>
        
        <Button
            onClick={() => handleClick("/signup")} 
            >Signup</Button>

  

        <Button>Credits</Button>
        <Button>Tutorials/Tips</Button>




    </div>
</div>
    )
}

export default TitleScreen