import z from 'zod'

const eventSchema = z.object({
    title: z.string({
        required_error: 'A title is required for this event'
    }).min(8, {
        message: 'Title must contain more than 8 characters'
    }),
    description: z.string({
        required_error: 'A description is required for this event'
    }).min(8, {
        message: 'Description must contain more than 8 characters'
    }),
    place: z.string({
        required_error: 'A place is required for this event'
    }).min(4, {
        message: 'Title must contain more than 4 characters'
    }).default('Sin definir'),
    date: z.string({
        required_error: 'A date is required for this event'
    }),
    hour: z.string({
        required_error: 'An hour is required for this event'
    })
})

export function validateEvent(object) {
    return eventSchema.safeParse(object)
}

export function partiallyValidateEvent(object) {
    return eventSchema.partial().safeParse(object)
}