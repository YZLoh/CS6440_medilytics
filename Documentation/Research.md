#### Research

**FHIR Implementation Concerns**
- Thorough research was done prior to being able to successfully interact with the FHIR source for patient data
- We were unable to find all the matching FHIR sources for other data such as organ information, either due to insufficient concept code (BiologicallyDerivedProduct: https://build.fhir.org/valueset-biologicallyderived-productcodes.html) or restricted use (Media https://www.hl7.org/fhir/R4/media.html).

**Python Client Usage**
- The recommended Python client (https://github.com/smart-on-fhir/client-py) had various versioning and dependency issues in their readme

- Tried running flask app from the recommended python client 
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
> found useble servers after few rounds of testing (https://github.gatech.edu/cs6440-team29/medilytics/blob/main/src/server/server.py#L26)
 
Outcome of research
- the current client is not perfect. If we find other problems in the python client, consider using other clients, e.g. JS client 
- open FHIR server does not have uptime guarantee. If it is at the risk of being taken down, consider using our own sandbox, e.g. https://github.com/smart-on-fhir/smart-dev-sandbox
- another alternative: a local container to have more control over the FHIR server dependency (https://github.gatech.edu/cs6440-team29/medilytics/compare/main...mwu-fhir-docker)

**Team decision**
- proceed with the Python client unless further issue is detected, keeo JS client as a backup
- interact with the open FHIR server to fetch patient data, minimize deployment overhead and performance concerns 
- use a mock server to generate the rest of the needed data
