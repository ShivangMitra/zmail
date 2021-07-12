
import React, {useRef, useState} from 'react'
import  { Form, Button, Card,Alert} from "react-bootstrap"
import "../styles.css"
import {Link} from "react-router-dom"

export default function ForgotPassword() {

    const emailRef = useRef()

    // const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    // async function handleSubmit(e){
    //     e.preventDefault()
        
        

    //     try{
    //         setMessage('')
    //         setError('')
    //         setLoading(true)
    //         //await login(emailRef.current.value, passwordRef.current.value)
    //         await resetPassword(emailRef.current.value)
    //         setMessage("check your inbox for further instructions")}
    //     catch{
    //         setError('failed to reset password')
    //     }
    //     setLoading(false)
    // }
    return (
        <>
            <div className="component">
                    <h2 className = "text-center mb-4">Reset Password</h2>
                   
                    {error && <Alert variant="danger">{error}</Alert> }
                    {message && <Alert variant="success">{message}</Alert> }
                    <Form   >
                        
                        
                            <Form.Group id ="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type= "email" ref= {emailRef} required/>
                            </Form.Group>

                            <Button disabled={loading} className = "w-100 mt-4" type = "submit">Reset Password</Button>
                            <div className ="w-100 text-center mt-3"><Link to="/login">Log in</Link></div>
                        
                    </Form>



            <div className ="w-100 text-center mt-2">Need an Account? <Link to="/signup">Sign Up</Link></div>
        </div></>
    )
}
