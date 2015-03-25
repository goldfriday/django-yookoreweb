from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'yookoreweb.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'frontend.views.home', name='home'),
    url(r'^activity$', 'frontend.views.activitystream', name='activity'),
    url(r'^profile$', 'frontend.views.userprofile', name='profile'),
)
