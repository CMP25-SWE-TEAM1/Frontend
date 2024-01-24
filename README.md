# GigaChat

This project entailed the development of a comprehensive Twitter clone, meticulously replicating core functionalities and incorporating additional features to enhance user experience. The project was executed through a collaborative team effort, spanning both front-end, cross platform, testing, DevObs and back-end development.

# Table of Contents

- [GigaChat](#gigachat)
- [Table of Contents](#table-of-contents)
- [Features](#features)
  - [Authentication and Registration](#authentication-and-registration)
  - [User Profiles](#user-profiles)
  - [User Interactions](#user-interactions)
  - [Tweets](#tweets)
  - [Timeline and Trends](#timeline-and-trends)
  - [Direct Messages](#direct-messages)
  - [Media](#media)
  - [Notifications](#notifications)
- [Demo Video](#demo-video)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Create React App](#create-react-app)
  - [Material-UI and Tailwind CSS](#material-ui-and-tailwind-css)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Contributors](#contributors)

# Features

### Authentication and Registration

- Robust login and registration processes with CAPTCHA implementation for security
- Email confirmation and password reset mechanisms
- Integration of third-party sign-in options: Google, Facebook, GitHub
- Functionalities for updating usernames, passwords, and email addresses

### User Profiles

- Comprehensive profile management, including customizable profile pictures and banners
- User search capabilities based on usernames or screen names
- View and update individual user profiles

### User Interactions

- Follow/unfollow actions to establish connections
- Blocking and muting features for managing interactions
- Ability to view followers, following lists, and muted users

### Tweets

- Creation, deletion, and retrieval of tweets
- Viewing tweet replies
- Retweeting and liking capabilities
- Display of retweeters and likers lists

### Timeline and Trends

- Personalized home timelines showcasing tweets from followed users
- Access to user-specific tweet profiles
- Filtering tweets based on mentions and likes
- Trend exploration, including tweet displays for specific trends

### Direct Messages

- Private messaging system for direct communication
- Message retrieval and conversation management
- Unread message count display

### Media

- Integration of media (images, videos) within tweets

### Notifications

- Notification center for keeping users informed
- Push notification functionality for real-time updates
- Unseen notification count display

# Demo Video

For a comprehensive overview of our social media platform and its features, we have prepared a demo video. Watch the video to explore the user interface, functionalities, and the overall user experience.

[![Demo Video](https://github.com/CMP25-SWE-TEAM1/Frontend/blob/main/src/assets/thumpnail.png)](https://vimeo.com/899189177)

We hope you enjoy the demonstration and find it helpful in understanding the capabilities of our social media platform.

# Installation

## Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/en/): The project is built with JavaScript, and Node.js is required to run the development environment.

## Create React App

This project is bootstrapped with [Create React App](https://create-react-app.dev/). If you don't have it installed, you can set it up globally using:

```bash
npm install -g create-react-app
```

## Material-UI and Tailwind CSS

The project utilizes [Material-UI](https://material-ui.com/) for UI components and [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS. The Tailwind CSS configuration file (`tailwind.config.js`) is included with the repository, so there is no need to initialize Tailwind CSS separately.

Install the dependencies by running the following commands:

```bash
# Install Material-UI
npm install @mui/material @emotion/react @emotion/styled

# Install Tailwind CSS and necessary dependencies
npm install -D tailwindcss postcss autoprefixer
```

Now you're ready to run the project locally. Refer to the [Getting Started](#getting-started) section for more information.

# Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the Repository:**

```bash
   git clone https://github.com/CMP25-SWE-TEAM1/Frontend.git
```

2. **Navigate to the Project Directory:**

```bash
cd Frontend
```

3. **Install Dependencies:**

```bash
npm install
```

4. **Start the Development Server:**

```bash
npm start
```

This will launch the development server, and you can view the application at http://localhost:3000 in your web browser.

5. **Explore the Social Media Platform:**

   - Open the provided URL in your browser.
   - Sign up or log in using the authentication features.
   - Explore user profiles, interact with tweets, and experience the various features of the platform.

6. **Shut Down the Development Server:**
   Once you are done, stop the development server by pressing `Ctrl + C` in the terminal where it is running.

# Technologies Used

The social media platform front-end project is built using the following frameworks, technologies, tools, and libraries:

- **ReactJS:**

  - A JavaScript library for building user interfaces, providing a robust and efficient foundation for the project.

- **Tailwind CSS:**

  - A utility-first CSS framework that facilitates the development of a responsive and customizable user interface.

- **NPM (Node Package Manager):**

  - The package manager for JavaScript, used to manage and install project dependencies efficiently.

- **Jest:**

  - A JavaScript testing framework, ensuring the reliability and functionality of the codebase through automated tests.

- **React Docgen:**

  - A documentation generator specifically designed for React components, aiding in the documentation process.

- **Material-UI:**
  - A popular React UI framework that provides pre-built, customizable components for creating a consistent and modern user interface.

These technologies collectively contribute to the development, testing, and documentation aspects of the social media platform, ensuring a scalable, maintainable, and feature-rich front-end application.

# Folder Structure

```bash
├──coverage
│   └──lcov-report
│       └──src
│           ├──components
│           │   ├──Explore
│           │   ├──General
│           │   │   ├──Crop
│           │   │   │   └──utils
│           │   │   └──CustomTabs
│           │   ├──Home
│           │   │   ├──ComposePost
│           │   │   └──Posts
│           │   ├──landing-page
│           │   ├──Login
│           │   ├──messages-page
│           │   │   ├──compose
│           │   │   ├──constants
│           │   │   ├──customHooks
│           │   │   │   ├──get
│           │   │   │   └──post
│           │   │   ├──details
│           │   │   │   └──message
│           │   │   └──navigation
│           │   ├──Notifications
│           │   ├──PasswordReset
│           │   ├──PostEngagement
│           │   ├──PostPage
│           │   ├──ProfilePage
│           │   │   ├──FollowPage
│           │   │   └──ProfilePageEdit
│           │   ├──Search
│           │   ├──Settings
│           │   │   ├──AccessibilityDisplayLanguages
│           │   │   ├──Account
│           │   │   └──PrivacySafety
│           │   ├──Sidebar
│           │   ├──Signup
│           │   └──Widgets
│           ├──constants
│           ├──mocks
│           ├──store
│           └──utils
├──docs
├──nginx
├──public
└──src
    ├──assets
    │   └──imgs
    ├──components
    │   ├──assets
    │   ├──Explore
    │   ├──General
    │   │   ├──Crop
    │   │   │   └──utils
    │   │   └──CustomTabs
    │   ├──Home
    │   │   ├──ComposePost
    │   │   └──Posts
    │   ├──landing-page
    │   ├──Login
    │   ├──messages-page
    │   │   ├──compose
    │   │   ├──constants
    │   │   ├──customHooks
    │   │   │   ├──get
    │   │   │   └──post
    │   │   ├──details
    │   │   │   └──message
    │   │   └──navigation
    │   ├──Notifications
    │   ├──PasswordReset
    │   ├──PostEngagement
    │   ├──PostPage
    │   ├──ProfilePage
    │   │   ├──FollowPage
    │   │   └──ProfilePageEdit
    │   ├──Search
    │   ├──Settings
    │   │   ├──AccessibilityDisplayLanguages
    │   │   ├──Account
    │   │   └──PrivacySafety
    │   ├──Sidebar
    │   ├──Signup
    │   └──Widgets
    ├──constants
    ├──mocks
    ├──store
    ├──styles
    ├──test
    │   ├──General
    │   ├──Home
    │   │   ├──ComposePost
    │   │   └──Sidebar
    │   └──__snapshots__
    └──utils
```

# Contributors

A big thank you to the [contributors](https://github.com/CMP25-SWE-TEAM1/Frontend/graphs/contributors) who have helped make this project possible! 🙌

<table>
  <tr>
<td align="center">
<a href="https://github.com/MohamedSamir245" target="_black">
<img src="https://avatars.githubusercontent.com/u/96524821?v=4" width="150px;" alt="Mohamed Samir"/><br /><sub><b>Mohamed Samir</b></sub></a><br />
</td>

<td align="center">
<a href="https://github.com/Mohamed0x3" target="_black">
<img src="https://avatars.githubusercontent.com/u/96536944?v=4" width="150px;" alt="Mohamed Taher"/><br /><sub><b>Mohamed Taher</b></sub></a><br />
</td>

<td align="center">
<a href="https://github.com/Hefney" target="_black">
<img src="https://avatars.githubusercontent.com/u/96011550?v=4" width="150px;" alt="Abdulrahman Mohamed"/><br /><sub><b>Abdulrahman Mohamed</b></sub></a><br />
</td>

<td align="center">
<a href="https://github.com/Youssef-Hagag" target="_black">
<img src="https://avatars.githubusercontent.com/u/94843229?v=4" width="150px;" alt="Youssef Mohamed"/><br /><sub><b>Youssef Mohamed</b></sub></a><br />
</td>

<td align="center">
<a href="https://github.com/Ismail-Ramadan-Shaheen" target="_black">
<img src="https://avatars.githubusercontent.com/u/114364925?v=4" width="150px;" alt="Ismail Ramadan"/><br /><sub><b>Ismail Ramadan</b></sub></a><br />
</td>
</tr>
 </table>
