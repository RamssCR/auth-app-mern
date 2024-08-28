import { axios_configuration } from './axios_config'

// Auth
export const registerRequest = async user => await axios_configuration.post(`/register`, user)
export const loginRequest = async user => await axios_configuration.post(`/login`, user)
export const verifyToken = async () => await axios_configuration.get(`/validateToken`)

// Events
export const getAllEvents = async () => await axios_configuration.get(`/events`)
export const getEvent = async id => await axios_configuration.get(`/events/${id}`)
export const createEvent = async event => await axios_configuration.post(`/events`, event)
export const deleteEvent = async id => await axios_configuration.delete(`/events/${id}`)
export const updateEvent = async (id, input) => await axios_configuration.patch(`/events/${id}`, input)