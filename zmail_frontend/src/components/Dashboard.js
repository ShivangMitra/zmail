import React, {useState, useRef}from 'react'
import {Link,useHistory} from "react-router-dom"
import axios from '../axios'

import './dashboard.css'

const openModal = function () {

    const modal = document.querySelector('.mailit');
    const overlay = document.querySelector('.overlay');

    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
  
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    const modal = document.querySelector('.mailit');
    const overlay = document.querySelector('.overlay');
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.getElementById("mail-inner-body").value = ''
    document.getElementById("mail-subject").value = ''
    document.getElementById("mail-cc").value = ''
    document.getElementById("mail-to").value = ''
};

export default function Dashboard() {


    const toref = useRef()
    const ccref = useRef()
    const subjectref = useRef()
    const bodyref = useRef()

    var radio_val = 0;


    function handleScheduling(){

      var reference_date = new Date(0)
      var set_date = new Date()

      if(radio_val === 1){
        set_date.setSeconds(set_date.getSeconds() + 30)
      }
      else if(radio_val === 2){
        set_date.setDate(set_date.getDate() + 1)
      }
      else if(radio_val === 3){
        set_date.setMonth(set_date.getMonth() + 1)
      }
      else if(radio_val === 4){
        set_date.setFullYear(set_date.getFullYear() + 1)
      }

      axios.post('/mail/new', {
        from: localStorage.getItem("username"),
        to: toref.current.value,
        cc: ccref.current.value,
        subject: subjectref.current.value,
        scheduled: radio_val,
        latestdate: set_date - reference_date,
        mailbody: bodyref.current.value,
      })

      closeModal()
      
    }


    const [error, setError] = useState()
    // const {currentUser,logout} = useAuth()
    const history = useHistory()

    async function handleLogout(){

        setError('')
        try {
            // await logout()
            localStorage.removeItem("username")
            history.push('/login')
            
        } catch {
            setError('Failed to logout')
            
        }

    }      

    return (
<div>

      {
        !(localStorage.getItem("username")) ? history.push("/login") : (

        
          <div>
    <nav className="navbar">
      <div className="brand">Z-mail</div>
      <div className="nav-item">
        <Link to="/mails" className="nav-item">Mails</Link>
        <Link to="/history" className="nav-item">History</Link>
      </div>
      <div>
        <button className="nav-menu login" onClick={handleLogout}>Log Out</button>
      </div>
    </nav>

    <section className="home" id="home">
      <div className="home-content">
        <div className="text">
          <div className="text-one">Hello {localStorage.getItem("username")},</div>
          <div className="text-two">Lets Mail</div>
          <div className="text-three">Connect with people</div>
        </div>

        <button className="compose" onClick={openModal}>
            Compose
        </button>
      </div>
    </section>

    <div className="mailit hidden">
      <div className="modal">
        <button className="close-modal" onClick={closeModal}>&times;</button>
        <div className="mailhead">Write your mail</div>
        <div className="mailbody">
          <div><input type="email" id="mail-to" placeholder="To" className="mailitem" ref={toref} /></div>
          <div><input type="email" id="mail-cc" placeholder="Cc: someone@gmail.com, chintu@gmail.com" className="mailitem" ref={ccref} /></div>
          <div>
            <input type="text" placeholder="Subject" id="mail-subject" className="mailitem" ref={subjectref} />
          </div>
          <div>
            <textarea
              className="typemsg mailitem"
              name="mail"
              id="mail-inner-body"
              cols="30"
              rows="10"
              placeholder="Type your mail here..."
              ref={bodyref}
            ></textarea>
          </div>
        </div>
        <div className="mail-buttons">
          <button className="Sendmail" onClick={handleScheduling}>Schedule</button>
          <div className="schedules">
            <input type="radio" id="sec" name="schedule" value="sec" onChange={() => {radio_val = 1}} />
            <label>30 secs</label>
            <input type="radio" id="daily" name="schedule" value="daily" onChange={() => {radio_val = 2}} />
            <label>Daily</label>
            <input type="radio" id="monthly" name="schedule" value="monthly" onChange={() => {radio_val = 3}} />
            <label>Monthly</label>
            <input type="radio" id="yearly" name="schedule" value="yearly" onChange={() => {radio_val = 4}} defaultChecked/>
            <label>Yearly</label>
          </div>
        </div>
      </div>
      <div className="overlay hidden"></div>
    </div>
    </div>
    )
  }
  </div>
    )
}
