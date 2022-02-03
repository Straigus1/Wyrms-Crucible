import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';


function LoginPage ({player, setPlayer}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((player) => setPlayer(player));
        navigate('/account', { replace: true });
      } else {
        setErrorMessage('Incorrect username or password.')
      }
    });
  }

  return (
    <div id="login-background" className='game-box' >
      <div className='signup-menu' >
      <Form className='loginForm' onSubmit={handleSubmit}>
        <h3 className='signup-header'>Player Login</h3>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Username:</Form.Label>
          <Form.Control 
          type='text'
          placeholder='Enter Username'
          autoComplete='off'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
          type='password'
          placeholder='Enter Password'
          autoComplete='off'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button className="loginButton" variant='primary' type='submit'>Submit</Button>
        {errorMessage ? (<p className='errorMessage'>{errorMessage}</p>) : null}
      </Form>
      </div>
    </div>
  )
}

export default LoginPage