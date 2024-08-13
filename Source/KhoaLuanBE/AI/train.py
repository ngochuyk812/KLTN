# %% [markdown] {"execution":{"iopub.status.busy":"2024-07-03T17:22:05.399210Z","iopub.execute_input":"2024-07-03T17:22:05.399593Z","iopub.status.idle":"2024-07-03T17:23:47.412293Z","shell.execute_reply.started":"2024-07-03T17:22:05.399562Z","shell.execute_reply":"2024-07-03T17:23:47.411402Z"}}
# !pip install tensorflow
# 

# %% [code] {"execution":{"iopub.status.busy":"2024-07-07T14:43:41.298832Z","iopub.execute_input":"2024-07-07T14:43:41.299133Z","iopub.status.idle":"2024-07-07T14:43:57.239977Z","shell.execute_reply.started":"2024-07-07T14:43:41.299108Z","shell.execute_reply":"2024-07-07T14:43:57.238802Z"}}
import tensorflow as tf
import tensorflow.keras as keras 
import matplotlib.pyplot as plt
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np
from collections import defaultdict
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, Model
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical

# %% [code] {"execution":{"iopub.status.busy":"2024-07-07T14:43:57.241925Z","iopub.execute_input":"2024-07-07T14:43:57.242569Z","iopub.status.idle":"2024-07-07T14:43:57.251440Z","shell.execute_reply.started":"2024-07-07T14:43:57.242536Z","shell.execute_reply":"2024-07-07T14:43:57.250511Z"}}
# This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

# Input data files are available in the read-only "../input/" directory
# For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

import os
# search_string = "json"
# for dirname, _, filenames in os.walk('/kaggle/input'):
#     for filename in filenames:
#         if search_string in filename:
#             print(os.path.join(dirname, filename))

# %% [code] {"execution":{"iopub.status.busy":"2024-07-07T14:43:57.252761Z","iopub.execute_input":"2024-07-07T14:43:57.253346Z","iopub.status.idle":"2024-07-07T14:43:57.267613Z","shell.execute_reply.started":"2024-07-07T14:43:57.253307Z","shell.execute_reply":"2024-07-07T14:43:57.266826Z"}}

class COCOParser:
    def __init__(self, anns_file, imgs_dir):
        with open(anns_file, 'r') as f:
            coco = json.load(f)
            
        self.annIm_dict = defaultdict(list)        
        self.cat_dict = {} 
        self.annId_dict = {}
        self.im_dict = {}
        self.licenses_dict = {}
        self.cat_dict = {} 
        for cat in coco['categories']:
            self.cat_dict[cat['id']] = cat
        for ann in coco['annotations']:           
            self.annIm_dict[ann['image_id']].append(ann) 
            self.annId_dict[ann['id']]=ann
        for img in coco['images']:
            self.im_dict[img['id']] = img
        for cat in coco['categories']:
            self.cat_dict[cat['id']] = cat
        for license in coco['licenses']:
            self.licenses_dict[license['id']] = license
    def get_imgIds(self):
        return list(self.im_dict.keys())
    def get_annIds(self, im_ids):
        im_ids=im_ids if isinstance(im_ids, list) else [im_ids]
        return [ann['id'] for im_id in im_ids for ann in self.annIm_dict[im_id]]
    def load_anns(self, ann_ids):
        im_ids=ann_ids if isinstance(ann_ids, list) else [ann_ids]
        return [self.annId_dict[ann_id] for ann_id in ann_ids]        
    def load_cats(self, class_ids):
        class_ids=class_ids if isinstance(class_ids, list) else [class_ids]
        return [self.cat_dict[class_id] for class_id in class_ids]
    def get_imgLicenses(self,im_ids):
        im_ids=im_ids if isinstance(im_ids, list) else [im_ids]
        lic_ids = [self.im_dict[im_id]["license"] for im_id in im_ids]
        return [self.licenses_dict[lic_id] for lic_id in lic_ids]
    def get_path_images(self,im_ids):
        im_ids=im_ids if isinstance(im_ids, list) else [im_ids]
        lic_ids = [self.im_dict[im_id] for im_id in im_ids]
        return lic_ids
    def load_cats(self):
        print("Danh sách các loại nhãn:")
        for cat_id, category in self.cat_dict.items():
            print(f"ID: {cat_id}, Name: {category['name']}")
            


