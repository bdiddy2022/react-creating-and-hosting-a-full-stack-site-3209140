import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const logIn = async () => {
        try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        navigate('/articles');
        } catch(e) {
            setError(e.message);
        }
    }
    return (
        <>
        <h1>Log In</h1>
        {error && <p className="error">{error}</p>}
        <input type="email" value={email} placeholder="Your email address" onChange={e=>setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Create Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={logIn}>Log In</button>
        <Link to="/create-account" >No account? Create one here</Link>
        </>
    );
}

export default LoginPage;