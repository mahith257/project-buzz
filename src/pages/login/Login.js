import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import './Login.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isPending, error} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input 
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value = {email}
                        required
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input 
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value = {password}
                        required
                    />
                </label>
                
                {!isPending && <button className='btn'>Login</button>}
                {isPending && <button className='btn' disabled>Loading</button>}
                {error && <div className='error'>{error}</div>}
            </form>
    );
}
