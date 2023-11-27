import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

export const Register = () => {
    const [userEmail, setUserEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [userEmailFocus, setUserEmailFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [passwd, setPasswd] = useState('');
    const [validPasswd, setValidPasswd] = useState(false);
    const [passwdFocus, setPasswdFocus] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState('');
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:4000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ firstName: firstName, email: userEmail, password: passwd }),
            });
            const res = await response.json()

            if (response.ok) {
                setSuccess(true);
            } else {
                setErrMsg(res?.message);
            }
          } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(userEmail))
    }, [userEmail])

    useEffect(() => {
        setValidFirstName(firstName.length >= 3);
    }, [firstName])

    useEffect(() => {
        setValidPasswd(PASSWORD_REGEX.test(passwd));
        setValidConfirmPwd(passwd === confirmPwd);
    }, [passwd, confirmPwd])

    useEffect(() => {
        setErrMsg('');
    }, [userEmail, firstName, passwd, confirmPwd])

    return(
        <div style={{display: "grid", placeItems: 'center', height: '100vh'}}>
        {success ? (
            <Navigate to={'/'}/>
        ) : (
        <div style={{display: 'grid', placeItems: 'center', borderRadius: '10px', paddingTop: '20px', 
        paddingBottom: '30px', backgroundColor: '#eeeeee', paddingLeft: '45px', paddingRight: '45px'}} >
            {errMsg && <p aria-live='assertive'>{errMsg}</p>}
            <h4 className='mb-3'>Register</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email' className='mb-1'>
                    Email: 
                    {validEmail && <span><CheckIcon fontSize='sm' style={{ color: 'green' }}/></span>}
                    {(!validEmail && userEmail) && <span><CloseIcon fontSize='sm' style={{ color: 'red' }}/></span>}
                </label><br/>
                <input type='email' id='email' onChange={(e)=>{setUserEmail(e.target.value)}} required aria-invalid={validEmail ? "false" : "true"} 
                onFocus={() => {setUserEmailFocus(true)}} onBlur={() => setUserEmailFocus(false)} className='mb-3' style={{width: '250px'}} value={userEmail}/><br/>

                <label htmlFor='firstname' className='mb-1'>
                    First Name: 
                    {validFirstName && <span><CheckIcon fontSize='sm' style={{ color: 'green' }}/></span>}
                    {(!validFirstName && firstName) && <span><CloseIcon fontSize='sm' style={{ color: 'red' }}/></span>}  
                </label><br/>
                <input type='text' id='firstname' 
                onChange={(e)=>{setFirstName(e.target.value)}} required aria-invalid={validFirstName ? "false" : "true"} 
                aria-describedby='firstnote' onFocus={() => {setFirstNameFocus(true)}} onBlur={() => setFirstNameFocus(false)} className='mb-3' style={{width: '250px'}}/>
                {(firstNameFocus && firstName && !validFirstName) && <p id='firstnote' style={{maxWidth: '250px', maxHeight: '150px', backgroundColor: 'black', color: 'white'}}
                className='p-2 rounded-3'>
                    <InfoIcon/>{" "}
                    Name should be 3<br/> or more characters
                </p>}<br/>

                <label htmlFor='password' className='mb-1'>
                    Password: 
                    {validPasswd && <span><CheckIcon fontSize='sm' style={{ color: 'green' }}/></span>}
                    {(!validPasswd && passwd) && <span><CloseIcon fontSize='sm' style={{ color: 'red' }}/></span>}  
                </label><br/>
                <input type='password' id='password' 
                onChange={(e) => {setPasswd(e.target.value)}} required aria-invalid={validPasswd ? "false" : "true"} 
                aria-describedby='pnote' onFocus={() => {setPasswdFocus(true)}} onBlur={() => setPasswdFocus(false)} className='mb-3' style={{width: '250px'}}/>
                {(passwdFocus && !validPasswd) && <p id='pnote' style={{maxWidth: '250px', maxHeight: '150px', backgroundColor: 'black', color: 'white'}}
                className='p-2 rounded-3'>
                    <InfoIcon/>{" "}
                    8 - 24 characters.<br/>Must include uppercase and lowercase letters, a number and a special character.<br/>
                </p>}<br/>

                <label htmlFor='confirm-pwd' className='mb-1'>
                    Confirm Password: 
                    {(validPasswd && validConfirmPwd && confirmPwd) && <span><CheckIcon fontSize='sm' style={{ color: 'green' }}/></span>}
                    {(validPasswd && confirmPwd && !validConfirmPwd) && <span><CloseIcon fontSize='sm' style={{ color: 'red' }}/></span>}  
                </label><br/>
                <input type='password' id='confirm-pwd' 
                onChange={(e) => {setConfirmPwd(e.target.value)}} required aria-invalid={validConfirmPwd ? "false" : "true"} 
                aria-describedby='confirmPnote' onFocus={() => {setConfirmPwdFocus(true)}} onBlur={() => setConfirmPwdFocus(false)} className='mb-3' style={{width: '250px'}}/>
                {(confirmPwdFocus && !validConfirmPwd) && <p id='confirmPnote' style={{maxWidth: '250px', maxHeight: '150px', backgroundColor: 'black', color: 'white'}}
                className='p-2 rounded-3'>
                    <InfoIcon/>{" "}
                    {validPasswd ? (<>Must match the initial password<br/></>) : 
                        (<>Initial password doesn't meet requirements<br/></>)
                    }
                </p>}<br/>

                
                <Button disabled={!validEmail || !firstName || !validConfirmPwd || !validPasswd || errMsg} variant='secondary' size='md' type='submit'>
                    Sign Up
                </Button><br/><br/>

                Already registered?<br/>
                <span>
                    <Link to={'/signin'}>Sign In</Link>
                </span>
            </form>
        </div>
        )}
        </div>
    );
};