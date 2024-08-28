import { useContext } from 'react';
import '../styles/mobile-navbar.css'
import { WebsiteContext } from '../context/Context';

function MobileNavbar() {
    const { isAuth, signOut } = useContext(WebsiteContext)

    return (
        <div className='mobile-nv'>
            {!isAuth && (
                <>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                </>
            )}
            {isAuth && (
                <>
                    <li><a href="/events">Dashboard</a></li>
                    <li><a href="/add-event">Create Event</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/login" onClick={() => signOut()}>Logout</a></li>
                </>
            )}
        </div>
    );
}

export default MobileNavbar;