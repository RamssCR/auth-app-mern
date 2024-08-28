import z from 'zod'

const registerSchema = z.object({
    username: z.string({
        required_error: 'username must not be empty'
    }).min(4, {
        message: 'username must contain at least 4 digits'
    }),
    email: z.string({
        required_error: 'email must not be empty'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'password must not be empty'
    }).min(8, {
        message: 'password must contain at least 8 digits'
    })
})

export function validateRegistration(object) {
    return registerSchema.safeParse(object)
}

export function validateLoginData(object) {
    return registerSchema.partial().safeParse(object)
}