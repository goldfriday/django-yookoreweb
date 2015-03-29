from django import template

from django.core.serializers import serialize
from django.db.models.query import QuerySet
from django.utils import simplejson

from datetime import date, timedelta
register = template.Library()

# arg needs to be an integer
@register.filter(name='access')
def access(value, arg):
    return value[arg]

@register.filter(name='getitem')
def getitem ( item, arg ):
  	return item[arg]


@register.filter(name='timediff')
def timediff (time):
	delta = time - date.today()
	print delta

	return delta


@register.filter(name='jsonify')
def jsonify(object):
    if isinstance(object, QuerySet):
        return serialize('json', object)
    return simplejson.dumps(object)

@register.simple_tag
def geturl(url, timeout=None):
    """
    Usage: {% geturl url [timeout] %}

    Examples:
    {% geturl "http://example.com/path/to/content/" %}
    {% geturl object.urlfield 1 %} 
    """
    import socket
    from urllib2 import urlopen
    socket_default_timeout = socket.getdefaulttimeout()
    if timeout is not None:
        try:
            socket_timeout = float(timeout)
        except ValueError:
            raise template.TemplateSyntaxError, "timeout argument of geturl tag, if provided, must be convertible to a float"
        try:
            socket.setdefaulttimeout(socket_timeout)
        except ValueError:
            raise template.TemplateSyntaxError, "timeout argument of geturl tag, if provided, cannot be less than zero"
    try:
        try: 
            content = urlopen(url).read()
        finally: # reset socket timeout
            if timeout is not None:
                socket.setdefaulttimeout(socket_default_timeout) 
    except:
        content = ''        
    return content
