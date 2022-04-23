from predictor import Predictor
import cv2

predictor = Predictor()

cam = cv2.VideoCapture(0)
img_counter = 0
img_text = ['','']

while True:
    ret, frame = cam.read()
    frame = cv2.flip(frame,1)

    img = cv2.rectangle(frame, (425,100),(625,300), (0,255,0), thickness=2, lineType=8, shift=0)

    imcrop = img[102:298, 427:623]
        
    cv2.putText(frame, str(img_text[1]), (30, 400), cv2.FONT_HERSHEY_TRIPLEX, 1.5, (0, 255, 0))
    cv2.imshow("test", frame)
    cv2.imshow("mask", imcrop)
            
    img_name = "../temp/img.png"
    save_img = cv2.resize(imcrop, (predictor.image_x, predictor.image_y))
    cv2.imwrite(img_name, save_img)
    img_text = predictor.predict(img_name)
    print(str(img_text[0]))
        

    if cv2.waitKey(1) == 27:
        break


cam.release()
cv2.destroyAllWindows()