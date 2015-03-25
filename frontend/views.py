from django.shortcuts import render

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