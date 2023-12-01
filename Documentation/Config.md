#### Startup and Configuration Files

The steps needed to run our project locally are listed out below.

**Setting up the frontend**
- Install all node modules listed in the package.json file: `npm install`
- Build and launch locally (http://localhost:3000) : `npm run build.`


**Setting up the server**
- Building the image : `docker build -t <your_tag> .`
- Running the server : `docker run --env-file .\.env -p 8088:8088 -d <your_tag>`
- Dockerfile location : https://github.gatech.edu/cs6440-team29/medilytics/blob/main/Dockerfile
