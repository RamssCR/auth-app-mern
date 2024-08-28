import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import '../styles/register-login.css'
import { WebsiteContext } from '../context/Context'

function Register() {
    const { register, handleSubmit, formState: {errors} } = useForm()
    const { signUp, isAuth, reqErrors } = useContext(WebsiteContext)
    const navigateTo = useNavigate()

    useEffect(() => {
        if (isAuth) navigateTo('/events')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    return (<div className='login-body'>
        <main className="login-container"></main>
        <Navbar />
        <form method="post" className='form-sign' onSubmit={handleSubmit(async (values) => {
            await signUp(values)
        })}>
            <h2 className="form-title">Register</h2>
            {reqErrors && reqErrors.map((error, index) => (
                <span className="error" key={index}>{error}</span>
            ))}
            <article className="form-inputs">
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register('username', { required: true })} placeholder="i.e ramona_01" />
                    {errors.username && (
                        <p style={{color: '#fd1291', fontSize: '0.9em'}}>Username is required</p>
                    )}
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" {...register('email', { required: true })} placeholder="i.e ramona_clark1@example.com" />
                    {errors.email && (
                        <p style={{color: '#fd1291', fontSize: '0.9em'}}>Email is required</p>
                    )}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register('password', { required: true })} placeholder="i.e 00000000" />
                    {errors.password && (
                        <p style={{color: '#fd1291', fontSize: '0.9em'}}>Password is required</p>
                    )}
                </div>
                <input type="submit" name="send" value="Register" />
            </article>
        </form>

        <span className="copyright">Copyright 2024. Musicevents</span>
    </div>);
}

export default Register;