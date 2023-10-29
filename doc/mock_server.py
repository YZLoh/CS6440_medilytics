from flask import Flask, jsonify, make_response
from flask_cors import CORS


app = Flask(__name__)
CORS(app,origins="http://localhost:3000")
default_html = "<p>Hello, World!</p>"

@app.route("/test")
def hello_world():
    return default_html

# Auth APIs
@app.post('/auth/login')
def login_post():
    data = {}
    resp = make_response(jsonify(data), 200)
    resp.headers['Authorization'] = 'Bearer verylong7812test34token56longer910'
    return resp

@app.post('/auth/logout')
def logout_post():
    resp = make_response('', 200) # 204 should be used if there is no content
    return resp

# Patient APIs
@app.get("/patient/updates")
def get_patient_updates():
    data = {
        'data_type': 'patient-updates',
        'patient_id': '0001',
        'size': 2,
        'data_list': [
            {
                'id': 0,
                'datetime': '2023-10-25T14:43:16.776Z',
                'message': 'Your donor application has been rejected. Reason: Expired checkup result.'
            },
            {
                'id': 1,
                'datetime': '2023-09-25T14:43:16.776Z',
                'message': 'Your donor application is submitted and under review.'
            },
        ],
    }
    resp = make_response(jsonify(data), 200)
    return resp

@app.get("/patient/profile")
def get_patient_profiles():
    data = {
        'data_type': 'patient-profile',
        'patient_id': '0001',
        'basics': {
            'first_name': 'Joe',
            'last_name': 'Doe',
            'dob': '1980-01-02',
            'gender': 'male',
        },
        'latest_lab_result': {
            'display': 'Glucose [Mass/volume] in Blood',
            'value': '99',
            'unit': 'mg/dL',
            'issued': '2023-09-18T16:17:16.847-04:00',
            'resource_type': 'Observation',
            'resource_id': '72352414-2e0a-3583-e3c4-143f0e1aadb'
        },
        'donor_status': 'rejected',
        'donor_status_message': 'Your donor application has been rejected. Reason: Expired checkup result.',
        'receipient_status': 'NA',
    }
    resp = make_response(jsonify(data), 200)
    return resp

# Provider APIs
@app.get("/provider/donors")
def get_provider_donors():
    data = {
        'data_type': 'provider-donors',
        'provider_id': '0001',
        'size': 2,
        'data_list': [
            {
                'patient_id': '0001',
                'basics': {
                    'first_name': 'Joe',
                    'last_name': 'Doe',
                    'dob': '1980-01-02',
                    'gender': 'male',
                },
                'donor_code': {
                    'url': 'http://terminology.hl7.org/CodeSystem/v2-0316',
                    'code': 'I',
                    'display': 'No, patient is not a documented donor, but information was provided',
                },
                'donor_status': 'rejected',
                'donor_status_message': 'Reason: Expired checkup result.',
                'organ': 'Kidney',
                'datetime_created': '2023-08-25T14:43:16.776Z',
                'datetime_updated': '2023-10-25T14:43:16.776Z'
            },
            {
                'patient_id': '0002',
                'basics': {
                    'first_name': 'Adam',
                    'last_name': 'Smith',
                    'dob': '1990-01-02',
                    'gender': 'male',
                },
                'donor_code': {
                    'url': 'http://terminology.hl7.org/CodeSystem/v2-0316',
                    'code': 'Y',
                    'display': 'Yes, patient is a documented donor and documentation is on file',
                },
                'donor_status': 'pending_surgery',
                'donor_status_message': 'A receipient is matched. Surgery is scheduled on 2022-09-22.',
                'organ': 'Kidney',
                'datetime_created': '2022-01-25T14:43:16.776Z',
                'datetime_updated': '2023-09-21T14:43:16.776Z'
            },
        ]
    }
    resp = make_response(jsonify(data), 200)
    return resp

@app.get("/provider/recipients")
def get_provider_receipients():
    data = {
        'data_type': 'provider-recipient',
        'provider_id': '0001',
        'size': 2,
        'data_list': [
            {
                'patient_id': '0003',
                'basics': {
                    'first_name': 'Jack',
                    'last_name': 'Smith',
                    'dob': '1982-05-02',
                    'gender': 'male',
                },
                'recipient_status': 'pending_match',
                'recipient_status_message': 'Application approved. Pending match',
                'organ': 'Kidney',
                'datetime_created': '2023-08-25T14:43:16.776Z',
                'datetime_updated': '2023-10-25T14:43:16.776Z'
            },
            {
                'patient_id': '0004',
                'basics': {
                    'first_name': 'Beth',
                    'last_name': 'Smith',
                    'dob': '1995-01-02',
                    'gender': 'female',
                },
                'donor_status': 'pending_surgery',
                'donor_status_message': 'A donor is matched. Surgery is scheduled on 2022-09-24.',
                'organ': 'Kidney',
                'datetime_created': '2022-01-25T14:43:16.776Z',
                'datetime_updated': '2023-09-21T14:43:16.776Z'
            },
        ]
    }
    resp = make_response(jsonify(data), 200)
    return resp

@app.post('/provider/patient')
def add_provider_patient():
    data = {
        'request_type': 'provider-patient',
        'first_name': 'Level',
        'last_name': 'One',
        'dob': '1980-01-02',
        'gender': 'male',
    }
    resp = make_response(jsonify(data), 200)
    return resp

# start the app
if '__main__' == __name__:
    app.run(debug=True, port=8088)