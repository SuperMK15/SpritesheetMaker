from PIL import Image
import os

def create_spritesheet_with_icc_from_jagged_matrix(image_matrix, image_folder, output_path, sprite_width, sprite_height, padding=0):
    images = []
    icc_profiles = []

    num_rows = len(image_matrix)
    num_columns = max(len(row) for row in image_matrix) if num_rows > 0 else 0

    for row in image_matrix:
        for img_name in row:
            img_path = os.path.join(image_folder, img_name)
            img = Image.open(img_path)
            icc_profile = img.info.get('icc_profile', None)
            images.append(img)
            icc_profiles.append(icc_profile)

    sheet_width = num_columns * (sprite_width + padding) - padding
    sheet_height = num_rows * (sprite_height + padding) - padding
    spritesheet = Image.new('RGBA', (sheet_width, sheet_height), (255, 255, 255, 0))

    index = 0
    for row_idx, row in enumerate(image_matrix):
        for col_idx, img_name in enumerate(row):
            img = images[index]
            index += 1

            x_offset = col_idx * (sprite_width + padding)
            y_offset = row_idx * (sprite_height + padding)

            img_resized = img.resize((sprite_width, sprite_height))
            spritesheet.paste(img_resized, (x_offset, y_offset))

    if icc_profiles:
        spritesheet.info['icc_profile'] = icc_profiles[0]

    spritesheet.save(output_path)
    print(f"Spritesheet saved to {output_path}")

