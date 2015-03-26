from django import template

from django.core.serializers import serialize
from django.db.models.query import QuerySet
from django.utils import simplejson


register = template.Library()

# arg needs to be an integer
@register.filter(name='access')
def access(value, arg):
    return value[arg]

@register.filter(name='getitem')
def getitem ( item, arg ):
  	return item[arg]

@register.filter(name='jsonify')
def jsonify(object):
    if isinstance(object, QuerySet):
        return serialize('json', object)
    return simplejson.dumps(object)

