from flask import Flask, jsonify, make_response

app = Flask(__name__)

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

# start the app
if '__main__' == __name__:
    app.run(debug=True, port=8088)