import os
from PIL import Image
from rembg import remove, new_session

input_path = r"c:\Users\SARTHAK MAKKAR\Desktop\My Portfolio\app\public\assets\hero-car.png"
output_path = r"c:\Users\SARTHAK MAKKAR\Desktop\My Portfolio\app\public\assets\hero-car-isolated.png"

print(f"Opening {input_path}...")
img = Image.open(input_path)
orig_size = img.size
print(f"Original size: {orig_size}")

# Resize to max 1200 width to avoid memory issues
max_w = 1200
scale = max_w / orig_size[0]
new_size = (max_w, int(orig_size[1] * scale))
print(f"Resizing to {new_size}...")
img_resized = img.resize(new_size, Image.Resampling.LANCZOS)

print("Creating u2netp session...")
session = new_session("u2netp")

print("Removing background...")
result = remove(img_resized, session=session)

print(f"Saving to {output_path}...")
result.save(output_path, "PNG")
print(f"Successfully saved {output_path} ({os.path.getsize(output_path)} bytes)!")