# %% [code] {"execution":{"iopub.status.busy":"2024-07-07T14:43:57.269608Z","iopub.execute_input":"2024-07-07T14:43:57.269912Z","iopub.status.idle":"2024-07-07T14:43:58.928642Z","shell.execute_reply.started":"2024-07-07T14:43:57.269865Z","shell.execute_reply":"2024-07-07T14:43:58.927807Z"}}
def data_augment(image):
    p_spatial = tf.random.uniform([], 0, 1.0, dtype = tf.float32)
    p_rotate = tf.random.uniform([], 0, 1.0, dtype = tf.float32)
    p_pixel_1 = tf.random.uniform([], 0, 1.0, dtype = tf.float32)
    p_pixel_2 = tf.random.uniform([], 0, 1.0, dtype = tf.float32)
    p_pixel_3 = tf.random.uniform([], 0, 1.0, dtype = tf.float32)
    
    # Flips
    image = tf.image.random_flip_left_right(image)
    image = tf.image.random_flip_up_down(image)
    
    if p_spatial > .75:
        image = tf.image.transpose(image)
        
    # Rotates
    if p_rotate > .75:
        image = tf.image.rot90(image, k = 3) # rotate 270º
    elif p_rotate > .5:
        image = tf.image.rot90(image, k = 2) # rotate 180º
    elif p_rotate > .25:
        image = tf.image.rot90(image, k = 1) # rotate 90º
        
    # Pixel-level transforms
    if p_pixel_1 >= .4:
        image = tf.image.random_saturation(image, lower = .7, upper = 1.3)
    if p_pixel_2 >= .4:
        image = tf.image.random_contrast(image, lower = .8, upper = 1.2)
    if p_pixel_3 >= .4:
        image = tf.image.random_brightness(image, max_delta = .1)
        
    return image
# Load image from file
def load_image(image_path):
    image = tf.io.read_file(image_path)
    image = tf.image.decode_image(image, channels=3)
    image = tf.image.convert_image_dtype(image, tf.float32)
    return image

def crop_image(image_path, x, y, w, h):
    # Mở ảnh
    img = Image.open(image_path)
    # Cắt ảnh
    cropped_img = img.crop((x, y, x + w, y + h))
    return cropped_img

# Transformer Encoder
class TransformerEncoder(layers.Layer):
    def __init__(self, num_heads, mlp_dim, dropout=0.1):
        super(TransformerEncoder, self).__init__()
        self.num_heads = num_heads
        self.mlp_dim = mlp_dim
        self.dropout = dropout

    def build(self, input_shape):
        _, num_patches, embed_dim = input_shape
        self.attention = layers.MultiHeadAttention(num_heads=self.num_heads, key_dim=embed_dim)
        self.dense1 = layers.Dense(units=self.mlp_dim, activation='relu')
        self.dense2 = layers.Dense(units=embed_dim)
        self.layer_norm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layer_norm2 = layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = layers.Dropout(rate=self.dropout)
        self.dropout2 = layers.Dropout(rate=self.dropout)

    def call(self, inputs, training=False):
        attention_output = self.attention(inputs, inputs)
        attention_output = self.dropout1(attention_output, training=training)
        attention_output = self.layer_norm1(inputs + attention_output)

        mlp_output = self.dense1(attention_output)
        mlp_output = self.dense2(mlp_output)
        mlp_output = self.dropout2(mlp_output, training=training)
        mlp_output = self.layer_norm2(attention_output + mlp_output)
        return mlp_output
    
# Define the Vision Transformer model
class VisionTransformer(Model):
    def __init__(self, num_classes, num_layers, num_heads, mlp_dim, patch_size, input_size=(64,64), dropout=0.1):
        super(VisionTransformer, self).__init__()
        self.patch_size = patch_size
        self.num_classes = num_classes
        self.num_layers = num_layers
        self.encoder = [TransformerEncoder(num_heads=num_heads, mlp_dim=mlp_dim, dropout=dropout)
                        for _ in range(num_layers)]
        self.mlp_head = layers.Dense(units=num_classes, activation='softmax')
        H, W = input_size
        num_patches_h = H // patch_size
        num_patches_w = W // patch_size
        self.num_patches = num_patches_h * num_patches_w
        output_dim = self.patch_size ** 2 * 3

        self.position_embedding = layers.Embedding(input_dim=self.num_patches, output_dim=output_dim )

    def call(self, inputs, training=False):
        x = self.extract_and_embed_patches(inputs)
        for encoder in self.encoder:
            x = encoder(x, training=training)
        x = tf.reduce_mean(x, axis=1)  # Global average pooling
        x = self.mlp_head(x)
        return x
    
    def extract_and_embed_patches(self, inputs):
      # Extract patches from input images
      patches = tf.image.extract_patches(
          images=inputs,
          sizes=[1, self.patch_size, self.patch_size, 1],
          strides=[1, self.patch_size, self.patch_size, 1],
          rates=[1, 1, 1, 1],
          padding='VALID'
      )

      num_patches = patches.shape[1] * patches.shape[2]  # Calculate number of patches

      # Flatten patches
      patches = tf.reshape(patches, (tf.shape(patches)[0], -1, patches.shape[-1]))

      # Calculate output dimension (assuming patches are flattened)
      # Consider revising based on your specific patch structure
      output_dim = self.patch_size**2 * inputs.shape[-1]  # Might need adjustment

      print(f"Input shape: {inputs.shape}")
      print(f"Patch size: {self.patch_size}")
      print(f"Number of patches: {num_patches}")
      print(f"Output dimension: {output_dim}")

      # Add positional embeddings (consider more sophisticated techniques)
      positions = tf.range(start=0, limit=self.num_patches, delta=1)
      pos_embed = self.position_embedding(positions)

      # Add position embedding to patches
      patches = patches + pos_embed

      return patches
