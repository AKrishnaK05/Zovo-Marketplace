from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    new_data = []
    # Threshold for what we consider "white"
    threshold = 240 
    
    for item in datas:
        # If all R, G, B are above threshold, make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Successfully processed {input_path} and saved to {output_path}")

if __name__ == "__main__":
    # Process Symbol
    make_transparent(
        "C:/Users/adwai/.gemini/antigravity/brain/ffa847ad-cdb0-4409-b205-cf29ed348f66/zovo_symbol_refined_raw_1773251490542.png",
        "c:/Users/adwai/OneDrive/Documents/LPU/Zovo/zovo-frontend/src/assets/zovo_symbol.png"
    )
    # Process Full Wordmark
    make_transparent(
        "C:/Users/adwai/.gemini/antigravity/brain/ffa847ad-cdb0-4409-b205-cf29ed348f66/zovo_full_wordmark_final_raw_1773251669893.png",
        "c:/Users/adwai/OneDrive/Documents/LPU/Zovo/zovo-frontend/src/assets/zovo_full.png"
    )
