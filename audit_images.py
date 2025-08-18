#!/usr/bin/env python3
"""
Image Audit Script
Analyzes which images in ChurchWebsiteIMG are actually used in the website
and identifies unused images for deletion
"""

import os
import re
from pathlib import Path

def extract_image_paths_from_code():
    """Extract all image paths referenced in HTML files"""
    print("🔍 Extracting image paths from website code...")
    
    used_images = set()
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for html_file in html_files:
        print(f"   📝 Scanning: {html_file}")
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all ChurchWebsiteIMG references
        pattern = r'ChurchWebsiteIMG/[^"\s]+'
        matches = re.findall(pattern, content)
        
        for match in matches:
            # Clean up the path
            clean_path = match.strip('"\'')
            used_images.add(clean_path)
            print(f"      ✅ Found: {clean_path}")
    
    return used_images

def get_all_images_in_folders():
    """Get all image files currently in ChurchWebsiteIMG folders"""
    print("\n🔍 Scanning all images in ChurchWebsiteIMG folders...")
    
    all_images = set()
    for root, dirs, files in os.walk('ChurchWebsiteIMG'):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                # Get relative path from ChurchWebsiteIMG
                rel_path = os.path.relpath(os.path.join(root, file), '.')
                all_images.add(rel_path)
                print(f"   📁 Found: {rel_path}")
    
    return all_images

def analyze_image_usage():
    """Main analysis function"""
    print("🚀 Starting image usage audit...")
    print("=" * 60)
    
    # Get images used in code
    used_images = extract_image_paths_from_code()
    
    # Get all images in folders
    all_images = get_all_images_in_folders()
    
    # Find unused images
    unused_images = all_images - used_images
    
    print("\n" + "=" * 60)
    print("📊 AUDIT RESULTS:")
    print(f"📁 Total images in folders: {len(all_images)}")
    print(f"✅ Images used in website: {len(used_images)}")
    print(f"🗑️  Unused images: {len(unused_images)}")
    
    if unused_images:
        print("\n🗑️  UNUSED IMAGES TO DELETE:")
        for img in sorted(unused_images):
            print(f"   {img}")
    
    print("\n✅ USED IMAGES (KEEPING):")
    for img in sorted(used_images):
        print(f"   {img}")
    
    return used_images, unused_images

def delete_unused_images(unused_images):
    """Delete unused images from the repository"""
    if not unused_images:
        print("\n🎉 No unused images to delete!")
        return
    
    print(f"\n🗑️  Deleting {len(unused_images)} unused images...")
    
    deleted_count = 0
    for img_path in unused_images:
        try:
            if os.path.exists(img_path):
                os.remove(img_path)
                print(f"   ✅ Deleted: {img_path}")
                deleted_count += 1
            else:
                print(f"   ⚠️  File not found: {img_path}")
        except Exception as e:
            print(f"   ❌ Error deleting {img_path}: {e}")
    
    print(f"\n🎉 Successfully deleted {deleted_count} unused images!")

def main():
    """Main function"""
    used_images, unused_images = analyze_image_usage()
    
    if unused_images:
        response = input(f"\n❓ Delete {len(unused_images)} unused images? (y/N): ")
        if response.lower() == 'y':
            delete_unused_images(unused_images)
        else:
            print("❌ Deletion cancelled.")
    else:
        print("\n🎉 All images are being used! No cleanup needed.")

if __name__ == "__main__":
    main()
