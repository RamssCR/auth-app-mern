import { useContext, useEffect, useState } from 'react'
import { WebsiteContext } from '../context/Context'
import Navbar from '../components/Navbar'
import userImg from '../assets/no-profile-picture-15257.svg'
import '../styles/events_page.css'
import EventCard from '../components/EventCard'

function Events() {
    const { user, events, fetchAllEvents } = useContext(WebsiteContext)
    const [loading, setLoading] = useState('Loading data...')

    setTimeout(() => setLoading('No events to display'), 2000)

    useEffect(() => {
        const getEvents = async () => await fetchAllEvents()
        getEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!user) return

    return (<>
        <Navbar />
        <main className='main-container'>
            <div className="user-container">
                <img src={userImg} alt="user-pic" />
                <span className="username">{user.username}</span>
            </div>
            <div className="title-btn">
                <span className="events-title">Your Events</span>
                <a href="/add-event" className='create-event'>+</a>
            </div>
            <section className="events-container">
                <span className="all-events-title">All Events</span>
                {events.length === 0 ? (
                    <span className="no-events">{loading}</span>
                ) : (
                    <div className="all-events">
                        {events.map((event, index) => (
                            <EventCard event={event} key={index} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    </>);
}

export default Events;