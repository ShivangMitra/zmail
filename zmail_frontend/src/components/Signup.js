
import React, {useRef, useState} from 'react'
import  { Form, Button,Alert} from "react-bootstrap"
import "../styles.css"
import {Link, useHistory} from "react-router-dom"

import axios from '../axios'

export default function Signup() {

    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    // const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true)

            await axios.post('/users/new', {
                name: usernameRef.current.value,
                password: passwordRef.current.value
            })

            history.push("/")}
        catch{
            setError('failed to create an Account')
        }
        setLoading(false)
    }
    return (
        <div className="component-wrapper">

            <div className="component">
                    <h1>Welcome to Zmail</h1>
                    <h2 className = "text-center mb-4"> Sign Up</h2>
                   
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form  onSubmit={handleSubmit} >
                        
                        
                            <Form.Group id ="email">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type= "username" ref= {usernameRef} required/>
                            </Form.Group>

                            <Form.Group id ="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type= "password" ref= {passwordRef} required/>
                            </Form.Group>

                            <Form.Group id ="password-confirmation">
                            <Form.Label>Retype Password</Form.Label>
                            <Form.Control type= "password" ref= {passwordConfirmRef} required/>
                            </Form.Group>

                            <div className="sign-in-div-2">
                                <Button disabled={loading} className = "sign-in-btn" type = "submit">Sign up</Button>
                            </div>
                        
                    </Form>



            <div className ="sign-up-div">Already have an account? <Link to="/login" className="sign-up-link">Log In</Link></div>
        </div></div>
    )
}
