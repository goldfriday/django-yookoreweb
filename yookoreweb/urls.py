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

    url(r'^search', 'frontend.views.search2'),

    url(r'^test$', 'frontend.views.test'),

    url(r'^photo$', 'frontend.views.photo'),

    url(r'^friends$', 'frontend.views.friends', name="friends"),
    url(r'^profile_photos$', 'frontend.views.profile_photos', name="profile_photos"),

    url(r'^profile/(?P<username>[\w\d]+)$', 'userprofile_app.views.userprofile', name="userprofile"),
    url(r'^profile/(?P<username>[\w\d]+)/about$', 'userprofile_app.views.userprofile_about', name='userprofile_about'),
    url(r'^profile/(?P<username>[\w\d]+)/friends$', 'userprofile_app.views.userprofile_friends', name='userprofile_friends'),
    url(r'^profile/(?P<username>[\w\d]+)/blogs$', 'userprofile_app.views.userprofile_blogs', name='userprofile_blogs'),
    url(r'^profile/(?P<username>[\w\d]+)/blogs/create-post$', 'userprofile_app.views.userprofile_createpost', name='userprofile_createpost'),



    # url(r'^photos', include('photo_app.urls')),


)

