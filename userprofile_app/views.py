from django.shortcuts import render
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Context, loader

from django.core.urlresolvers import reverse

import json
import requests

# Create your views here.
from frontend.services import get_activities, get_blogposts
from frontend.services import URL_CONTENT


def userprofile_about(request):
    username = request.session.get('username')
    context = {}
    populate_context(context, username)
    return render(request, 'frontend/userprofile/profile_about.html', context)


def userprofile_friends(request):

    context = {}
    username = request.session.get('username')
    populate_context(context, username)

    print 'In search friends '
    # Getting username from cookies or the session
    url = URL_CONTENT + "/socialgraph/friends/" + request.session['username'] + "/"
    print url
    headers = {'content-type': 'application/json'}

    response = requests.get(url, headers=headers)

    if response:
        data = response.json()
        results = []

    if data:
        # Parsing all friends to retrieve the imageurl
        for f in data:
            print f
            results.append(get_user_profile(f['username']))

        print results
        context['friends_list'] = results

    else:
        print 'Error occured when searching'

    return render(request, 'frontend/userprofile/profile_friends.html', context)


def userprofile(request):

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

def userprofile_blogs(request):
    context = {}
    populate_context(context, request.session.get('username'))

    context['blogposts'] = get_blogposts(request.session.get('username'))

    return render(request, 'frontend/userprofile/profile_blogs.html', context)

def populate_context(context, username):
    userdata = get_user_profile(username)
    context['userdata'] = userdata
    context['activities'] = get_activities(username)
    context['fullname'] = userdata['firstname'] + " " + userdata['lastname']
    return context
