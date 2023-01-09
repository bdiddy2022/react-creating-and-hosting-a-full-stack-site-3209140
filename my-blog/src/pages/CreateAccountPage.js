import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    
    const createAccount = async () => {
        try {
            if(password !== confirmPassword){
                setError('Password must match Conform Password');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch(e) {
            setError(e.message);
        }
    }
    
    return (
        <>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input type="email" value={email} placeholder="Your email address" onChange={e=>setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Create Password" onChange={e=>setPassword(e.target.value)} />
        <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={e=>setConfirmPassword(e.target.value)} />
        <button onClick={createAccount}>Create Account</button>
        <Link to="/login" >Already have an account? Log in here</Link>
        </>
    );
}

export default CreateAccountPage;