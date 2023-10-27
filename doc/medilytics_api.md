# Medilytics API documentation

Examples of API shapes of Medilytics organ management platform. 



A few things to note:

- Unless specified, successful response returns 200 status code.
- 4xx status codes are used in their usual senses.
- 500 status code is returned for any unhandled server error. Web admin needs to be contacted in this case. All defined states do not return 500.
- Bodies are in JSON format. Value types used are integer, float, string and boolean.
- Unless specified, all fields shown in the example are **required** fields.
- Pagination is not supported in list retrieval
- Standard error message for all non-200 response with a body, unless specified

```
{
    'status': 'fail',
    'message': 'Username not found.'
}
```

### Authentication

##### Login into the system

`POST /auth/login`

Request body - password (for testing without OAuth. e.g. local admin)

```
{
    'user_type': 'provider',
    'auth_type': 'password'
    'username': 'adam0123',
    'password': 'complexpassword'
}

```

Request body - Oauth

* Token refresh will be handled by an OAuth library and not covered here

```
{
    'user_type': 'provider', //optional if posting directly to Oauth server
    'auth_type': 'oauth' // optional
    'client_id': '29352735982374239857',
    'response_type': 'code',
    'redirect_uri': 'https://deployed_address',
    'state': 'xcoivjuywkdkhvusuye3kch'
}

```

After a successful authentication, a bearer token is retrieved and added to subsequent request headers.

##### Logout from the system

`POST /auth/logout`

``No body``

### 2. Patient

##### Get all patient updates

`GET /patient/updates`
Response body (pagination not supported)

```
{
    'data_type': 'patient-updates'
    'patient_id': '0001',
    'size': 2,
    'data_list': [
        {
            'id': 0,
            'datetime': '2023-10-25T14:43:16.776Z'
            'message': 'Your donor application has been rejected. Reason: Expired checkup result.'
        },
        {
            'id': 1,
            'datetime': '2023-09-25T14:43:16.776Z'
            'message': 'Your donor application is submitted and under review.'
        },
    ],
}
```

##### Get patient profile

`GET /patient/profile`
Response

```
{
    'data_type': 'patient-profile'
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
        'issued': '2023-09-18T16:17:16.847-04:00'
        'resource_type': 'Observation'
        'resource_id': '72352414-2e0a-3583-e3c4-143f0e1aadb' // For debugging, we may not want to expose this to patient
    },
    'donor_status': 'rejected',
    'donor_status_message': 'Your donor application has been rejected. Reason: Expired checkup result.',
    'receipient_status': 'NA', // do we allow a donor to also be a recipient?
}
```

##### (optional) Update patient profile

~~`PUT /patient/profile`~~ (enable if we allow patient to update their own data)

### 3. Provider

##### Get list of donors

`GET /provider/donors`
Response

```
{
    'data_type': 'provider-donors'
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
```

##### Get list of recipients

`GET /provider/recipients`
Response

```
{
    'data_type': 'provider-recipient'
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
```

##### Add new patient

`POST /provider/patient`
Request
All fields in [US core patient](https://build.fhir.org/ig/HL7/US-Core/StructureDefinition-us-core-patient.html) can be added here. Below are the minimum required fields.

```
{
    'request_type': 'provider-patient'
    'first_name': 'Level',
    'last_name': 'One',
    'dob': '1980-01-02',
    'gender': 'male',
}
```

Response - success

```
{
    'status': 'success',
    'request_type': 'provider-patient'
    'patient_id': '0005'
    'first_name': 'Level',
    'last_name': 'One',
    'dob': '1980-01-02',
    'gender': 'male',
}
```

Response - failure

```
// This should not happen since validation is done at frontend
{
    'status': 'fail',
    'message': 'Invalid last name.'
}
```

##### Update existing patient

`POST /provider/patient/:id`
Same shape as above

##### Add image (scanned document) for existing patient

`POST /provider/patient/:id/image`
Request

```
A standard multipart request with Content-Type: image/jpeg (or other supported image formats)
```

Response

```
{
    'status': 'success',
    'message': 'Image successfully uploaded',
    'image_id': '0005_001'
}
```

Alternatively, we can send one multipart request with both json file (contains patient info in text form) and image files. This requires frontend to create temporary files and do more processing.

### 4. OPO

##### Get list of pending organ requests

`GET /opo/pending`
Response

```
{
    'data_type': 'opo-pending'
    'opo_id': '0001',
    'size': 1,
    'data_list': [
        {
            'request_id': '0003',
            'receipient_basics': {
                'first_name': 'Level',
                'last_name': 'Two',
                'dob': '1980-01-02',
                'gender': 'male',
                'patient_id': '0005'
                'aborhd': {
                    'display': 'A RhD Positive'
                }, // optional field which only is present when lab result available
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
```

##### Get list of allocated organs

`GET /opo/allocated`
Response

```
{
    'data_type': 'opo-allocated'
    'opo_id': '0001',
    'size': 1,
    'data_list': [
        {
            'request_id': '0002',
            'receipient_basics': {
                'first_name': 'Level',
                'last_name': 'Two',
                'dob': '1980-02-02',
                'gender': 'male',
                'patient_id': '0006'
                'aborhd': {
                    'is_present': true,
                    'display': 'A RhD Positive'
                },
            },
            'donor_basics': {
                'first_name': 'Level',
                'last_name': 'Three',
                'dob': '1980-02-03',
                'gender': 'male',
                'patient_id': '0007'
                'aborhd': {
                    'is_present': true,
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
            'procurement_record_id': '0001', // linked procurement record
        }
    ]
}
```

##### Add/Update procurement record

`POST /opo/record`
Request

```
// most data is pre-loaded from a organ request
{
    'data_type': 'opo-procurement'
    'opo_id': '0001',
    'receipient_basics': {
        'first_name': 'Level',
        'last_name': 'Two',
        'dob': '1980-02-02',
        'gender': 'male',
        'patient_id': '0006'
        'aborhd': {
            'is_present': true,
            'display': 'A RhD Positive'
        },
    },
    'donor_basics': {
        'first_name': 'Level',
        'last_name': 'Three',
        'dob': '1980-02-03',
        'gender': 'male',
        'patient_id': '0007'
        'aborhd': {
            'is_present': true,
            'display': 'A RhD Positive'
        },
    },
    'request_id': '0002',
    'organ_requested': 'Kidney',
    'approved_by': 'Jane Joe',
}
```

##### Add image to a procurement record

`POST /opo/record/:id/image`

Request

```
A standard multipart request with Content-Type: image/jpeg (or other supported image formats)
```

Response

```
{
    'status': 'success',
    'message': 'Image successfully uploaded',
    'image_id': '0005_001'
}
```
