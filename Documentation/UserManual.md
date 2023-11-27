## User Manual   
### Deployed Application  
Our application can be found at the following URL  
https://medilytics.netlify.app


### Using the application   
1. Navigate to the following URL https://medilytics.netlify.app to access the Landing Page  
2. The user may choose to browse the content of the Landing page to learn more about the application, or click on the *Get Started  * button to navigate to the Login Page
3. On the Login Page the user can enter their credentials and click on the *Sign In* button to gain access to the application.
4. There are 3 different user types that can access our application. Each user type's user journey is specified below.  
    1. Patient   
       1. To log in as a patient the user can enter the following credentials. `Email: jane@mail.com , Password: patient1234 ` 
       2. Upon logging in, the user will first see their Profile page being loaded *pic*  
       3. To navigate to Updates they may have, they can click on the Updates section in the side navigation menu  
       4. To logout, the user may click on the logout button on the top right of the screen  
    2. Provider     
       1. To log in as a provider the user can enter the following credentials. `Email: jack@mail.com Password: provider1234`     
       2. Upon logging in, the user will first see their Pending Donations page being loaded *pic*    
       3. To browse Allocated Donations they can click on the Allocated Donations section in the side navigation menu    
       4. To browse Records they can click on the Records section in the side navigation menu   
       5. To search Records, the user can enter their search query in the serach box and click on the search button.  
       6. To add a new Record, the user can click on the Upload button and a popup will show up allowing the user to select a file to upload.  
       7. To logout, the user may click on the logout button on the top right of the screen.  
    
    3. OPO  
       1. To log in as an OPO user the user can enter the following credentials. `Email: john@mail.com , Password: opo1234`  
       2. Upon logging in, the user will first see the Donors page being loaded *pic*  
       3. To browse a list of Recipients , they can click on the Recipients section in the side navigation menu  
       4. To add a new patient , they can click on the New Patient section in the side navigation menu  
       5. On the New Patient page, after filling out the required fields, they can click on the save button to save the new patient's details.  
       6. To logout, the user may click on the logout button on the top right of the screen.    
    
 ### Special Instructions for Grading    
 To successfully deploy and run our application, please follow these instructions.   

###Deploying the Flask backend on render.com
First the docker image should be created. The docker file is already setup in the root directory. The build command must first be run, then the built image should be uploaded to a registry.

**Building**
`docker build -t <your_tag> .`

**Pushing to Docker registry** 
`docker push <your_registry_url>/<your_image_name>:<your_tag> `

Once it's successfully pushed to the Docker registry, visit render.com and register / log in. 

**Creating a web service**
- click on the new button, and select web service
- upon seeing the deployment choices, select deploy an existing image from a registry and click next
- in the image url entry field, provide the docker registry URL created in the previous step, and click next

**Configuring the web service**
- once the service has successfully been created, head over to the Environment section in the left navigation menu
- click on the Add Environment Variable button and provide the following key/value pairs and save your changes `key: DATABASE_URI , value: postgresql://avnadmin:AVNS_eQFDFudpxu0OZU4duFb@pg-1e9c2269-ckptr-449b.a.aivencloud.com:18751/users?sslmode=require` , 
`key: CORS_ORIGIN , value: https://medilytics.netlify.app`
- navigate to the Settings section in the left navigation menu scroll down to the Health&Alerts section and provide /test in the entry field for the Health Check Path 

**Confirming the web service is running** 
- Navigate to the Logs section in the left navigation menu. You should see a list of responses being generated. 
- If the recent log has a response of 200, you have successfully finalized the deployment.

**Obtaining the deployment URL**
- The deployment URL is available on the top of the page in the form of `https://<your_web_service_name>.onrender.com` 
- This is the URL that will be provided to the frontend so take note of this.

**Deploying the React frontend on netlify.com**
First the React project must be edited to include the deployed backend URL. Then it can be  built, and the build folder can be uploaded to Netlify.

**Preparing for build**
- navigate to the src > api folder
- open the axios.js file
- edit the value of baseURL by replacing the current value with the deployed backend URL i.e`https://<your_web_service_name>.onrender.com`


**Build the project**
- run `npm run build`

**Configuring the build folder**
- move the netlify.toml file from the root directory to the build folder

**Uploading to Neltify**
- visit netlify.com and register / log in. 
- navigate to https://app.netlify.com/drop
- drag and drop the build folder generated in the previous step
- once it's successfully uploaded, navigate to the Site configuration section then Site details 
- Click on the change site name button and rename it to medilytics and save the changes.

**Testing the deployment**
- Visit medilytics.netlify.app and you should be able to see the app's Landing Page.

