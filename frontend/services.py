import requests

URL_ACTIVITIES = 'http://192.168.10.15'
URL_CONTENT = 'http://192.168.10.123:8000/api'
URL_USERACCOUNT = 'http://192.168.10.144:3000/auth'
URL_SEARCH = 'http://192.168.10.20:9200/info/users'

def get_activities(username):
    url = URL_ACTIVITIES + "/" + username + "/activities"
    print url
    headers = {'content-type': 'application/json'}

    response = requests.get(url, headers=headers)
    if response:
        data = response.json()
        return data

    return 'error'

def get_user_profile(username):
    # firstname, lastname, imageurl
    print 'Get user profile '
    url = URL_USERACCOUNT + "/profile/" + username

    headers = {'content-type': 'application/json'}

    try:
        response = requests.get(url, headers=headers)
        if response:
            data = response.json()
            return data
        else:
            return 'error'
    except Exception, e:
        raise e

def get_blogposts(username):
    url = URL_CONTENT +"/blogposts/post/" + username + "/"

    headers = {'content-type': 'application/json'}

    response = requests.get(url, headers=headers)
    if response:
        data = response.json()
        return data

    return 'error'
