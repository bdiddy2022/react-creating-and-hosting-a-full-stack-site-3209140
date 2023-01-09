import { Link, useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useUser from './hooks/useUser';

const NavBar = () => {
    const navigate = useNavigate();
    const {user, isLoading} = useUser();
    const logOut = () => {
        signOut(user);
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
                {user &&
                <li>
                    <button onClick={logOut}>Sign Out</button>
                </li>
                }
            </ul>
        </nav>
    );
}

export default NavBar;