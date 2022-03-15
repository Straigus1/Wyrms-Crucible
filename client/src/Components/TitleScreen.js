import React from 'react'
// import useSound from 'use-sound'
// import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import title from '../Images/title-pic.png'
import { useNavigate } from 'react-router-dom'
import ambientSound from '../Music/ambient-theme-capstone-project.mp3'
import ReactAudioPlayer from 'react-audio-player'


function TitleScreen ({player, setPlayer}) {


    const navigate = useNavigate();

    function handleLogoutClick() {
        fetch('/logout', { method: 'DELETE' }).then((r) => {
          if (r.ok) {
            setPlayer(null);
          }
        });
        navigate('/', { replace: true });
      }

    
    
      
    

    return (
        <div id="title-background" className="game-box">
        
            <div id="title-menu">
                <img src={title} id="title" alt="title" />
                {player ? 
                <>
                <h5>Welcome, {player.username}!</h5>
                <Button onClick={() => navigate("/transition-one")}>
                    Start Game
                </Button>
        
                <Button onClick={handleLogoutClick}>
                    Logout
                </Button>
                <Button onClick={() => navigate("/credits")}>
                    Credits
                </Button>
                <Button>Tutorials/Tips</Button>
                </> : 
                <>
                <h5>Have fun!!</h5>
                <Button onClick={() => navigate("/transition-one")}>
                    Play
                </Button>
        
                <Button onClick={() => navigate("/credits")}>
                    Credits
                </Button>
                <Button onClick={() => navigate("/")}>
                    Tutorials (Not Ready)
                </Button>
                <Button onClick={() => navigate("/battle-five")}>
                    ???
                </Button>
                </>}
                <ReactAudioPlayer
                    src={ambientSound}
                    className="music-control-title"
                    controls
                    autoPlay
                    loop
                    volume={0.5}
                /> 
            </div>
        </div>
    )
}

export default TitleScreen