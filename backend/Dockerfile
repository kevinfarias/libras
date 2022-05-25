FROM python:3.9-bullseye

WORKDIR /home/app

COPY . .

RUN pip install -r ./requirements.txt

CMD python ./main/socket/server.py