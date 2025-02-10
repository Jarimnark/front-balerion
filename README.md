# Project Description
- This repository is to submit the fullstack developer test of Balerion.
- You can visit this project in [the link](https://front-balerion.vercel.app/)
- Note that before using it. You have to setup the Tweak extension first (in src/assets).
- Now I use sessionStorage to collect the Auth data. If you open the project in other tabs, it will route to login page. If you would like to upgrade this scenerio, I will update the storage to localStorage.
- I decided not to use Shadcn library (that I mentioned in the email) because there not work properly in React19.
# Tech Stack
- React
- Tailwind
# Installation and Setup
- **Clone the Repository:**
  ```bash
  git clone https://github.com/Jarimnark/front-balerion.git
  ```
- **Install Dependencies:**
  ```bash
   npm install
  ```
- **Import Tweak:** Import the Tweak json file from src/assets to Tweak extension for API mockup and enable all of them.
- **Start the Project:**
  ```bash
   npm run dev
  ```
# Manual
There are 2 user that I implement in Tweak

<br />Role: ADMIN
- username: admin1
- password: 1234
  
<br />Role: USER
- username: user1
- password: 1234


# Additional Feature
The feature that I implement not included in the orginal requirements.
- After login successfully, there will be the popup occur 2 seconds before route to '/'.
- There is the logout confirmation before execute the logout feature.
- Animation for card. Hope this will smoother the user experience.
