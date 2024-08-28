import { useContext } from 'react';
import { WebsiteContext } from '../context/Context';
import '../styles/navbar.css'
import bgIcon from '../assets/bars-solid.svg'
import MobileNavbar from './MobileNavbar';

function Navbar() {
    const { setMobileNavbar, mobileNavbar, isAuth, signOut } = useContext(WebsiteContext)

    return (<>
        <nav>
            <h2 className="brand">MusicEvents</h2>
            <ul>
                {!isAuth && (<>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                </>)}
                {isAuth && (<>
                    <li><a href="/events">Dashboard</a></li>
                    <li><a href="/add-event">Create Event</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/login" onClick={() => signOut()}>Logout</a></li>
                </>)}
            </ul>
            <img src={bgIcon} alt="burger navegation bar" className='mobile-navbar' onClick={() => setMobileNavbar(prevState => prevState ? false : true)} />
        </nav>
        {mobileNavbar && <MobileNavbar />}
    </>);
}

export default Navbar;