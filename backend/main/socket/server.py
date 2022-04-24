import asyncio

import websockets

import os

import sys

from predictor import Predictor

import base64

from PIL import Image 

predictor = Predictor(os.path.abspath("../../models/other_models/model_epoch_48_98.6_final.h5"))
# create handler for each connection

async def handler(websocket, path):
    i = 0
    connIsOpened = True
    while connIsOpened:
        try:
            data = await websocket.recv()

            try:
                img_src = os.path.abspath("../../temp/img.png")
                
                with open(img_src, "wb") as fh:
                    fh.write(base64.urlsafe_b64decode(data[22:]))

                img_text = predictor.predict(img_src)[1]
                reply = f"{i}: Data received as: {img_text}!"
            except Exception as e:
                reply = f"{i}: Data received as: {e}!"

            await websocket.send(reply)

            i = i + 1
        except: 
            connIsOpened = False

 

start_server = websockets.serve(handler, "localhost", 8000)


asyncio.get_event_loop().run_until_complete(start_server)

asyncio.get_event_loop().run_forever()