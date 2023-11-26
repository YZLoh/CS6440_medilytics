from fhirclient import client
from flask import Flask, jsonify, make_response, request, session
from pprint import pprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

additional_cors_origin = os.getenv('CORS_ORIGIN')
fhir_base = os.getenv('FHIR_BASE', default='https://fhir.collablynk.com/edifecs/fhir/R4')
server_host = os.getenv('SERVER_HOST', default='0.0.0.0')

cors_origins = ["http://localhost:3000"]
cors_origins += additional_cors_origin if additional_cors_origin is not None else []
CORS(app,origins=cors_origins)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

client_defaults = {
    'app_id': 'my_web_app',
    'api_base': fhir_base # open test servers: 'https://fhir.collablynk.com/edifecs/fhir/R4', 'https://kefhir.kodality.dev/fhir/' , 'https://fhir.collablynk.com/edifecs/fhir/R4', 'http://hapi.fhir.org/baseR4' 
}

class users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)

def _get_client():
    return client.FHIRClient(settings=client_defaults)

myclient = _get_client()


default_html = "<p>Hello, World!</p>"

@app.route("/test")
def hello_world():
    return default_html

# auth API
@app.post('/auth/login')
def login_post():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    userExists = users.query.filter_by(email=email).first()
    passExists = users.query.filter_by(password=password).first()
    
    # edit hash later
    if userExists and passExists:
        # User authentication successful
        role = userExists.role
        return jsonify({'role': role})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

    # hard coded token generation in the absence of an auth server
    # if (not request.is_json):
    #     return make_response(jsonify({'status': 'fail', 'message': 'Request must be JSON.'}), 400)

    # request_data = request.get_json()
    # data = {}
    # resp = make_response(jsonify(data), 200)


    resp.headers['user-type'] = request_data['user-type']
    resp.headers['user-id'] = request_data['user-type'] + '001'

    # resp.headers['user_type'] = request_data['user_type']
    # resp.headers['user_id'] = request_data['user_type'] + '001'


    # resp.headers['Authorization'] = 'Bearer verylong7812fake34token56longer910'
    # return resp

@app.post('/auth/logout')
def logout_post():
    resp = make_response('', 200) # 204 should be used if there is no content
    resp.headers.remove('user-type')
    resp.headers.remove('user-id')
    return resp

import fhirclient.models.patient as p
import fhirclient.models.observation as obs

