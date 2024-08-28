import { useContext, useEffect } from "react"
import { WebsiteContext } from "../context/Context"
import userImg from '../assets/no-profile-picture-15257.svg'
import Navbar from "../components/Navbar"
import '../styles/view-event.css'

function ViewEvent() {
    const { user, fetchEvent, event, removeEvent } = useContext(WebsiteContext)

    useEffect(() => {
        const fetch = async () => await fetchEvent(document.documentURI.split('/')[4])
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!user) return

    return (
        <>
            <Navbar />
            <main className="main-container">
                <div className="user-container">
                    <img src={userImg} alt="user-pic" />
                    <span className="username">{user.username}</span>
                </div>
                <div className="title-btn">
                    <span className="events-title">{event.title}</span>
                </div>
                <section className="events-container" style={{width: '38em', margin: 'auto'}}>
                    <span className="all-events-title">Event Details</span>
                    <div className="details-container">
                        <div className="detail-group">
                            <span className="detail-title">About</span>
                            <span className="detail-desc">- {event.description}</span>
                        </div>
                        <div className="detail-group">
                            <span className="detail-title">Place</span>
                            <span className="detail-desc">- {event.place}</span>
                        </div>
                        <div className="detail-group">
                            <span className="detail-title">Date</span>
                            <span className="detail-desc">- {event.date}</span>
                        </div>
                        <div className="detail-group">
                            <span className="detail-title">Hour</span>
                            <span className="detail-desc">- {event.hour}</span>
                        </div>
                        <div className="options">
                            <a href={`/events/${event._id}`}>Edit</a>
                            <a href={`/events`} onClick={async () => await removeEvent(event._id)}>Delete</a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ViewEvent;