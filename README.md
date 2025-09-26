# festival app

This application has 3 subpages:
- `/` - Home subpage with information about artists and data retrieved from API,
- `/prices` - Prices subpage with information about prices,
- `/order-a-ticket` - Order a ticket subpage with a ticket order form. The subpage uses information from the server about the number of available places. The user can only book available places.

Project: https://festival-app-r92u.onrender.com


## Technologies Used

- **Frontend:** React, Redux (with Thunk middleware), React Router, React-Bootstrap & Bootstrap, SCSS Modules
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, WebSocket
- **Testing:** Mocha, Chai.js

## Installation & Configuration

1. Clone the repository:

```bash
git git@github.com:mGrzanek/festival-app.git
cd festival-app
```

2. Create a .env file based on .env.example.


```bash
cp .env.example .env
```

Insert your data into the key values.

3. Install dependencies:

`npm install`

4. Start the application from root with: 

```bash
npm start
```

5. Open your local browser:

`http://localhost:8000`

## Testing

Launch the test runner in interactive watch mode:

```bash
npm test
```

## Author

Monika Grzanek
