# Intro

The goal of this guide is to compare different deployment solutions for python web servers along with best solutions for domain name.  
Following the benchmark, a guide will detail step by step how to fully deploy a solution and update its domain name and setup an email address on this domain.

# Solutions for hosting a python server

## Conditions

- python web server (flask & django)
- SQLite or Postgres DB

## Proposed solutions

### Different types of solutions

[Resource Link from fullstackpython](https://www.fullstackpython.com/servers.html)  
[Flask official doc for deployment](https://flask.palletsprojects.com/en/1.1.x/deploying/)

- Bare Metal Server: you depend on the hardware, you pay for your electricity, you do all the setup yourslef
- VPS: you pay for a service which owns big bare metal servers (DigitalOcean, Linode, Vultr, OVH and Scaleway)
- IaaS: you pay for a service with a specific pricing, depending on usage and traffic (AWS, Rackspace)

### PaaS solutions
The Platform as A Service solution takes care of most of the infrastructure for you. You lose in terms of scalability and flexibility but your app is almost ready to go. 

- Heroku
- Google App Engine
- PythonAnywhere
- OpenShift
- AWS CodeStar
- Nitrous.io

#### Heroku
Status: **Tested OK, include DB - free option, no domain name**

From experience, best way to deploy a webapp with low traffic.
- Price: free up to a point (which was never reached for test purposes)
- Integrate easily with Flask and postgres
- Flask & Django support

#### PythonAnywhere
Status: **Tested: ongoing without DB, $5 offer with domain name set**  
- $5/month includes mySQL DB, one webapp
- $12/month includes psql, two webapps

[Test Tutorial](https://help.pythonanywhere.com/pages/Flask/)  
[From Python Script to a Website](https://blog.pythonanywhere.com/169/)  


- Flask & Django Support
- Free for test purposes
- Postgres ($12/month)  & mysql

For the process, follow [this pythonanywherelink](https://help.pythonanywhere.com/pages/Flask/)  
Works with gtihub. Process in a nutshell:  
- create a Flask webapp from the website
- push your app to github
- clone app from python anywhere with https
	- here, if private repo, you will have to generate a ssh key from python anywhere first `ssh-keygen`
	- then add it to github `pbcopy < path_to_public_key` or simply `cat` & copy paste
	- then set up your env `mkvirtualenv --python=/usr/bin/python3.6 my-virtualenv` 
	- then install requirements
- before running the app, check your `WSGI` file and see if everything is good
	- then `python app.py` as usual
- access your webapp. 

Overall, it's a straightforward process. To test: DB, how long does it work without interruption + pricing plan.  
Also, free plan involves: if the app fails, will not restart by itself. And at least one connection on the pythonanywhere setup every 3 months


#### [OpenShift](https://www.openshift.com/products/online/) (by RedHat)

- Flask & Postgres
- Free plan looks attractive for test purposes (although sleeping time)
- Pro plan entry price is high ($50/month)

#### AWS Elastic Beanstalk

To try out.  
[Link to process](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-python-flask.html)

#### GoogleApp engine

#### Azure IIS

### VPS solutions

#### Linode

#### Digital Ocean

# Domain names

- [namecheap](https://www.namecheap.com/) - 8.10e for 12 months, including _whois_ privacy

# Set up combinations

## Pythonanywhere xx Namecheap

### Modalities

- Pythonanywhere **hacker** pricing: 6e/Month (TVA included), MySQL only
- Namecheap custom domain pricing: 10e/year, whoisGuard included

### Set up domain name
- [Setting up the CNAME from namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-to-create-a-cname-record-for-your-domain)
- [Set up on pythonanywhere.com](https://help.pythonanywhere.com/pages/CustomDomains)

### Set up the backend

- Clone your repo from the console ([help if required to generate new keygen](https://help.pythonanywhere.com/pages/UploadingAndDownloadingFiles))
- Set up all your webapp page: 
	- source code
	- WSGI configuration file (you should not run your app from the console)
		```
		import sys
		path = '/home/git1984/lorismat_portfolio'
		if path not in sys.path:
   		 sys.path.append(path)
		from app import app as application
		```
	- path to virtual env
	- `/static/` with your path to the static directory

## Heroku xx Namecheap

[Process is fairly simple](https://devcenter.heroku.com/articles/custom-domains)  
**Note**: make sure you add 'www' in your custom domain name in Heroku!

