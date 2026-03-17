import unittest
import os
import tempfile
import shutil
from sff_parser import SFFParser

class TestSFFParser(unittest.TestCase):
    def setUp(self):
        # Create a temporary directory for tests
        self.test_dir = tempfile.mkdtemp()
        self.dummy_sff = os.path.join(self.test_dir, 'dummy.sff')
        
        # Create a mock valid SFF file with the 'ElecbyteSpr\0\0' signature + version 1.01
        with open(self.dummy_sff, 'wb') as f:
            f.write(b'ElecbyteSpr\x00\x00') # 11 bytes + 1 padding length? Check ElecbyteSpr length: E(1)l(2)e(3)c(4)b(5)y(6)t(7)e(8)S(9)p(10)r(11)
            f.write(b'\x01\x00\x01\x00') # Version 1.01 (1, 0, 1, 0)
            # Dummy sub-data
            f.write(b'\x00' * 500)

    def tearDown(self):
        # Remove the directory after the test
        shutil.rmtree(self.test_dir)

    def test_initialization(self):
        parser = SFFParser(self.dummy_sff)
        self.assertEqual(parser.filepath, self.dummy_sff)

    def test_parse_header_integrity(self):
        # Verify parser reads without corrupting or failing on a valid structure
        parser = SFFParser(self.dummy_sff)
        parser.parse_header()
        self.assertIn("1.01", parser.version)
        
    def test_extract_sprites_creates_metadata(self):
        parser = SFFParser(self.dummy_sff)
        parser.version = "1.01" # Mock header read
        
        output_dir = os.path.join(self.test_dir, 'out')
        parser.extract_sprites(output_dir)
        
        # Verify JSON metadata creation
        meta_path = os.path.join(output_dir, 'metadata.json')
        self.assertTrue(os.path.exists(meta_path))

if __name__ == '__main__':
    unittest.main()
