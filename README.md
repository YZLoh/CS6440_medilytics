**Medilytics**

## Table of Contents
1. [Project Description](#project-description)
2. [Team Description](#team-description)
3. [Technology Used](#technology-used)
4. [Target Audience](#target-audience)
5. [Running Locally](#running-locally)
6. [Deployment Details](#deployment)
7. [Live Demo](#live-demo)
8. [Application Access](#application-access)
9. [Documentation](#documentation)


## Project Description
A transparent system facilitating better tracking of organs,
leading to more effective allocation and utilization,
enabling healthcare professionals to make informed
decisions and improve patient outcomes    

## Team Description
**Team 29** 
- Mengci Wu: Backend
- Mika Yoshimura: Frontend, UI
- Ying Zhe Loh : Frontend, UX 

##Target Audience
---------------

| Patient | Provider | Organ Procurement Organization User(OPO) |
|----------|----------|----------|
| Access their EHR data| Access Donor and Recipients data | Track Allocated and Pending Donations|
| Track updates | Create a new patient profile compatible with EHR formats| Record creation and management|

## Technology Used
![JavaScript](https://img.shields.io/badge/-JavaScript-000000?style=flat&logo=javascript)
![Python](https://img.shields.io/badge/-Python-000000?style=flat&logo=python)
![Docker](https://img.shields.io/badge/-Docker-000000?style=flat&logo=docker)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-000000?style=flat&logo=postgresql)
![Flask](https://img.shields.io/badge/-Flask-000000?style=flat&logo=Flask)
![React](https://img.shields.io/badge/-React-000000?style=flat&logo=React)


## Running Locally
**Running the frontend**   
- Install all node modules: `npm install`  
- Build and launch locally (http://localhost:3000) : `npm run build `  
   
**Running the backend server container**
- build `docker build -t <your_tag> .`
- run `docker run --env-file .\.env -p 8088:8088 -d <your_tag>`

**Database**
- PostgreSQL database to store the app users' info is currently hosted on aiven.io  
- The connection is setup to be handled by the server using the database URI saved in the .env file  
- Unless the .env file is missing, no modifications are required prior to running. 

## Deployment
**Deployed URL**  
Backend service: [https://medilytics-py.onrender.com](https://medilytics-py.onrender.com)  
Frontend: [https://medilytics.netlify.app](https://medilytics.netlify.app)  

## Live Demo
[https://medilytics.netlify.app](https://medilytics.netlify.app)  

## Application Access
Please use the provided credentials to gain access to the app
- Provider: `john@mail.com , provider1234`
- Patient: `jane@mail.com , patient1234`
- OPO: `jack@mail.com , opo1234`


## Documentation
**User Manual**  
Documentation > UserManual
URL: https://github.gatech.edu/cs6440-team29/medilytics/blob/main/Documentation/UserManual.md

**Research**
Documentation > Research
URL: https://github.gatech.edu/cs6440-team29/medilytics/blob/main/Documentation/Research.md

**Architecture Diagram**
Documentation >
URL:https://github.gatech.edu/cs6440-team29/medilytics/blob/main/Documentation/ArchitectureDiagram.md

**Config**
Documentation > Config
URL: https://github.gatech.edu/cs6440-team29/medilytics/blob/main/Documentation/Config.md
