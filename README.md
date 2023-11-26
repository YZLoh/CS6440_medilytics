### Medilytics
**Team 29**
 Mengci Wu, Mika Yoshimura, Ying Zhe Loh

**Target Audience**
---
User type:Patient    
Objective: xyz
---
---
User type:Provider  
Objective: xyz
---
---
User type:Organ Procurement Organization User(OPO)   
Objective: xyz
---

**Technology Used**
![JavaScript](https://img.shields.io/badge/-JavaScript-000000?style=flat&logo=javascript)
![Python](https://img.shields.io/badge/-Python-000000?style=flat&logo=python)

**Running the Project Locally**   
-Install all node modules: npm install  
-Install missing python modules: pip install -r requirements.txt
-Launch locally (http://localhost:3000) : npm start.   
Run test-server (http://localhost:8088): cd src/server and run server.py  

**Database**
PostgreSQL database to store the app users' info is currently hosted on aiven.io  
The connection is setup to be handled by the server using the database URI saved in the .env file  
Unless the .env file is missing, no modifications are required prior to running. 

(working routes : Patient - /patient-profile , /patient-update , /login || Provider - /donors, /recipients || OPO - /pending-donations, /allocated-donations, /donation-records)    

Test accounts  
Provider: john@mail.com provider1234    
Patient: jane@mail.com patient1234  
OPO: jack@mail.com opo1234     

**Live Demo**   
TBA


