import { Link, useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useUser from './hooks/useUser';
import { getAuth } from 'firebase/auth';

const NavBar = () => {
    const navigate = useNavigate();
    const {user, isLoading} = useUser();
    const logOut = () => {
        signOut(getAuth());
        navigate('/')
    }
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
                <li>
                {user
                    ?<button onClick={logOut}>Sign Out</button>
                    :<Link to='/login'>Log In</Link>
                }
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;