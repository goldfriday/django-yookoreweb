from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Context, loader

from django.core.urlresolvers import reverse

import json
import requests

# Create your views here.

URL_ACTIVITIES = 'http://192.168.10.15'
URL_CONTENT = 'http://192.168.10.123:8000/api'
URL_USERACCOUNT = 'http://192.168.10.144:3000/auth'
URL_SEARCH = 'http://192.168.10.20:9200/info/users'


def home(request):
	# checking the session
	if request.session.get('logged', False):
		pass

	context = {}
	return render(request, 'frontend/views/home.html', context)


def test(request):
	return render(request, 'frontend/views/photo.html', context)


def test2(request):
	return render(request, 'frontend/views/photo.html', context)
