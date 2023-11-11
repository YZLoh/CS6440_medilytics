from fhirclient import client
from flask import Flask, jsonify, make_response, request, session
from pprint import pprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app,origins="http://localhost:3000")
client_defaults = {
    'app_id': 'my_web_app',
    'api_base': 'https://fhir.collablynk.com/edifecs/fhir/R4' # open test servers: 'https://kefhir.kodality.dev/fhir/' , 'https://fhir.collablynk.com/edifecs/fhir/R4', 'http://hapi.fhir.org/baseR4' 
}

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
    # hard coded token generation in the absence of an auth server
    if (not request.is_json):
        return make_response(jsonify({'status': 'fail', 'message': 'Request must be JSON.'}), 400)

    request_data = request.get_json()
    data = {}
    resp = make_response(jsonify(data), 200)

    resp.headers['user_type'] = request_data['user_type']
    resp.headers['user_id'] = request_data['user_type'] + '001'

    resp.headers['Authorization'] = 'Bearer verylong7812fake34token56longer910'
    return resp

@app.post('/auth/logout')
def logout_post():
    resp = make_response('', 200) # 204 should be used if there is no content
    resp.headers.remove('user_type')
    resp.headers.remove('user_id')
    return resp

import fhirclient.models.patient as p
import fhirclient.models.observation as obs

@app.get("/patient/profile")
def get_patient_profiles():
    if 'user_id' in request.headers:
        patient_id = request.headers['user_id']
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

# start the app
if '__main__' == __name__:
    app.run(debug=True, port=8088)
