### Medilytics  

A transparent system facilitating better tracking of organs,
leading to more effective allocation and utilization,
enabling healthcare professionals to make informed
decisions and improve patient outcomes  

**Team 29**
Mengci Wu, Mika Yoshimura, Ying Zhe Loh

**Target Audience**
---------------

User type:Patient
Objective: Access their medical profile, and track their transplant updates.
--------------

---

User type:Provider
Objective: Access Donor and Recipients data in an organized manner. Create a new patient profile compatible with EHR formats.
--------------

---

User type:Organ Procurement Organization User(OPO)
Objective: Track Allocated and Pending Donations. Be able to browse a list of previously added records. Be able to create a new record via upload.
--------------
**Test accounts**
- Provider: `john@mail.com , provider1234`
- Patient: `jane@mail.com , patient1234`
- OPO: `jack@mail.com , opo1234`


**Technology Used**
![JavaScript](https://img.shields.io/badge/-JavaScript-000000?style=flat&logo=javascript)
![Python](https://img.shields.io/badge/-Python-000000?style=flat&logo=python)
![Docker](https://img.shields.io/badge/-Docker-000000?style=flat&logo=docker)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-000000?style=flat&logo=postgresql)
![Flask](https://img.shields.io/badge/-Flask-000000?style=flat&logo=Flask)
![React](https://img.shields.io/badge/-React-000000?style=flat&logo=React)


**Running the Project Locally**   
- Install all node modules: npm install  
- Install missing python modules: pip install -r requirements.txt
- Launch locally (http://localhost:3000) : npm start.   
- Run test-server (http://localhost:8088): cd src/server and run server.py  
   
**Run server container**

build

`docker build -t <your_tag> .`

run

`docker run --env-file .\.env -p 8088:8088 -d <your_tag>`

**Database**
- PostgreSQL database to store the app users' info is currently hosted on aiven.io  
- The connection is setup to be handled by the server using the database URI saved in the .env file  
- Unless the .env file is missing, no modifications are required prior to running. 

**Deployed URL**
Backend service: [https://medilytics-py.onrender.com](https://medilytics-py.onrender.com)
Frontend: [https://medilytics.netlify.app](https://medilytics.netlify.app)


**Live Demo**
https://medilytics.netlify.app

**User Manual**
Documentation > UserManual