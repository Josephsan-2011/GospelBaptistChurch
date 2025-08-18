#!/usr/bin/env python3
"""
Update all HTML files to use the new folder names with underscores
"""

import os
import re

def update_html_paths():
    """Update all HTML files to use the new folder names"""
    print("🔄 Updating all HTML files with new folder names...")
    
    # Define all the folder name mappings
    folder_mappings = {
        'ChurchWebsiteIMG/Church Baptism/': 'ChurchWebsiteIMG/Church_Baptism/',
        'ChurchWebsiteIMG/Church Camp/': 'ChurchWebsiteIMG/Church_Camp/',
        'ChurchWebsiteIMG/Church General Photos/': 'ChurchWebsiteIMG/Church_General_Photos/',
        'ChurchWebsiteIMG/Church Holidays/': 'ChurchWebsiteIMG/Church_Holidays/',
        'ChurchWebsiteIMG/Church Mother-Father Day/': 'ChurchWebsiteIMG/Church_Mother_Father_Day/',
        'ChurchWebsiteIMG/Church Picnic/': 'ChurchWebsiteIMG/Church_Picnic/',
        'ChurchWebsiteIMG/Church Service/': 'ChurchWebsiteIMG/Church_Service/',
        'ChurchWebsiteIMG/Church Sunday School/': 'ChurchWebsiteIMG/Church_Sunday_School/',
        'ChurchWebsiteIMG/Pastor Paul Family/': 'ChurchWebsiteIMG/Pastor_Paul_Family/'
    }
    
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for html_file in html_files:
        print(f"   📝 Processing: {html_file}")
        
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Update all folder paths
        for old_path, new_path in folder_mappings.items():
            content = content.replace(old_path, new_path)
        
        # Update HEIC references to JPG (just in case)
        content = re.sub(r'\.heic"', '.jpg"', content)
        content = re.sub(r'\.heic\'', '.jpg\'', content)
        
        # Write updated content back to file
        if content != original_content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"      ✅ Updated: {html_file}")
        else:
            print(f"      ⚠️  No changes needed: {html_file}")

if __name__ == "__main__":
    update_html_paths()
    print("\n🎉 All HTML files updated!")
