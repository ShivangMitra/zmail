
import React, {useRef, useState} from 'react'
import  { Form, Button,Alert} from "react-bootstrap"
import "../styles.css"
import {Link, useHistory} from "react-router-dom"

import axios from '../axios'
import firebase from 'firebase'



export default function Login() {

        function onSubmit(){
                var provider = new firebase.auth.GoogleAuthProvider();

                firebase.auth()
                .signInWithPopup(provider)
                .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
                }).catch((error) => {
                        console.log(error)
                });
        }

    const usernameRef = useRef()
    const passwordRef = useRef()

    // const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    

    async function handleSubmit(e){
        e.preventDefault()
        
        try{
            setError('')
            setLoading(true)
            var user_data
            await axios.get(`/users/fetch?name=${usernameRef.current.value}`)
                .then(response => {
                user_data = response.data
                })

                if(user_data[0]["password"] === passwordRef.current.value){
                        localStorage.setItem("username", usernameRef.current.value)
                        history.push("/")
                }
                else{
                        setError('wrong password')
                }
        }
        catch{
            setError('failed to sign in')
        }
        setLoading(false)
    }
    return (    
            <div className="component-wrapper">

            <div className="component">
                    <h1>Welcome to Zmail</h1>
                   
                    {error && <Alert variant="danger">{error}</Alert> }
                    <Form  onSubmit={handleSubmit}>
                        
                        
                            <Form.Group id ="email">
                            <Form.Label>Username</Form.Label>
                            <Form.Control className="email-form" type= "username" id="username" ref= {usernameRef} required/>
                            </Form.Group>

                            <Form.Group id ="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type= "password" ref= {passwordRef} required/>
                            </Form.Group>

                                <div className="sign-in-div">
                                        <Button disabled={loading} className = "sign-in-btn" type = "submit">Sign In</Button>
                                        <h2 className="divider">OR</h2>
                                        <Button className = "sign-in-btn" variant="outline-primary" onClick={onSubmit}>Sign In with Google</Button>
                                </div>
                            {/* <div className ="w-100 text-center mt-3"><Link to="/forgot-password">Forgot Password?</Link></div> */}
                        
                    </Form>
        
     
            <div className ="sign-up-div">Need an Account? <Link to="/signup" className="sign-up-link">Sign Up</Link></div>
            </div>
            </div>
    )
}
