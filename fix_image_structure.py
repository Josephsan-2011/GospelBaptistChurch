#!/usr/bin/env python3
"""
Comprehensive Image Structure Fix Script
1. Rename folders to use underscores instead of spaces
2. Convert all HEIC files to JPG
3. Update HTML files to point to correct paths
"""

import os
import shutil
import subprocess
import re
from pathlib import Path

def rename_folders_to_underscores():
    """Rename all folders in ChurchWebsiteIMG to use underscores instead of spaces"""
    print("🔄 Renaming folders to use underscores...")
    
    # Define the folder mappings (old_name -> new_name)
    folder_mappings = {
        "Church Sunday School": "Church_Sunday_School",
        "Church General Photos": "Church_General_Photos", 
        "Church Mother-Father Day": "Church_Mother_Father_Day",
        "Pastor Paul Family": "Pastor_Paul_Family"
    }
    
    renamed_folders = {}
    
    for old_name, new_name in folder_mappings.items():
        old_path = os.path.join("ChurchWebsiteIMG", old_name)
        new_path = os.path.join("ChurchWebsiteIMG", new_name)
        
        if os.path.exists(old_path):
            try:
                shutil.move(old_path, new_path)
                renamed_folders[old_name] = new_name
                print(f"   ✅ Renamed: {old_name} → {new_name}")
            except Exception as e:
                print(f"   ❌ Error renaming {old_name}: {e}")
        else:
            print(f"   ⚠️  Folder not found: {old_name}")
    
    return renamed_folders

def convert_heic_to_jpg():
    """Convert all HEIC files to JPG using macOS sips command"""
    print("\n🔄 Converting HEIC files to JPG...")
    
    heic_files = []
    for root, dirs, files in os.walk("ChurchWebsiteIMG"):
        for file in files:
            if file.lower().endswith('.heic'):
                heic_files.append(os.path.join(root, file))
    
    if not heic_files:
        print("   ✅ No HEIC files found!")
        return []
    
    converted_files = []
    for heic_file in heic_files:
        jpg_file = heic_file.replace('.heic', '.jpg')
        try:
            # Use sips command to convert HEIC to JPG
            result = subprocess.run(['sips', '-s', 'format', 'jpeg', heic_file, '--out', jpg_file], 
                                 capture_output=True, text=True)
            
            if result.returncode == 0 and os.path.exists(jpg_file):
                converted_files.append((heic_file, jpg_file))
                print(f"   ✅ Converted: {os.path.basename(heic_file)} → {os.path.basename(jpg_file)}")
                
                # Remove the original HEIC file
                os.remove(heic_file)
                print(f"   🗑️  Removed: {os.path.basename(heic_file)}")
            else:
                print(f"   ❌ Failed to convert: {os.path.basename(heic_file)}")
        except Exception as e:
            print(f"   ❌ Error converting {os.path.basename(heic_file)}: {e}")
    
    return converted_files

def update_html_paths(renamed_folders):
    """Update all HTML files to use the new folder names and JPG extensions"""
    print("\n🔄 Updating HTML files...")
    
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for html_file in html_files:
        print(f"   📝 Processing: {html_file}")
        
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Update folder names in paths
        for old_name, new_name in renamed_folders.items():
            old_path = f'ChurchWebsiteIMG/{old_name}'
            new_path = f'ChurchWebsiteIMG/{new_name}'
            content = content.replace(old_path, new_path)
        
        # Update HEIC references to JPG
        content = re.sub(r'\.heic"', '.jpg"', content)
        content = re.sub(r'\.heic\'', '.jpg\'', content)
        
        # Update specific image paths that might have spaces
        content = content.replace('ChurchWebsiteIMG/Church Baptism/', 'ChurchWebsiteIMG/Church_Baptism/')
        content = content.replace('ChurchWebsiteIMG/Church Camp/', 'ChurchWebsiteIMG/Church_Camp/')
        content = content.replace('ChurchWebsiteIMG/Church Picnic/', 'ChurchWebsiteIMG/Church_Picnic/')
        content = content.replace('ChurchWebsiteIMG/Church Holidays/', 'ChurchWebsiteIMG/Church_Holidays/')
        content = content.replace('ChurchWebsiteIMG/Church Service/', 'ChurchWebsiteIMG/Church_Service/')
        
        # Write updated content back to file
        if content != original_content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"      ✅ Updated: {html_file}")
        else:
            print(f"      ⚠️  No changes needed: {html_file}")

def rename_image_files():
    """Rename image files to use underscores instead of spaces"""
    print("\n🔄 Renaming image files to use underscores...")
    
    renamed_files = []
    
    for root, dirs, files in os.walk("ChurchWebsiteIMG"):
        for file in files:
            if ' ' in file:
                old_path = os.path.join(root, file)
                new_name = file.replace(' ', '_')
                new_path = os.path.join(root, new_name)
                
                try:
                    shutil.move(old_path, new_path)
                    renamed_files.append((old_path, new_path))
                    print(f"   ✅ Renamed: {file} → {new_name}")
                except Exception as e:
                    print(f"   ❌ Error renaming {file}: {e}")
    
    return renamed_files

def main():
    print("🚀 Starting comprehensive image structure fix...")
    print("=" * 60)
    
    # Step 1: Rename folders
    renamed_folders = rename_folders_to_underscores()
    
    # Step 2: Convert HEIC to JPG
    converted_files = convert_heic_to_jpg()
    
    # Step 3: Rename image files
    renamed_files = rename_image_files()
    
    # Step 4: Update HTML paths
    update_html_paths(renamed_folders)
    
    print("\n" + "=" * 60)
    print("🎉 Image structure fix complete!")
    print(f"📁 Folders renamed: {len(renamed_folders)}")
    print(f"🖼️  HEIC files converted: {len(converted_files)}")
    print(f"📄 Image files renamed: {len(renamed_files)}")
    print("\n💡 Next steps:")
    print("   1. Review the changes")
    print("   2. Commit to git")
    print("   3. Push to GitHub")

if __name__ == "__main__":
    main()
