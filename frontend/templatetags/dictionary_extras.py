from django import template

from django.core.serializers import serialize
from django.db.models.query import QuerySet
from django.utils.timesince import timesince

from datetime import date, timedelta, datetime
import random

register = template.Library()

# arg needs to be an integer
@register.filter(name='access')
def access(value, arg):
    return value[arg]

@register.filter(name='getitem')
def getitem ( item, arg ):
  	return item[arg]


@register.filter(name='get_random')
def get_random():
	try:
		res = str(random.random()* 100)
	except TemplateSyntaxError, e:
		print e
	return res

@register.filter(name='test_filter')
def test_filter(value):
	return 'Test-Test'


@register.filter(name='timedelta')
def timedelta(value, arg=None):
	#print ' Run time delta >> '
	try:
		if not value:
			return ''
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
	
#register.filter('timedelta',timedelta)

