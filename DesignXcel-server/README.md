# DesignXcel

Live Demo: [DesignXcel Live Demo](https://designxcel.web.app/)

DesignXcel is a website for a summer camp learning school that specializes in various artistic disciplines. The website provides a platform for students to enroll and learn different creative activities. Whether it's music, dance, art & craft, foreign languages, or any other artistic pursuit, DesignXcel offers a wide range of classes taught by experienced instructors.

## Features

- User Registration and Login: Students can create an account and log in to access their dashboard and enroll in classes.
- User Profiles: Each user has a profile page where they can update their personal information and view their enrolled classes.
- Instructor Profiles: Instructors have their own profiles displaying their details, including the classes they teach.
- Classes Page: Students can browse through the available classes, view class details, and enroll in their desired courses.
- Dashboard: Students have a dedicated dashboard where they can view their selected and enrolled classes, make payments, and manage their bookings.
- Instructor Dashboard: Instructors can add new classes, manage their existing classes, and view the number of enrolled students.
- Admin Dashboard: Administrators have access to a dashboard to manage classes, users, and approve or deny class submissions from instructors.
- Payment Integration: Students can make payments for their selected classes securely through the website.
- Responsive Design: The website is designed to be responsive, ensuring a seamless experience across different devices.

## Technologies Used

- Front-end: React.js, HTML, CSS, JavaScript
- Back-end: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Payment Integration: [Payment Gateway API]

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/programming-hero-web-course1/b7a12-summer-camp-server_side-syedmirhabib.git

2. Install the dependencies:
    cd client
    npm install
    cd ../server
    npm install

3. Set up the environment variables:

   - Create a .env file in the server directory.
   - Add the necessary environment variables, such as database connection string, JWT secret, and payment gateway API keys.

4. Start the development server:
    cd client
    npm start
    cd ../server
    npm start

5. Open your browser and navigate to <http://localhost:5173> to access the website.


## Live Demo

Check out the live demo of DesignXcel here.

Please note that some features might be disabled or limited in the demo version.

## Installation

To run this website locally, follow these steps:

1. Clone the repository: `git clone https://github.com/programming-hero-web-course1/b7a12-summer-camp-server_side-syedmirhabib.git`
2. Navigate to the project directory: `cd your-repo`
3. Open the `index.html` file in your preferred web browser.

## Usage

Once the website is running, you can explore the different pages by clicking on the corresponding links in the navigation menu. Feel free to browse through the projects, skills, and experience sections to get a better understanding of my background and capabilities. If you have any questions or would like to get in touch, please use the contact form on the website.

## Server-Side

The server-side component of this website is built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/). It handles dynamic functionality such as form submissions, data storage, and retrieval. Here are the main server-side files and directories:

- `server.js`: The main server file that sets up the Express application, defines routes, and starts the server.
- `routes/`: This directory contains the route handlers for different endpoints of the website.
- `controllers/`: This directory contains the controller functions that handle the logic for each route.
- `models/`: This directory contains the data models used for storing and retrieving data.
- `views/`: This directory contains the server-side templates used for rendering dynamic pages.

To run the server-side component locally, follow these additional steps:

1. Install Node.js: Visit the [Node.js website](https://nodejs.org/) and follow the installation instructions for your operating system.
2. Install project dependencies: In the project directory, run `npm install` to install the required packages.
3. Start the server: Run `node server.js` or `npm start` to start the server.
4. Access the website: Open your preferred web browser and navigate to `http://localhost:5000`.

Note: Make sure to configure any necessary environment variables, such as database connection details or API keys, in a `.env` file or through other means to ensure proper functionality.


## Contributing

Contributions to DesignXcel are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

Thank you for your interest in contributing to this project. If you would like to make any improvements or fix any issues, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b your-branch-name`
3. Make your modifications.
4. Commit your changes: `git commit -m "Your detailed description of the changes"`
5. Push to the branch: `git push origin your-branch-name`
6. Open a pull request.

## License

The content of this repository is licensed under the [MIT License](LICENSE).
