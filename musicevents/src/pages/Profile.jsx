import Navbar from "../components/Navbar"
import userImg from '../assets/no-profile-picture-15257.svg'
import envelopeIcon from '../assets/envelope-regular.svg'
import userIcon from '../assets/user-regular.svg'
import { useContext } from "react"
import { WebsiteContext } from "../context/Context"
import '../styles/profile.css'

function Profile() {
    const { user } = useContext(WebsiteContext)
    if (!user) return
        
    return (
        <>
            <Navbar />
            <main className='main-profile-container'>
                <article className='profile-card'>
                    <h2 className='profile-header'>Profile Info</h2>
                    <div className='pfp-container'>
                        <img src={userImg} alt='user image' />
                        <div className="user-short-details">
                            <span className='username'>{user.username}</span>
                            <span className="role">Events Administrator</span>
                        </div>
                    </div>
                    <div className="additional-info">
                        <h2>Additional Info</h2>
                        <div className="info-group">
                            <img src={envelopeIcon} alt="email" />
                            <span className="info-text">{user.email}</span>
                        </div>
                        <div className="info-group">
                            <img src={userIcon} alt="email" />
                            <span className="info-text">Administrator</span>
                        </div>
                    </div>
                    <div className="options">
                        <button>Logout</button>
                        <button>Delete Account</button>
                    </div>
                </article>
            </main>
        </>
    );
}

export default Profile;