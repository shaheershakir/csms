import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Login() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();


    const onSubmit = async (data) => {
        const { username, password } = data;
        const callbackUrl = router.query.callbackUrl || '/';
        const result = await signIn('credentials', {
            username,
            password,
            callbackUrl,
        });

        if (result.error) {
            console.log('Login failed');
        }
    };

    useEffect(() => {
        const { error, data } = router.query;

        if (error) {
            console.log('Login error:', error);
        } else if (data) {
            console.log('Login successful');
            router.push(data); // Redirect to the callbackUrl or the default route after successful login
        }
    }, [router]);

    const loginContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        borderRadius: '8px',
    };

    const loginCardStyles = {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        width: '300px',
        textAlign: 'center',
    };

    const login_buttonStyles = {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
    };

    return (
        <div style={loginContainerStyles}>
            <div style={loginCardStyles}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Username:
                        <input type="text" {...register('username')} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type='password'
                            {...register('password')}
                            
                            placeholder="Enter your password"
                        />
                    </label>
                    <br />
                    <button type="submit" style={login_buttonStyles}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
