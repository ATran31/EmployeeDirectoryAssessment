# Mercury Employee Directory

Currently at Mercury we have no directory of our employees. We'd like to create a simple web interface that allows us to view this information.

We'd also like to eventually allow this directory to be visible on other platforms. So we've built a simple API to allow us to fetch the data we need.

Currently this project is very lack-luster and has some bugs. As a potential Mercury Employee, we'd like you to help solve these problems along with trying to improve the app where you see fit. Below are a list of things that we'd like you to implement. Along with that you may run into some other bugs. The more bugs you solve the better. Good luck

## Requirements
This project is meant to be somewhat open-ended. However, we don't expect anybody to spend more than 4hrs on it. 

Included is the frontend and backend.  Each has it's own requirements/readme.  Please reference those.

## Running
There are 2 ways to run this stack.  
- Manually run the frontend and backend
- Used docker-compose via the docker-compose.yml 

### Manual Running

#### Backend
```
cd backend
npm run start:dev
```

#### Frontend
```
cd frontend
REACT_APP_API_HOST=http://localhost:3000 npm run start:dev
```
