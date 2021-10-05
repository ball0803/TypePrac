import React from 'react'
import { useState, useEffect } from 'react'
import fire from './fire'

const Login = (props) => {
    const [User, setUser] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [PasswordError, setPasswordError] = useState('')
    const [EmailError, setEmailError] = useState('')
    const [HasAccount, setHasAccount] = useState(false)

    const clearInput = () => {
        setEmail('')
        setPassword('')
    }

    const clearError = () => {
        setEmailError('')
        setPasswordError('')
    }

    const handleSignIn = () => {
        clearError()
        fire
            .auth()
            .signInWithEmailAndPassword(Email, Password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-diabled":
                    case "auth/user-not-found":
                        setEmailError(err.massage);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.massage);
                        break;
                }
            })
    }

    const handleSignUp = () => {
        clearError()
        fire
            .auth()
            .createUserWithEmailAndPassword(Email, Password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.massage);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.massage);
                        break;
                }
            })
    }

    const handleLogout = () => {
        fire.auth().signOut();
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            } else {
                setUser('')
            }
        })
    }

    useEffect(() => {
        authListener()
    }, [])

    return (
        <>
            <h1>Sign up</h1>
            <form>
                <label>Gmail</label>
                <input type="email"
                    autoFocus
                    required
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                />
                <p className="errorMassage">{EmailError}</p>
                <label>password</label>
                <input type="password"
                    autoFocus
                    required
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="errorMassage">{PasswordError}</p>
                <button onClick={handleSignUp}>Sign in</button>
            </form>
        </>
    )
}

export default Login
