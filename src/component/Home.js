import React, { useState, useEffect } from 'react'
import Input from './Input'
import Nav from './Nav'
import Keyboard from './Keyboard.js'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
    apiKey: "AIzaSyBnSUFKp_b6pXdzwtIUuI2W-p-Kz3tH_tc",
    authDomain: "typethai-bf26c.firebaseapp.com",
    projectId: "typethai-bf26c",
    storageBucket: "typethai-bf26c.appspot.com",
    messagingSenderId: "219321509733",
    appId: "1:219321509733:web:d3915dbac3fd01e34fe38c"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


const Home = () => {
    const [Data, setData] = useState([])

    // function getData(Uid) {
    //     firestore.collection('Statistic').doc(Uid)
    //         .onSnapshot((doc) => {
    //             setData(doc.data())
    //         })
    // }

    const [user] = useAuthState(auth)

    function addData(Uid) {
        firestore.collection('Statistic').doc(Uid)
            .set({
                CharacterAccurate: { a: 1 }
            }, { merge: true })
    }

    function addTypeSpeed(Uid, wpm, acc, scr) {
        firestore.collection('Statistic').doc(Uid)
            .update({
                TypeSpeed: firebase.firestore.FieldValue.arrayUnion(wpm),
                Accuracy: firebase.firestore.FieldValue.arrayUnion(acc),
                Score: firebase.firestore.FieldValue.arrayUnion(scr)
            })
    }

    function SignIn(display) {

        const signInWithGoogle = () => {

            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }

        return (
            <div className="signIn" onClick={signInWithGoogle}><img src={display ? "./btn.png" : "./btn_s.png"} alt="" /></div>
        )

    }

    function SignOut(display) {
        return auth.currentUser && (
            <div className="navmenu-item-profile" style={{ width: display ? '' : '70px' }}>
                <div className='profileLink'>
                    <img className='Avatar-customImage' src={auth.currentUser.photoURL} />
                    {display ? <span className="profile-name">{auth.currentUser.displayName} <span>{auth.currentUser.email}</span></span> : null}
                </div>
                <div className="sign-out" onClick={() => auth.signOut()}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-in-alt" class="svg-inline--fa fa-sign-in-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path></svg></div>
            </div>
        )
    }

    return (
        <>
            <div className="Body-container">
                <main className="Body-app">
                    {/* getData={getData} data={Data} */}
                    <Input user={user} currentUser={auth.currentUser} addData={addData} addTypeSpeed={addTypeSpeed} />
                    <Keyboard />
                </main>
            </div>
            <Nav signIn={SignIn} signOut={SignOut} currentUser={auth.currentUser} user={user} />
        </>
    )
}

export default Home
