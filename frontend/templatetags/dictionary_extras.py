from django import template

from django.core.serializers import serialize
from django.db.models.query import QuerySet
from django.utils.timesince import timesince

from django.utils.translation import ugettext, ungettext


from datetime import date, timedelta, datetime
import random

register = template.Library()

# arg needs to be an integer
@register.filter(name='access')
def access(value, arg):
    return value[arg]

@register.filter(name='getitem')
def getitem(item, arg):
    return item[arg]


# @register.filter(name='get_random')
# def get_random():
# 	try:
# 		res = str(random.random()* 100)
# 	except TemplateSyntaxError, e:
# 		raise e
# 	return res

@register.filter(name='test_filter')
def test_filter(value):
    return 'Test-Test'


@register.filter(name='timedelta')
def timedelta(value, arg=None):
	#print ' Run time delta >> '
	try:
		if not value:
			return ''
		# converting unicode to datetime
		value  = datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%f')
		if arg:
			cmp = arg
		else:
			cmp = datetime.now()
		if value > cmp:
			return "in %s" % timesince(cmp,value)
		else:
			return "%s ago" % timesince(value,cmp)
	except Exception, e:
		raise e
	
@register.filter(name='timesince_human')
def humanize_timesince(date):
    delta = datetime.now() - datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%f')

    num_years = delta.days / 365
    if (num_years > 0):
        return ungettext(u"%d year ago", u"%d years ago", num_years) % num_years

    num_weeks = delta.days / 7
    if (num_weeks > 0):
        return ungettext(u"%d week ago", u"%d weeks ago", num_weeks) % num_weeks

    if (delta.days > 0):
        return ungettext(u"%d day ago", u"%d days ago", delta.days) % delta.days

    num_hours = delta.seconds / 3600
    if (num_hours > 0):
        return ungettext(u"%d hour ago", u"%d hours ago", num_hours) % num_hours

    num_minutes = delta.seconds / 60
    if (num_minutes > 0):
        return ungettext(u"%d minute ago", u"%d minutes ago", num_minutes) % num_minutes

    return ugettext(u"just a few seconds ago")

