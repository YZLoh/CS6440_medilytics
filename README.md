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
Install all node modules: npm install  
Install missing python modules: i.e. pip install fhirclient  
Launch locally (http://localhost:3000) : npm start  
Run test-server: cd src/server and run server.py
Run mock-server: cd doc and run mock_server.py

Configuring database: create a .env file in the root directory, then copy the contents of the provided .env.sample file and replace the actual_database_uri with the shared uri in the documentation.

(working routes : Patient - /patient-profile , /patient-update , /login || Provider - /donors, /recipients || OPO - /pending-donations, /allocated-donations, /donation-records)  

Test accounts
Provider: john@mail.com provider1234  
Patient: jane@mail.com patient1234
OPO: jack@mail.com opo1234   

**Live Demo**   
TBA


