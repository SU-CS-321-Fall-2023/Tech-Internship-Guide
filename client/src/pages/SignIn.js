import React from "react";
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { Navigate } from "react-router";

export const SignIn = () => {
    const [validLogin, setValidLogin] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [passwd, setPasswd] = useState('');
    const [validPasswd, setValidPasswd] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignIn = async(e) => {
        e.preventDefault()

    };

    return (
        <div style={{display: "grid", placeItems: 'center', height: '100vh'}}>
            { success ? (<Navigate to={'/'}/>)
            : (
            <div style={{width: '21vw', display: 'grid', placeItems: 'center', borderRadius: '20px', paddingTop: '20px', 
                paddingBottom: '30px', backgroundColor: '#eeeeee'}}>
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

                    <Button disabled={!userEmail || !validPasswd} variant='secondary' size='md' type="submit">
                        Sign In
                    </Button>
                </form>
            </div> )}
        </div>
    );
};