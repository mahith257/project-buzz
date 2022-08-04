import './Navbar.css'

import {Link} from 'react-router-dom'
import Pblogo from '../assets/pblogo.jpg'

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {

    const {logout, isPending} = useLogout()
    const {user} = useAuthContext()

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Pblogo} alt='logo' />
                    <span>Project Buzz</span>
                </li>
                {!user && (
                    <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                    </>
                )}
                {user && (
                    <li>
                        {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                        {isPending && <button className='btn' disabled>Loading</button>}
                    </li>
                )}
            </ul>
        </div>
    );
}
