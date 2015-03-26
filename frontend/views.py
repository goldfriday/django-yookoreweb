from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

import json
import requests

# Create your views here.

URL_ACTIVITIES 		= 'http://192.168.10.15'
URL_CONTENT 		= 'http://192.168.10.123:8000/api'
URL_USERACCOUNT 	= 'http://192.168.10.144:3000/auth'

def home(request):

	# checking the session
	if request.session.get('logged', False):
		pass

	context = {}
	return render(request, 'frontend/views/home.html', context)

def activitystream(request):
    context = {}
    context['activities'] = get_activities('ptchankue')
    return render(request, 'frontend/views/stream.html', context)

def userprofile(request):
    context = {}
    return render(request, 'frontend/views/profile.html', context)

def yookore_login(request):
	if request.method == 'POST':

		url = "http://192.168.10.144:3000/auth/login"
		headers = {'content-type': 'application/json'}

		username = request.POST.get('username')
		password = request.POST.get('password')

		params = {
			"username": username,
			"password":password
		}
		#print params
		error = False
		try: 

			response = requests.post(url, data=json.dumps(params), headers=headers)
		except:
			print 'error when attempting to login'
			error = True
			return render(request, '.')
		if not error:
			data = response.json()
			print data
			context = {"username": data['username'],
			"sessionid": data['sessionid'],
			"fullname": data['fullname']}
			# get activity stream
			activities = get_activities(data['username'])
			if activities!='error':
				context['activities'] = activities
			else:
				context['activities'] = ''
			# get user profile info

			# get friends, pages and groups
			return render(request, 'frontend/views/stream.html', context)
		else:
			return render(request, '.')

def get_activities(username):
	url = "http://192.168.10.15/" + username + "/activities"
	print url
	headers = {'content-type': 'application/json'}

	response = requests.get(url, headers=headers)
	if response:
		data = response.json()
		print data
		return data

	return 'error'

def get_user_profile(username):
	url = "http://192.168.10.144:3000/auth/" + username 
	headers = {'content-type': 'application/json'}
	try:
		response = requests.get(url, headers=headers)
		if response:
			data = response.json()
			return data
	except:
		pass


