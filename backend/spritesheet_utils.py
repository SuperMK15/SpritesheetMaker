from PIL import Image
import io, base64

def create_spritesheet(matrix, images, sprite_width, sprite_height, padding):
    num_rows = len(matrix)
    num_columns = max(len(row) for row in matrix) if num_rows > 0 else 0

    sheet_width = num_columns * (sprite_width + padding) - padding
    sheet_height = num_rows * (sprite_height + padding) - padding
    spritesheet = Image.new("RGBA", (sheet_width, sheet_height), (255, 255, 255, 0))

    for row_idx, row in enumerate(matrix):
        for col_idx, img_name in enumerate(row):
            if img_name in images:
                img_data = base64.b64decode(images[img_name].split(",")[1])
                img = Image.open(io.BytesIO(img_data))
                img_resized = img.resize((sprite_width, sprite_height))
                x_offset = col_idx * (sprite_width + padding)
                y_offset = row_idx * (sprite_height + padding)
                spritesheet.paste(img_resized, (x_offset, y_offset))

    buffer = io.BytesIO()
    spritesheet.save(buffer, format="PNG")
    buffer.seek(0)
    return base64.b64encode(buffer.read()).decode("utf-8")
