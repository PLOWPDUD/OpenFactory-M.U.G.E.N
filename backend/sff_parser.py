import os
import struct
import json

class SFFParser:
    def __init__(self, filepath):
        self.filepath = filepath
        self.version = None
        self.groups = {}
        # Metadata storage for each sprite
        self.sprites_metadata = []

    def parse_header(self):
        """Reads the SFF header to determine version and properties."""
        with open(self.filepath, 'rb') as f:
            signature = f.read(11)
            if signature != b'ElecbyteSpr':
                raise ValueError("Not a valid SFF file")
            
            f.seek(11)
            f.read(1) # padding
            
            # Read version info
            ver_bytes = f.read(4)
            self.version = f"{ver_bytes[3]}.{ver_bytes[2]:02d}{ver_bytes[1]:02d}"
            
            print(f"Loaded SFF version {self.version}")

    def extract_sprites(self, output_dir):
        """Extracts sprites to the output_dir as PNGs. Implementation differs by version."""
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        print(f"Extraction of {self.version} started...")
        
        # MOCKED EXTRACTION LOOP
        # SFF 1.01 requires parsing the 8-bit linked lists of sprites and matching palettes
        # SFF 2.000 uses lz5/rle chunk compression and 32-bit pixel blocks
        
        # We will mock the extracted data for now to represent the metadata saving:
        mock_sprites = [
            {"group": 0, "index": 0, "x_offset": 50, "y_offset": 100},
            {"group": 0, "index": 1, "x_offset": 52, "y_offset": 100},
            {"group": 20, "index": 0, "x_offset": 45, "y_offset": 110}
        ]
        
        for i, spr in enumerate(mock_sprites):
            # Mock generating a PNG file
            png_path = os.path.join(output_dir, f"{spr['group']}_{spr['index']}.png")
            with open(png_path, "wb") as f_png:
                # write dummy PNG bytes (not real)
                f_png.write(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR") 
            self.sprites_metadata.append(spr)
            
        # Write metadata JSON for frontend to consume
        meta_path = os.path.join(output_dir, "metadata.json")
        with open(meta_path, "w") as f_meta:
            json.dump(self.sprites_metadata, f_meta, indent=2)
            
        print(f"Extraction complete. Wrote metadata to {meta_path}")

if __name__ == '__main__':
    import sys
    if len(sys.argv) > 2:
        parser = SFFParser(sys.argv[1])
        try:
            parser.parse_header()
            parser.extract_sprites(sys.argv[2])
        except Exception as e:
            print(f"Error: {e}")
    else:
        print("Usage: python sff_parser.py <path_to_sff> <output_dir>")
