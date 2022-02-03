import {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import { Form } from "react-bootstrap";


function SignupPage ({player, setPlayer}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            password_confirmation: passwordConfirmation,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((player) => setPlayer(player));
            navigate('/', { replace: true })
          } else {
            setErrorMessage('This account already exists!')
          }
        });
      }

      return (
          <div id="signup-background" className="game-box">
            <div className="signup-menu">
            <Form className='signUpForm' onSubmit={handleSubmit}>
              <h3 className='signup-header'>Sign Up</h3>
              <Form.Label className='signup-label'>Username</Form.Label>
              <Form.Control
                type='text'
                autoComplete='off'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Label className='signup-label'>Email</Form.Label>
              <Form.Control
                type='text'
                autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Form.Label className='signup-label'>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
              />
              <Form.Label className='signup-label'>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete='current-password'
              />
              <Button className='signUpButton' type='submit'>Sign Up</Button>
              {errorMessage ? (<p className='errorMessage'>{errorMessage}</p>) : null}
      </Form>
            </div>
          </div>
      )
}

export default SignupPage