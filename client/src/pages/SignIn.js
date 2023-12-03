import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { Navigate } from "react-router";
import { useSignIn } from "../hooks/useSignIn";

const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const SignIn = () => {
    const loginStatus = useSignIn()

    const [userEmail, setUserEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [passwd, setPasswd] = useState('');
    const [validPasswd, setValidPasswd] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignIn = async(e) => {
        e.preventDefault()

        try{
            const response = await fetch('http://localhost:4000/signin', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: userEmail, password: passwd})
            })
            const res = await response.json()
            if (!res?.access){
                setErrMsg(res?.message)
                return
            }
            setSuccess(true);
        }catch(err){
            console.error(err)
        }
    };

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(userEmail))
    }, [userEmail])

    useEffect(() => {
        setValidPasswd(PASSWORD_REGEX.test(passwd))
    }, [passwd])

    useEffect(() => {
        ((userEmail && passwd) && (!validEmail || !validPasswd)) ? setErrMsg('Username or password is invalid') : setErrMsg('')
    }, [validEmail, validPasswd, userEmail, passwd])

    useEffect(() => {
        setSuccess(loginStatus)
    }, [])

    return (
        <div style={{display: "grid", placeItems: 'center', height: '100vh'}}>
            { success ? (<Navigate to={'/'}/>)
            : (
            <div style={{display: 'grid', placeItems: 'center', paddingTop: '20px', 
                paddingBottom: '30px', backgroundColor: '#eeeeee', paddingLeft: '30px', paddingRight: '30px', borderRadius: '5px'}}>
                <form onSubmit={handleSignIn}>
                    {errMsg && <p aria-live='assertive'>{errMsg}</p>}
                    <h4 className='mb-3 text-center'>Log-In</h4>
                    <label htmlFor='email' className='mb-1'>
                        Email: 
                    </label><br/>
                    <input type='email' id='email' onChange={(e)=>{setUserEmail(e.target.value)}} required
                    className='mb-3' style={{width: '220px'}}/><br/>

                    <label htmlFor='password' className='mb-1'>
                        Password:   
                    </label><br/>
                    <input type='password' id='password' onChange={(e) => {setPasswd(e.target.value)}} 
                    aria-details ='Enter your password' className='mb-3' required style={{width: '220px'}}/><br/>

                    <Button disabled={errMsg || !validEmail || !validPasswd} variant='secondary' size='md' type="submit">
                        Sign In
                    </Button>
                </form>
            </div> )}
        </div>
    );
};