//importing
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import nodemailer from 'nodemailer'

import Users from './dbUsers.js'
import Mail from './dbMail.js'
import MailHistory from './dbMailHistory.js'

//app config
const app = express()
const port = process.env.PORT || 9000

//middleware
app.use(express.json())
app.use(cors())

//DB config
const connection_url = 'mongodb+srv://admin:JARDx9QEc3RfaGbG@cluster0.lim86.mongodb.net/zmaildb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//api routes

//basic server test api route
app.get("/", (req, res) => res.status(200).send("im ON"))


//api endpoints for handling users
app.post("/users/new", (req, res) => {
    const dbParams = req.body

    Users.create(dbParams, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`new user created: \n ${data}`)
        }
    })
})

app.get("/users/fetch", (req, res) => {
    Users.find({name: req.query.name}, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})


//api endpoints for handling mails
app.post("/mail/new", (req, res) => {
    const dbParams = req.body

    Mail.create(dbParams, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`new mail created: \n ${data}`)
        }
    })
})


//fetching mails
app.get("/mail/fetch", (req, res) => {
    Mail.find({from: req.query.from}, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})


//fetching mail history
app.get("/mailhistory/fetch", (req, res) => {
    MailHistory.find({from: req.query.from}, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})


//function to send the actual mail
function sendTheMail(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'website.test.man@gmail.com',
          pass: 'WebsiteTestMan'
        }
      });
      
      var mailOptions = {
        from: 'website.test.man@gmail.com',
        to: '1929047@kiit.ac.in',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


//syning mails and mail history according to their scheduled time
function mailSync(){
    Mail.find({scheduled: 0}, (err, data) => {
        if(err){
            console.log("Error ", err)
        }
        else{
            for (let i = 0; i < data.length; i++) {
                var dbParams = {
                    from: data[i]["from"],
                    to: data[i]["to"],
                    cc: data[i]["cc"],
                    subject: data[i]["subject"],
                    senton: data[i]["scheduled"],
                    mailbody:data[i]["mailbody"],
                }

                sendTheMail()

                MailHistory.create(dbParams, (err, data) => {
                    if(err){
                        console.log("ERROR: ", err)
                    }
                    else{
                        console.log(`new mail history created: \n ${data}`)
                    }
                })
                Mail.remove({_id: data[0]["_id"]}, (err, data) => {
                    if(err){
                        console.log("Error: ", err)
                    }
                    else{
                        console.log(`moved mail to history \n ${data}`)
                    }
                })
            }
        }
    })
}
// setInterval(mailSync, 1000)
// mailSync()

//listen
app.listen(port, () => console.log(`listening on localhost ${port}`))