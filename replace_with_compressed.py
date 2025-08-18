#!/usr/bin/env python3
"""
Replace large images with compressed versions
This script will replace the original large images with the compressed versions
"""

import os
import shutil
import argparse

def replace_images(compressed_dir, backup_originals=True):
    """Replace original images with compressed versions"""
    
    if not os.path.exists(compressed_dir):
        print(f"❌ Compressed directory '{compressed_dir}' not found!")
        return False
    
    # Create backup directory if requested
    if backup_originals:
        backup_dir = "original_images_backup"
        os.makedirs(backup_dir, exist_ok=True)
        print(f"📁 Creating backup in: {backup_dir}/")
    
    compressed_files = os.listdir(compressed_dir)
    replaced_count = 0
    backup_count = 0
    
    print(f"🔄 Replacing {len(compressed_files)} images...")
    
    for filename in compressed_files:
        compressed_path = os.path.join(compressed_dir, filename)
        original_path = filename
        
        # Check if original exists
        if os.path.exists(original_path):
            if backup_originals:
                # Backup original
                backup_path = os.path.join(backup_dir, filename)
                shutil.copy2(original_path, backup_path)
                backup_count += 1
                print(f"   💾 Backed up: {filename}")
            
            # Replace with compressed version
            shutil.copy2(compressed_path, original_path)
            replaced_count += 1
            print(f"   ✅ Replaced: {filename}")
        else:
            print(f"   ⚠️  Original not found: {filename}")
    
    print(f"\n🎉 Replacement complete!")
    print(f"📊 Images replaced: {replaced_count}")
    if backup_originals:
        print(f"📊 Originals backed up: {backup_count}")
        print(f"📁 Backup location: {backup_dir}/")
    
    return True

def main():
    parser = argparse.ArgumentParser(description='Replace large images with compressed versions')
    parser.add_argument('--compressed-dir', default='compressed', help='Directory containing compressed images')
    parser.add_argument('--no-backup', action='store_true', help='Skip backing up original images')
    
    args = parser.parse_args()
    
    print("🔄 Image Replacement Script")
    print("=" * 40)
    
    success = replace_images(args.compressed_dir, not args.no_backup)
    
    if success:
        print("\n✅ All done! Your images are now optimized for web use.")
        print("💡 Next steps:")
        print("   1. Test your website locally")
        print("   2. Commit changes to git")
        print("   3. Push to GitHub")
        print("   4. Enable GitHub Pages")
    else:
        print("\n❌ Something went wrong. Check the error messages above.")

if __name__ == "__main__":
    main()
