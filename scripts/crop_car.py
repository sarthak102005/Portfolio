from PIL import Image

path = r"c:\Users\SARTHAK MAKKAR\Desktop\My Portfolio\app\public\assets\hero-car-isolated.png"
img = Image.open(path)

# Get bounding box of non-zero alpha
bbox = img.getbbox()
print(f"Original size: {img.size}, bbox: {bbox}")
if bbox:
    # Add a tiny 10px margin
    w, h = img.size
    cropped = img.crop((max(0, bbox[0]-10), max(0, bbox[1]-10), min(w, bbox[2]+10), min(h, bbox[3]+10)))
    print(f"Cropped size: {cropped.size}")
    cropped.save(path, "PNG")
    print("Cropped and saved!")
