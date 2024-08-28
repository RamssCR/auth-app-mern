/* eslint-disable react/prop-types */
import calendarIcon from '../assets/calendar-solid.svg'
import locationIcon from '../assets/location-dot-solid.svg'
import clockIcon from '../assets/clock-regular.svg'
import '../styles/event_card.css'
import { useContext } from 'react'
import { WebsiteContext } from '../context/Context'

function EventCard({ event }) {
    const { removeEvent } = useContext(WebsiteContext)

    return (
        <article className="event">
            <header className='event-header'>
                <img src={calendarIcon} alt="event" />
                <span className='event-name'>{event.title}</span>
            </header>
            <div className="event-details">
                <div className="details-group">
                    <img src={locationIcon} alt="location" />
                    <span className="event-details-info">{event.place}</span>
                </div>
                <div className="details-group">
                    <img src={clockIcon} alt="date" />
                    <span className="event-details-info">{event.date}</span>
                </div>
                <div className="details-group">
                    <img src={clockIcon} alt="hour" />
                    <span className="event-details-info">{event.hour}</span>
                </div>
            </div>
            <div className="btns-group">
                <a href={`/event/${event._id}`}>View</a>
                <button className='btn-publish' onClick={async () => removeEvent(event._id)}>Delete</button>
            </div>
        </article>
    );
}

export default EventCard;