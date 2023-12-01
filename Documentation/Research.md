#### Research

**FHIR Implementation Concerns**
- Thorough research was done prior to being able to successfully interact with the FHIR source for patient data
- We were unable to find all the matching FHIR sources for other data such as organ information (this may
be due to sensitivity issues)

**Python Client Usage**
- The recommended Python client had various versioning and dependency issues

- Tried running flask app from the recommended python client (https://github.com/smart-on-fhir/client-py)
> error in system library
ImportError: cannot import name 'Mapping' from 'collections' (/usr/lib/python3.10/collections/__init__.py)
> installed lower version of python
> python 3.0 and python 2.7.10 (as specified in its README)
> segfault during building, installing old libraries does not help
> downgraded UBUNTU to 18.04 from 22.04
> repeated installation of 2 python versions, got same error as v22
> Tried 2.7.18 (last release of Python 2) on Ubuntu 22.04
> installation succeeded with additional dependencies added (https://gist.github.com/kimw/920a9f89c1ed1e49fea0d37cc2aa3b40)
 
- Example app runs with long loading time and eventual time out
> found multiple issues regarding the sandbox used (e.g. https://github.com/smart-on-fhir/client-py/issues/38 and its linked issues)
> tried multiple sandboxes and got connection error/certificate error, etc. (list: https://confluence.hl7.org/display/FHIR/Public+Test+Servers, https://wiki.hl7.org/index.php?title=Publicly_Available_FHIR_Servers_for_testing)
> connectable server (http://hapi.fhir.org/baseDstu3) has validation error
FHIRValidationError: {root}:
  implementation:
    'Non-optional property "description" on <fhirclient.models.capabilitystatement.CapabilityStatementImplementation object at 0x7ff88bf7ea50> is missing'
> Seems that the library is not updated with latest schema
 
- Outcome of research
> consider using other clients, e.g. JS
> consider using our own sandbox, e.g. https://github.com/smart-on-fhir/smart-dev-sandbox

**Team decision**
- proceed with the Python client 
- interact with the open FHIR server to fetch patient data 
- use a mock server to generate the rest of the needed data
