import { createContext, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { 
    registerRequest, 
    loginRequest, 
    getAllEvents, 
    verifyToken,
    createEvent,
    deleteEvent,
    getEvent,
    updateEvent
} from '../api/requests'

export const WebsiteContext = createContext() 

// eslint-disable-next-line react/prop-types
export function ContextProvider({children}) {
    const [mobileNavbar, setMobileNavbar] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [reqErrors, setReqErrors] = useState([])
    const [loading, setLoading] = useState(true)

    // events states
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState({})

    // fetching all events
    const fetchAllEvents = async () => {
        const res = await getAllEvents()
        setEvents(res.data.events)
    }


    // creating an event
    const createAnEvent = async event => {
        try {
            const request = await createEvent(event)
            if (request.data.createdEvent) return true
        } catch (error) {
            setReqErrors(error.response.data)
        }
    }

    // deleting an event
    const removeEvent = async id => {
        try {
            const response = await deleteEvent(id)
            if (response.data.message) setEvents(events.filter(event => event._id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    // getting one event
    const fetchEvent = async id => {
        try {
            const response = await getEvent(id)
            setEvent(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    // patching an event
    const patchEvent = async (id, input) => {
        try {
            const response = await updateEvent(id, input)
            if (response.data.modifiedEvent) return true
        } catch (error) {
            setReqErrors(error.response.data)
        }
    }

    // Validating cookie
    useEffect(() => {
        const cookies = Cookie.get()

        if (!cookies.token) {
            setIsAuth(false)
            setUser(null)
            setLoading(false)
            return
        }

        const checkLogin = async () => {
            try {
                const res = await verifyToken(cookies.token)
                if (!res.data) setIsAuth(false)

                setIsAuth(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuth(false)
                setUser(null)
            }
        }

        checkLogin()
    }, [])

    const signUp = async user => {
        try {
            const res = await registerRequest(user)
            setUser(res.data.user)
            setIsAuth(true)
        } catch (error) {
            setReqErrors(error.response.data)
        }
    }

    const signIn = async user => {
        try {
            const res = await loginRequest(user)
            setUser(res.data.user)
            setIsAuth(true)
        } catch (error) {
            setReqErrors(error.response.data)
        }
    }

    const signOut = () => {
        Cookie.remove('token')
        setIsAuth(false)
        setUser(null)
    }

    return <WebsiteContext.Provider value={{
        mobileNavbar, 
        setMobileNavbar,
        user,
        signUp,
        signIn,
        events,
        isAuth,
        reqErrors,
        loading,
        fetchAllEvents,
        createAnEvent,
        signOut,
        removeEvent,
        fetchEvent,
        event,
        patchEvent
    }}>
        {children}
    </WebsiteContext.Provider>
}