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
                <h5>Please Login</h5>
                <Button onClick={() => navigate("/login")}>
                    Login
                </Button>
        
                <Button onClick={() => navigate("/signup")}>
                    Signup
                </Button>
                <Button onClick={() => navigate("/credits")}>
                    Credits
                </Button>
                <Button onClick={() => navigate("/transition-one")}>
                    Tutorials/Tips
                </Button>
                </>}
                <ReactAudioPlayer
                    src={ambientSound}
                    className="music-control-title"
                    controls
                    autoPlay
                    loop
                    volume={0.3}
                /> 
            </div>
        </div>
    )
}

export default TitleScreen