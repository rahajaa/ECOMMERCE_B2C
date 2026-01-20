FROM python:3.12-slim

WORKDIR /app/be_too

COPY be_too/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY /be_too/ .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
