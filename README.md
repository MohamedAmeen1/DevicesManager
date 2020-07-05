# DevicesManager
REST API For Managing User Devices .<br />
1In this project you will be able to.<br />
1- sign up .<br />
2- And verify your email account with the button in the email that the app sent to you .<br />
3- sign in.<br />
4- add device.<br />
5- view your devices.<br />
6- edit your devices.<br />
7- get device by its id.<br />


# .env file

In order to make .env file to run the project  
you should do these steps .<br />

1-Rename .env.example file to be .env .<br />
2-open .env file and start putting the neaded fields .<br />
Note : you will find a description for every field in .env file.<br />
## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies for this project to be able to start it.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it.

### `npm test ./tests/user.test.js`
Runs Tests for add new user and for user sign in.<br />

### `npm test ./tests/device.test.js`
Runs Tests for add new device and for get devices.<br />
NOTE : before you run test for device you should sign in and add testToken in the .env file in order to run test successfully