import asyncio

import websockets

# create handler for each connection

async def handler(websocket, path):
    i = 0
    connIsOpened = True
    while connIsOpened:
        try:
            data = await websocket.recv()

            reply = f"{i}: Data received as: {data}!"

            await websocket.send(reply)

            i = i + 1
        except: 
            connIsOpened = False

 

start_server = websockets.serve(handler, "localhost", 8000)


asyncio.get_event_loop().run_until_complete(start_server)

asyncio.get_event_loop().run_forever()