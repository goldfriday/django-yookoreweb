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


def update_user_profile(request):
    context = {}
    username = 'ptchankue'
    context ['username'] = username
    context['profile_info'] = get_user_profile('ptchankue')
    if request.method == 'GET':
        print 'calling user profile'
        url = "http://192.168.10.144:3000/auth/profile/" + username
        print url
        headers = {'content-type': 'application/json'}
        try:
            response = request.get(url, headers=headers)
            if response:
                data = response.json()
                print data
                return data
            else:
                return 'error'
        except:
            print 'An error occured'

        return render(request, 'frontend/views/update_profile.html', context)

    if request.method == 'PUT':
        print 'calling user profile update url'
        url = "http://192.168.10.144:3000/auth/profile/update" + username
        headers = {'content-type': 'application/json'}

        params = {
            "birthdate": birthdate,
            "gender": gender,
            "title": title,
            "password": password,
            "relationshipstatus": relationshipstatus,
            "timezone": timezone,
            "homecountry": homecountry,
            "imageurl": imageurl,
            "alternate_email": alternate_email,
            "religion": religion,
            "cellphone": cellphone,
            "biography": biography
        }
        # print params
        error = False
        try:

            response = requests.put(url, data=json.dumps(params), headers=headers)
        except:
            print 'unable to update user profile'
            error = True
            return render(request, '.')
        if not error:
            data = response.json()
            # print data
            context = {
                "username": data['username'],
                "sessionid": data['sessionid'],
                "fullname": data['fullname']
            }

            return render(request, 'frontend/views/update_profile.html', context)
        else:
            return render(request, '.')