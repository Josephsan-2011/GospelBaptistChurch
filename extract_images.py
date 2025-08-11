#!/usr/bin/env python3
"""
Image Extraction Script for Church Website
This script extracts all image files from category folders and copies them to a single location
for easy GitHub upload.
"""

import os
import shutil
import glob
from pathlib import Path

def extract_images():
    # Source directory containing category folders
    source_dir = "ChurchWebsiteIMG"
    
    # Destination directory for extracted images
    dest_dir = "extracted_images"
    
    # Create destination directory if it doesn't exist
    if os.path.exists(dest_dir):
        shutil.rmtree(dest_dir)
    os.makedirs(dest_dir)
    
    # Image file extensions to look for
    image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.bmp', '*.heic', '*.webp']
    
    # Counter for extracted files
    total_files = 0
    extracted_files = []
    
    print("🔍 Starting image extraction...")
    print(f"📁 Source: {source_dir}")
    print(f"📁 Destination: {dest_dir}")
    print("-" * 50)
    
    # Get all category folders
    category_folders = [f for f in os.listdir(source_dir) if os.path.isdir(os.path.join(source_dir, f))]
    
    for category in sorted(category_folders):
        category_path = os.path.join(source_dir, category)
        print(f"\n📂 Processing category: {category}")
        
        # Create category subfolder in destination
        category_dest = os.path.join(dest_dir, category)
        os.makedirs(category_dest, exist_ok=True)
        
        # Find all image files in this category
        category_files = []
        for ext in image_extensions:
            pattern = os.path.join(category_path, ext)
            category_files.extend(glob.glob(pattern))
            # Also check for uppercase extensions
            pattern_upper = os.path.join(category_path, ext.upper())
            category_files.extend(glob.glob(pattern_upper))
        
        # Remove duplicates and sort
        category_files = sorted(list(set(category_files)))
        
        print(f"   Found {len(category_files)} image files")
        
        # Copy each image file
        for file_path in category_files:
            filename = os.path.basename(file_path)
            dest_path = os.path.join(category_dest, filename)
            
            try:
                shutil.copy2(file_path, dest_path)
                extracted_files.append({
                    'category': category,
                    'filename': filename,
                    'source': file_path,
                    'destination': dest_path
                })
                total_files += 1
                print(f"   ✅ Copied: {filename}")
            except Exception as e:
                print(f"   ❌ Error copying {filename}: {e}")
    
    # Create a summary file
    summary_path = os.path.join(dest_dir, "EXTRACTION_SUMMARY.txt")
    with open(summary_path, 'w', encoding='utf-8') as f:
        f.write("CHURCH WEBSITE IMAGE EXTRACTION SUMMARY\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Total images extracted: {total_files}\n")
        f.write(f"Categories processed: {len(category_folders)}\n\n")
        
        f.write("CATEGORY BREAKDOWN:\n")
        f.write("-" * 30 + "\n")
        
        # Group files by category
        by_category = {}
        for file_info in extracted_files:
            cat = file_info['category']
            if cat not in by_category:
                by_category[cat] = []
            by_category[cat].append(file_info['filename'])
        
        for category in sorted(by_category.keys()):
            f.write(f"\n{category}:\n")
            for filename in sorted(by_category[category]):
                f.write(f"  - {filename}\n")
        
        f.write(f"\n\nExtraction completed at: {Path().absolute()}\n")
        f.write(f"Source directory: {os.path.abspath(source_dir)}\n")
        f.write(f"Destination directory: {os.path.abspath(dest_dir)}\n")
    
    print("\n" + "=" * 50)
    print(f"🎉 Extraction completed successfully!")
    print(f"📊 Total files extracted: {total_files}")
    print(f"📁 Files saved to: {dest_dir}")
    print(f"📋 Summary created: {summary_path}")
    print("\n📤 Ready for GitHub upload!")
    print("\nTo upload to GitHub:")
    print("1. Add the 'extracted_images' folder to your repository")
    print("2. Commit and push the changes")
    print("3. The images will be available in your GitHub repository")

if __name__ == "__main__":
    try:
        extract_images()
    except KeyboardInterrupt:
        print("\n\n❌ Extraction cancelled by user")
    except Exception as e:
        print(f"\n❌ Error during extraction: {e}")
        import traceback
        traceback.print_exc()
