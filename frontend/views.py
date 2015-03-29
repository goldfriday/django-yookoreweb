from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

from django.core.urlresolvers import reverse

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

	if request.method == "POST":

		if request.POST.get('request_type') == 'status_update':
			# call status update upload
			post_status_update(request)
		elif request.POST.get('request_type') == 'blogpost':
			post_blogpost(request)
		

	context = {}
	username = 'ptchankue'
	context['username']   = username
	context['activities'] = get_activities(username)
	#context['activities'] = get_activities('borna2exl')

	return render(request, 'frontend/views/stream.html', context)

def userprofile(request):
    context = {}
    return render(request, 'frontend/views/profile.html', context)

def yookore_login(request):
	if request.method == 'GET':
		print 'GET'

	if request.method == 'POST':

		url = URL_USERACCOUNT + "/login"
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
			#print data
			context = {
			"username": data['username'],
			"sessionid": data['sessionid'],
			"fullname": data['fullname']
			}
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
	url = URL_ACTIVITIES+ "/" + username + "/activities"
	print url
	headers = {'content-type': 'application/json'}

	response = requests.get(url, headers=headers)
	if response:
		data = response.json()
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

def post_status_update(request):
	print 'posting a status update'
	headers = {'content-type': 'application/json'}

	body 		= request.POST.get('body')
	username 	= request.POST.get('username')
	print username

	payload = {
		"author": username,
		"body": body
	}
	print payload

	if len(body) > 0 and username:
		url = URL_CONTENT + "/status_updates/post/" + username + "/"
		print url
		error = False
		try: 

			response = requests.post(url, data=json.dumps(payload), headers=headers)
		except:
			print 'error when attempting to post'
			error = True
			
	else:
		print 'bad parameters'

def post_blogpost(request):
	print 'posting a blog post'
	headers = {'content-type': 'application/json'}

	title 		= request.POST.get('title')
	body 		= request.POST.get('body')
	username 	= request.POST.get('username')

	payload = {
		"author": username,
		"title" : title,
		"body": body
	}
	if len(body) > 0 and len(title) > 0 and username:
		url = URL_CONTENT + "/blogposts/post/" + username + "/"
		print url
		error = False
		try: 

			response = requests.post(url, data=json.dumps(payload), headers=headers)
		except BaseException, e:
			print 'error when attempting to create a blogpost: ', e
			error = True
			
	else:
		print 'bad parameters'

def content_like(request, id, username):
	print 'Liking the content:', id, username
	print request.GET.get(id)
	print request.POST.get(id)
	if id:
		url = URL_CONTENT + "/content/" + id + "/likes/"
		print url 
		try:
			payload = {
				"author": username,
				"object_id" : id
			}

			headers = {'content-type': 'application/json'}
			response = requests.post(url, data=json.dumps(payload), headers=headers)
		except BaseException, e:
			print e

	return HttpResponseRedirect('/activity')
	#return HttpResponseRedirect(reverse('activitystream'))

def content_comment(id):
	print 'Commenting the content:', id, username
	print request.GET.get(id)
	print request.POST.get(id)
	if id:
		url = URL_CONTENT + "/content/" + id + "/comments/"
		print url 
		try:
			payload = {
				"author": username,
				"object_id" : id
			}

			headers = {'content-type': 'application/json'}
			response = requests.post(url, data=json.dumps(payload), headers=headers)
		except BaseException, e:
			print e

	return HttpResponseRedirect('/activity')


