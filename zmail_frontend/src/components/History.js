import React from 'react'
import { useState, useEffect } from 'react'
import {useHistory} from "react-router-dom"
import axios from '../axios'

import './Mail.css'

function History() {

    const history = useHistory()

    const [isLoading, setLoading] = useState(true);
    const [maildata, setMaildata] = useState();

    useEffect(() => {
        axios.get(`/mailhistory/fetch?from=${localStorage.getItem("username")}`)
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
                    <h1>Your Mail History</h1>
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
                                    Sent On:{mail.senton}
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default History
