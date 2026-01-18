# PATH: backend/betoo/celery.py

import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'betoo.settings')

app = Celery('betoo')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# optionnel : debug tasks
@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
