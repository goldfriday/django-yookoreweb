from django.shortcuts import render
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Context, loader

from django.core.urlresolvers import reverse

import json
import requests

# Create your views here.

def userprofile(request):
    print ("i am here ")

    context = {}
    context['profile_info'] = get_user_profile('ptchankue')

    return render(request, 'frontend/views/profile.html', context)


def get_user_profile(username):
    print 'calling profile user '
    url = "http://192.168.10.144:3000/auth/profile/" + username
    print url
    headers = {'content-type': 'application/json'}
    try:
        response = requests.get(url, headers=headers)
        if response:
            data = response.json()
            print data
            return data
        else:
            return 'error'

    except:
        print 'An error occured'
        pass
