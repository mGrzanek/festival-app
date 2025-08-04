# festival app

This application has 3 subpages:
- `/` - Home subpage with information about artists and data retrieved from API,
- `/prices` - Prices subpage with information about prices,
- `/order-a-ticket` - Order a ticket subpage with a ticket order form. The subpage uses information from the server about the number of available places. The user can only book available places.

Project: https://festival-app-r92u.onrender.com


## Technologies Used

- **Frontend:** React, Redux (with Thunk middleware), React Router, React-Bootstrap & Bootstrap, SCSS Modules
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, WebSocket

## Configuration
To run the application, you need an `.env` file with configuration data.
Copy the .env.example file as .env:

`cp .env.example .env`

Insert your data into the key values.

Then install the necessary packages using:

`npm install`
or
`yarn install`

To start the application use: 

`npm start`
or
`yarn start`

## Author

Monika Grzanek
