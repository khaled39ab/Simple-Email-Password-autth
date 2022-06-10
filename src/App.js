import './App.css';
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const handleName = e => {
    setName(e.target.value)
  }

  const handleEmail = e => {
    setEmail(e.target.value);
  }

  const handlePassword = e => {
    setPassword(e.target.value);
  }

  const handleRegistered = e => {
    setRegistered(e.target.checked);
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email sent');
      })
  }

  const setUsername = () =>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then (() =>{
      console.log('updating name');
    })
  }

  const handlePasswordReset = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent');
      })
      .catch(err => setError(err.message))
  }

  const handleFormSubmit = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(res => {
          const user = res.user;
          console.log(user);
        })
        .catch(err => {
          console.log(err);
          setError(err.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
          const user = res.user;
          console.log(user)
          setEmail('');
          setPassword('');
          verifyEmail();
          setUsername();
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
        })
    }
    e.preventDefault();
  }

  return (
    <div>
      <div className='registration w-50 mx-auto m-5 border p-3'>
        <h2 className='text-success'>Please {registered ? 'Log In' : 'Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegistered} type="checkbox" label="Already Registered" />
          </Form.Group>
          {!registered && <Form.Group className="mb-3" controlId="formText">
            <Form.Label>Your name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Enter your name" required />
            <Form.Control.Feedback type="invalid">
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <p className='text-danger'>{error}</p>

          {registered ? <div>
            <Button variant="primary" type="submit"> Log In </Button>
            <button onClick={handlePasswordReset} type="button" className="btn btn-link">Forget Password?</button>
          </div> : <Button variant="primary" type="submit"> Register </Button>}
        </Form>
      </div>
    </div>
  );
}

export default App;
