import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import userImg from '../assets/no-profile-picture-15257.svg'
import { WebsiteContext } from '../context/Context'
import '../styles/create-event.css'

function UpdateEvent() {
    const { user, patchEvent, fetchEvent, event, reqErrors } = useContext(WebsiteContext)
    const { register, setValue, handleSubmit, formState: {errors} } = useForm()
    const id = document.documentURI.split('/')[4]

    useEffect(() => {
        const fetch = async () => await fetchEvent(id)
        fetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetch = async () => {
            setValue('title', event.title)
            setValue('description', event.description)
            setValue('place', event.place)
    
            const splittedDBDate = await event.date.split('/')
            const original_format_date = `${splittedDBDate[2]}-${splittedDBDate[1]}-${splittedDBDate[0]}`
    
            setValue('date', original_format_date)
            setValue('hour', event.hour.slice(0, -2))
        }

        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event])

    const navigateTo = useNavigate()
    if (!user) return

    const onSubmit = async (createdEvent) => {

        // building date format (dd-mm-yyyy)
        const splittedDate = createdEvent.date.split("-")
        const formattedDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
        
        // building hour format
        const splittedHour = createdEvent.hour.split(":")
        const modifiedHour = parseInt(splittedHour[0]) <= 12 ? splittedHour[0] : parseInt(splittedHour[0]) - 12
        const formattedHour = `${modifiedHour}:${splittedHour[1]}${parseInt(splittedHour[0]) <= 11 ? 'AM' : 'PM'}`
        
        createdEvent.date = formattedDate
        createdEvent.hour = formattedHour
        createdEvent.user = user.id

        const response = await patchEvent(id, createdEvent)
        if (response) navigateTo('/events')
    }

    return (
        <>
            <Navbar />
            <main className='creator-container'>
                <div className="user-container">
                    <img src={userImg} alt="user-pic" />
                    <span className="username">{user.username}</span>
                </div>
                <form className='event-form' action='' method='post' onSubmit={handleSubmit(async (values) => {
                    await onSubmit(values)
                })}>
                    <h2 className='form-title'>Update Event</h2>
                    {reqErrors && reqErrors.map((error, index) => <span className='error' key={index}>{error}</span>)}
                    <div className='controllers-container'>
                        <div className='controller-group'>
                            <label htmlFor='title'>Title</label>
                            <input type="text" id='title' {...register('title', { required: true })} placeholder='Add a title...' />
                            {errors.title && (
                                <p style={{color: '#fe1260', fontSize: '0.9em'}}>Title is required</p>
                            )}
                        </div>
                        <div className="controller-group">
                            <label htmlFor='desc'>Description</label>
                            <textarea id='desc' {...register('description', { required: true })} placeholder='Add a description...' ></textarea>
                            {errors.description && (
                                <p style={{color: '#fe1260', fontSize: '0.9em'}}>Description is required</p>
                            )}
                        </div>
                        <div className="controller-group">
                            <label htmlFor='place'>Place</label>
                            <input type="text" id='place' {...register('place', { required: true })} placeholder='Add a place...' />
                            {errors.place && (
                                <p style={{color: '#fe1260', fontSize: '0.9em'}}>Place is required</p>
                            )}
                        </div>
                        <div className="date-time-container">
                            <div className="controller-group">
                                <label htmlFor='date'>Date</label>
                                <input type="date" id='date' {...register('date', { required: true })} />
                                {errors.date && (
                                    <p style={{color: '#fe1260', fontSize: '0.9em'}}>Date is required</p>
                                )}
                            </div>
                            <div className="controller-group">
                                <label htmlFor='hour'>Hour</label>
                                <input type="time" id='hour' {...register('hour', { required: true })} />
                                {errors.hour && (
                                    <p style={{color: '#fe1260', fontSize: '0.9em'}}>Hour is required</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="btns-group">
                        <button>Update</button>
                        <button><a href="/events">Cancel</a></button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default UpdateEvent;