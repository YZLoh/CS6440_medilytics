FROM python:3.12.0-slim-bookworm
 
# Create app directory
WORKDIR /app

# Add dependencies for psycopg2
RUN apt-get update \
    && apt-get -y install libpq-dev gcc

# Install app dependencies
COPY ./src/server/requirements.txt ./
 
RUN pip install -r requirements.txt
 
# Create app source
COPY ./src/server .
 
EXPOSE 8088
CMD [ "python","./server.py"]