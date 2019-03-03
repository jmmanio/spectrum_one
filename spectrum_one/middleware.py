from datetime import datetime
from django.utils.deprecation import MiddlewareMixin


class LastVisitMiddleware(MiddlewareMixin):

    def process_request(self, request):

        # Number of visits
        try:
            request.session['prev_visit_count'] = request.session['visit_count']
        except:
            request.session['prev_visit_count'] = 0

        try:
            request.session['visit_count'] += 1
        except Exception as e:
            request.session['visit_count'] = 1



        # Date and time of last visit
        now = datetime.now()

        try:
            request.session['prev_last_visit'] = request.session['last_visit']
        except Exception as e:
            request.session['prev_last_visit'] = now.strftime('%m/%d/%Y, %I:%M:%S%p')

        request.session['last_visit'] = now.strftime('%m/%d/%Y, %I:%M:%S%p')
