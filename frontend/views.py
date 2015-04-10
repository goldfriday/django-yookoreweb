import json

from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
import requests
from services import get_activities, get_user_profile

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


def activitystream(request):
    # validate session with user object
    username = request.session.get('username')

    # Use the username to pull the profile data for the user

    if not username:
        # go back to the logim page
        return HttpResponseRedirect(reverse('login'))
    else:
        userdata = get_user_profile(username)
        context = {}
        context['username'] = username
        context['activities'] = get_activities(username)
        context['fullname'] = userdata['firstname'] + " " + userdata['lastname']
        context['userdata'] = userdata
        # raise Exception(userdata)

        return render(request, 'frontend/views/stream.html', context)




def yookore_login(request):
    if request.method == 'GET':
        print 'GET'
        return render_to_response('frontend/views/home.html')

    if request.method == 'POST':

        url = URL_USERACCOUNT + "/login"
        headers = {'content-type': 'application/json'}

        username = request.POST.get('username')
        password = request.POST.get('password')

        params = {
            "username": username,
            "password": password
        }
        # print params
        error = False
        try:

            response = requests.post(url, data=json.dumps(params), headers=headers)
        except:
            print 'error when attempting to login'
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
            # get activity stream
            activities = get_activities(data['username'])
            if activities != 'error':
                context['activities'] = activities
            else:
                context['activities'] = ''

            # setting up the session
            request.session['username'] = context['username']
            request.session['sessionid'] = context['sessionid']
            request.session['fullname'] = context['fullname']

            # get user profile info

            # get friends, pages and groups

            # creating or updating cookies
            url = reverse('activity')
            return HttpResponseRedirect(url)
        # return render(request, 'frontend/views/stream.html', context)
        else:
            return render(request, '.')






def post_status_update(request):
    print 'posting a status update'
    headers = {'content-type': 'application/json'}

    body = request.POST.get('body')
    username = request.POST.get('username')
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

    title = request.POST.get('title')
    body = request.POST.get('body')
    username = request.POST.get('username')

    payload = {
        "author": username,
        "title": title,
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
                "object_id": id
            }

            headers = {'content-type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers)
        except BaseException, e:
            print e

    return HttpResponseRedirect('/activity')


# return HttpResponseRedirect(reverse('activitystream'))

def content_comment(request, username, id):
    print 'Commenting the content:', id, username
    print request.GET.get(id)
    print request.POST.get(id)
    if id:
        url = URL_CONTENT + "/content/" + id + "/comments/"
        print url
        try:
            payload = {
            "author": username,
            "object_id": id
            }

            headers = {'content-type': 'application/json'}
            response = requests.post(url, data=json.dumps(payload), headers=headers)
        except BaseException, e:
            print e

    return HttpResponseRedirect('/activity')


def search(request, q):
    print 'in search'
    context = {}
    context['nb_result'] = 10
    context['results'] = get_search_result(q)
    print context  # , request
    print 'Rendering template '
    return HttpResponse(json.dumps(context, indent=4))
    return render(request, 'frontend/views/stream.html', context)


# return HttpResponseRedirect('/search/'+q, context)

def search2(request, q):
    if request.is_ajax:
        print 'From ajax'
    print 'in search 2'
    print 'Get: ' + q

    size = request.GET.get("size")
    index = request.GET.get("from")

    context = {}
    context['payload'] = get_search_result(q, size, index)

    print context
    #return HttpResponse(json.dumps(context, indent=4))
    return render(request, 'frontend/views/search.html', context)

def get_search_result(query, size, index):
    url = URL_SEARCH + "/_search?q=firstname:" + query

    if size:
        url += '&size=' + size

    if index:
        url += '&from=' + index

    print url
    headers = {'content-type': 'application/json'}

    response = requests.get(url, headers=headers)
    if response:
        data = response.json()
        nb = data['hits']['total']
        result_list = data['hits']['hits']
        # Constructing the results
        results = []
        for r in result_list:
            results.append(r['_source'])

        payload = {}
        payload["results"] = results
        payload["nb"] = nb
        payload["query"] = query

        if index and size:
            payload["next"] = index + size

            if int(index) > size:
                payload["previous"] = int(index) - size

            if nb > int(index) and int(index) > 0:
                payload["current_page"] = nb / int(index)



        print payload
        return payload

    else:
        print 'Error occured when searching'
        return 'error'

def test(request):
    print 'in test'
    context = {}
    context['results'] = get_search_result('Patr')
    print context
    return render(request, 'frontend/views/search.html', context)


def photo(request):
    # print 'In photophoto'
    context = {}
    return render(request, 'frontend/views/photo.html', context)


def profile_friends(request):
    username = request.session.get('username')
    userdata = get_user_profile(username)

    # raise Exception(userdata)
    context = {}
    context['userdata'] = userdata
    context['activities'] = get_activities(username)
    context['fullname'] = userdata['firstname'] + " " + userdata['lastname']
    return render(request, 'frontend/views/friends.html', context)

def profile_photos(request):
    username = request.session.get('username')
    userdata = get_user_profile(username)

    # raise Exception(userdata)
    context = {}
    context['userdata'] = userdata
    context['activities'] = get_activities(username)
    context['fullname'] = userdata['firstname'] + " " + userdata['lastname']
    return render(request, 'frontend/userprofile/photos.html', context)

def friends(request):
    print 'In search friends '
    # Getting username from cookies or the session

    url = URL_CONTENT + "/socialgraph/friends/" + request.session['username'] + "/"
    print url
    headers = {'content-type': 'application/json'}

    response = requests.get(url, headers=headers)
    context = {}
    if response:
        data = response.json()

        results = []

        if data:
            # Parsing all friends to retrieve the imageurl
            for f in data:
                print f
                results.append(get_user_profile(f['username']))

        print results
        context['friend_list'] = results

    else:
        print 'Error occured when searching'

    return render(request, 'frontend/views/friends.html', context)


