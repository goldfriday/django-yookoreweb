from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'yookoreweb.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'frontend.views.home', name='home'),
    url(r'^activity$', 'frontend.views.activitystream', name='activity'),
    #url(r'^profile$', 'frontend.views.userprofile', name='profile'),

    url(r'^login$', 'frontend.views.yookore_login'),
    url(r'^like/(?P<id>[^/]+)/(?P<username>[\w\d]+)$', 'frontend.views.content_like'),
    url(r'^comment/(?P<id>[^/]+)/(?P<username>[\w\d]+)$', 'frontend.views.content_comment'),
    url(r'^search/(?P<q>[\w\d\ ]+)$', 'frontend.views.search2'),

    url(r'^test$', 'frontend.views.test'),

    url(r'^photo$', 'frontend.views.photo'),

    url(r'^friends$', 'frontend.views.friends'),

    url(r'^profile', 'userprofile_app.views.userprofile', name="userprofile"),


)
