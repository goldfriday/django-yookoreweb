

class ActivityObject(object):
	
	def __init__(self, **attrs):
		if 'previous' in attrs:
			self.previous 		= attrs['previous']
		if 'itemsperpage' in attrs:
			self.itemsperpage 	= attrs['itemsperpage']
		if 'next' in attrs:
			self.next 	= attrs['next']
		if 'list' in attrs:
			# get the list of activity
			self.list 	= attrs['list']
	
	def getList(self):
		pass