let bcrypt = require('bcryptjs');
saltRounds=10;
const nodemailer = require("nodemailer");
require('dotenv').config()

module.exports = {
    encrypt: async function (plain_text){
        let h=0;
        await bcrypt
        .genSalt(saltRounds)
        .then(salt => {
          return bcrypt.hash(plain_text, salt);
        })
        .then(hash => {
            h=hash
            return
        })
        .catch(err => console.error(err.message));
        return h
    },
    send_mail: function(mailOptions){
        let smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            tls: true,
            auth: {
                user: process.env.send_email,
                pass: process.env.send_password
            }
        });
      
      
      // send mail with defined transport object
      smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
              console.log(error);
          }else{
              console.log("Message sent: " + response);
          }
      
          // if you don't want to use this transport object anymore, uncomment following line
          //smtpTransport.close(); // shut down the connection pool, no more messages
      });
  },
  send_verification_email: function(code,email){
    console.log("email :",email)
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Devices manager<mohamedquizdx@gmail.com>", // sender address
        to: email, // list of receivers
        subject: "Verify your Devices manager Email", // Subject line
        // text: message, // plaintext bodys
        html: `<!DOCTYPE html>
        <html lang="en">
            </div>
            <form action="${process.env.url}/user/activateemail/${code}" method="get">
                <button type="submit" value="Submit">Verify</button>
        ​
            </form>
            </div>
        </body>
        </html>` // html body
    }
    this.send_mail(mailOptions)
  },
}