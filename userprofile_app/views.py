from django.shortcuts import render

import requests

# Create your views here.
from frontend.services import get_activities, get_blogposts, get_friends_for


def userprofile_about(request, username=None):
    if username is None:
        username = request.session.get('username')

    context = {}
    populate_context(context, username)
    context['active'] = "about"
    return render(request, 'frontend/userprofile/profile_about.html', context)


def userprofile(request, username=None):
    if username is None:
        username = request.session.get('username')

    # raise Exception(userdata)
    context = {}
    populate_context(context, username)
    context['active'] = "stream"
    context['friends_list'] = get_friends_for(username)
    return render(request, 'frontend/views/profile.html', context)


def userprofile_friends(request, username=None):
    if username is None:
        username = request.session.get('username')

    context = {}

    populate_context(context, username)
    context['friends_list'] = get_friends_for(username)
    context['active'] = "friends"
    return render(request, 'frontend/userprofile/profile_friends.html', context)


def userprofile_blogs(request, username=None):
    if username is None:
        username = request.session.get('username')

    context = {}
    populate_context(context, username)

    context['blogposts'] = get_blogposts(username)
    context['active'] = 'blogs'

    return render(request, 'frontend/userprofile/profile_blogs.html', context)


def update_user_profile(request, username=None):
    if username is None:
        username = request.session.get('username')
    context = {}
    populate_context(context, username)
    context['friends_list'] = get_friends_for(username)
    context['profile_info'] = get_user_profile(username)
    context['username'] = username
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

    return render(request, 'frontend/userprofile/update_profile.html', context)


def userprofile_createpost(request, username):
    if username is None:
        username = request.session.get('username')

    context = {}
    populate_context(context, username)


    return render(request, 'frontend/userprofile/profile_createpost.html', context)


def populate_context(context, username):
    userdata = get_user_profile(username)
    context['userdata'] = userdata
    context['activities'] = get_activities(username)
    context['fullname'] = userdata['firstname'] + " " + userdata['lastname']
    return context


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

