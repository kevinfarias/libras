import cv2
import numpy as np
from keras.models import load_model
from PIL import Image 
from keras.preprocessing import image

class Predictor:
    letters = ['A', 'B', 'C' , 'D', 'E', 'F', 'G', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y']

    def __init__(self, image_x = 64, image_y = 64):
        self.image_x = image_x
        self.image_y = image_y
        self.classifier = load_model('../models/other_models/model_epoch_48_98.6_final.h5')

    def predict(self, imgSrc):
        test_image = image.load_img(imgSrc, target_size=(self.image_x, self.image_y))
        test_image = image.img_to_array(test_image)
        test_image = np.expand_dims(test_image, axis = 0)
        result = self.classifier.predict(test_image)

        bigger, class_index = -1, -1

        key = 0
        for letter in self.letters:
            if result[0][key] > bigger:
              bigger = result[0][key]
              class_index = key
            
            key = key + 1

        return [result, self.letters[class_index]]