# Patient APIs
@app.get("/patient/updates")
def get_patient_updates():
    data = request.get_data()
    patient_id = request.headers.get('user-id')
    print(str(data))
    # hard-coded
    data = {
        'data_type': 'patient-updates',
        'patient_id': patient_id,
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
    if 'user-id' in request.headers:
        patient_id = request.headers['user-id']
    else:
        patient_id = '6005' # kodality: 1214, edifecs: 6005, hapi: '1516131' 
    patient = p.Patient.read(patient_id, myclient.server)
    query = obs.Observation.where(struct={'patient': patient_id, 'status': 'final', '_sort': '_lastUpdated', '_count': '1'})
    observations = query.perform_resources(myclient.server)
    latest_obs = observations[0]

    data = {
        'data_type': 'patient-profile',
        'patient_id': patient_id,
        'basics': {
            'first_name': patient.name[0].given,
            'last_name': patient.name[0].family,
            'dob': patient.birthDate.origval,
            'gender': patient.gender,
        },
        'latest_lab_result': {
            'display': latest_obs.code.coding[0].display,
            'value': latest_obs.valueQuantity.value,
            'unit': latest_obs.valueQuantity.unit,
            'effective_datetime': latest_obs.effectiveDateTime.origval,
            'resource_type': 'Observation',
            'resource_id': latest_obs.id
        },
        'donor_status': 'NA',
        'donor_status_message': '',
        'receipient_status': 'NA',
    }
    resp = make_response(jsonify(data), 200)
    return resp

# Provider APIs
@app.post('/provider/patient')
def add_provider_patient():
    request_data = request.get_json()
    fhir_request_data = {
        "resourceType": "Patient",
        "name": [
            {
            "use": "official",
            "family": request_data["last_name"],
            "given": [
                request_data["first_name"]
            ]
            }
        ],
        "gender": request_data["gender"],
        "birthDate": request_data["dob"],
    }
    patient = p.Patient.create(p.Patient(fhir_request_data), myclient.server)
    resp_data = {
        'request_type': 'provider-patient',
        'first_name': patient["name"][0]["given"],
        'last_name': patient["name"][0]["family"],
        'dob': patient["birthDate"],
        'gender': patient["gender"],
    }
    resp = make_response(jsonify(resp_data), 200)
    return resp

@app.get("/provider/donors")
def get_provider_donors():
    provider_id = request.headers.get('user-id')
    # hard-coded
    data = {
        'data_type': 'provider-donors',
        'provider_id': provider_id,
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
    provider_id = request.headers.get('user-id')
    # hard-coded
    data = {
        'data_type': 'provider-recipient',
        'provider_id': provider_id,
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


# OPO APIs
@app.get("/opo/pending")
def get_opo_pending():
    opo_id = request.headers.get('user-id')
    # hard-coded
    data = {
        'data_type': 'opo-pending',
        'opo_id': opo_id,
        'size': 1,
        'data_list': [
            {
                'request_id': '0003',
                'receipient_basics': {
                    'first_name': 'Level',
                    'last_name': 'Two',
                    'dob': '1980-01-02',
                    'gender': 'male',
                    'patient_id': '0005',
                    'aborhd': {
                        'display': 'A RhD Positive'
                    },
                },
                'organ_requested': 'Kidney',
                'provider_id': '001',
                'provider_name': 'National Hospital',
                'request_status': 'pending_review',
                'datetime_created': '2023-10-25T14:43:16.776Z',
                'datetime_updated': '2023-10-25T14:45:16.776Z',
                'documents_attached': [
                    '0005_002',
                ],
            }
        ]
    }
    resp = make_response(jsonify(data), 200)
    return resp

@app.get("/opo/allocated")
def get_opo_allocated():
    opo_id = request.headers.get('user-id')
    # hard-coded
    data = {
        'data_type': 'opo-allocated',
        'opo_id': opo_id,
        'size': 1,
        'data_list': [
            {
                'request_id': '0002',
                'receipient_basics': {
                    'first_name': 'Level',
                    'last_name': 'Two',
                    'dob': '1980-02-02',
                    'gender': 'male',
                    'patient_id': '0006',
                    'aborhd': {
                        'is_present': True,
                        'display': 'A RhD Positive'
                    },
                },
                'donor_basics': {
                    'first_name': 'Level',
                    'last_name': 'Three',
                    'dob': '1980-02-03',
                    'gender': 'male',
                    'patient_id': '0007',
                    'aborhd': {
                        'is_present': True,
                        'display': 'A RhD Positive'
                    },
                },
                'organ_requested': 'Kidney',
                'provider_id': '001',
                'provider_name': 'National Hospital',
                'request_status': 'pending_surgery',
                'request_status_display': 'A match was found on 2023-10-25, pending surgery',
                'datetime_created': '2023-10-24T14:43:16.776Z',
                'datetime_updated': '2023-10-25T14:45:16.776Z',
                'documents_attached': [
                    '0005_002',
                ],
                'procurement_record_id': '0001',
            }
        ]
    }
    resp = make_response(jsonify(data), 200)
    return resp

@app.post('/opo/record')
def add_opo_record():
    opo_id = request.headers.get('user-id')
    # hard-coded
    data = {
        'data_type': 'opo-procurement',
        'opo_id': opo_id,
        'receipient_basics': {
            'first_name': 'Level',
            'last_name': 'Two',
            'dob': '1980-02-02',
            'gender': 'male',
            'patient_id': '0006',
            'aborhd': {
                'is_present': True,
                'display': 'A RhD Positive'
            },
        },
        'donor_basics': {
            'first_name': 'Level',
            'last_name': 'Three',
            'dob': '1980-02-03',
            'gender': 'male',
            'patient_id': '0007',
            'aborhd': {
                'is_present': True,
                'display': 'A RhD Positive'
            },
        },
        'request_id': '0002',
        'organ_requested': 'Kidney',
        'approved_by': 'Jane Joe',
    }

    resp = make_response(jsonify(data), 200)
    return resp

# start the app
if '__main__' == __name__:
    app.run(debug=True, host=server_host, port=8088)
