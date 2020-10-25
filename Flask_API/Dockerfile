FROM tiangolo/uwsgi-nginx-flask:python3.6-alpine3.7
WORKDIR /project
ADD . /project
RUN pip install -r requirements.txt
CMD ["python","app.py"]