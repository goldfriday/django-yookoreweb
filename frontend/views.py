from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

import json
import requests

# Create your views here.

def home(request):
    context = {}
    return render(request, 'frontend/views/home.html', context)

def activitystream(request):
    context = {}
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
		print params
		response = requests.post(url, data=json.dumps(params), headers=headers)
		if response:
			data = response.json()
			print data
			context = {}
			context['session_d'] = data['sessionid']
			return render(request, 'frontend/views/stream.html', context)
		else:
			return render(request, '.')