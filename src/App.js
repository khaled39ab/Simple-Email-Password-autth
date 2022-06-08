import './App.css';
import app from './firebase.init';
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

function App() {
  const handleEmail = e =>{
    console.log(e.target.value);
  }

  const handlePassword = e =>{
    console.log(e.target.value);
  }

  const handleFormSubmit = e =>{
    e.preventDefault();
  }

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input onBlur={handleEmail} type="email" name="" id="" />
        <br />
        <input onBlur={handlePassword} type="password" name="" id="" />
        <br />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}

export default App;
