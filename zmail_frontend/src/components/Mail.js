import React from 'react'
import { useState, useEffect } from 'react'
import {useHistory} from "react-router-dom"
import axios from '../axios'

import './Mail.css'

function Mail() {

    const history = useHistory()

    const [isLoading, setLoading] = useState(true);
    const [maildata, setMaildata] = useState();

    useEffect(() => {
        axios.get(`/mail/fetch?from=${localStorage.getItem("username")}`)
        .then(response => {
        setMaildata(response.data);
        setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {!(localStorage.getItem("username")) ? history.push("/login") : (
                <div className="container">
                    <h1>Scheduled Mails</h1>
                    {
                        maildata.map((mail) => (
                            <div className="mail-container">
                                <div className="mail-contents">
                                    <div className="mail-details">
                                        <div>To:</div>
                                        <div>Cc:</div>
                                        <div>Subject:</div>
                                    </div>
                                    <div className="mail-details-content">
                                        <div>{mail.to}</div>
                                        <div>{mail.cc}</div>
                                        <div>{mail.subject}</div>
                                    </div>
                                </div>
                                <div className="scheduled-time">
                                    Scheduled For:{mail.scheduled}
                                    <button>Edit</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default Mail
