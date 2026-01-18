# PATH: backend/betoo/monitoring/beat_schedule.py

from celery.schedules import crontab
from betoo.celery import app

app.conf.beat_schedule = {
    'monitor-payments-every-5-min': {
        'task': 'monitoring.tasks.task_monitor_payments',
        'schedule': crontab(minute='*/5'),  # toutes les 5 minutes
    },
    'generate-invoices-every-10-min': {
        'task': 'monitoring.tasks.task_generate_invoices',
        'schedule': crontab(minute='*/10'),  # toutes les 10 minutes
    },
}
