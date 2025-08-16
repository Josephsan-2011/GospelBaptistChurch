#!/usr/bin/env python3
"""
Image Scanner Script for Gospel Baptist Church Website
Scans the ChurchWebsiteIMG folder and generates an images.json file
"""

import os
import json
from pathlib import Path
from datetime import datetime

def scan_images_folder(root_path="ChurchWebsiteIMG"):
    """
    Recursively scan the ChurchWebsiteIMG folder and collect all image files
    """
    images_data = {}
    root_path = Path(root_path)
    
    if not root_path.exists():
        print(f"Error: {root_path} folder not found!")
        return None
    
    # Supported image extensions
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp', '.heic'}
    
    print(f"Scanning {root_path} folder...")
    
    # Scan each subfolder
    for item in root_path.iterdir():
        if item.is_dir() and not item.name.startswith('.'):
            category_name = item.name
            print(f"  Scanning category: {category_name}")
            
            images_data[category_name] = {
                "category": category_name,
                "display_name": format_category_name(category_name),
                "images": [],
                "total_count": 0,
                "last_updated": datetime.now().isoformat()
            }
            
            # Scan images in this category folder
            for image_file in item.iterdir():
                if image_file.is_file() and image_file.suffix.lower() in image_extensions:
                    image_info = {
                        "filename": image_file.name,
                        "path": str(image_file.relative_to(root_path.parent)),
                        "size_bytes": image_file.stat().st_size,
                        "size_mb": round(image_file.stat().st_size / (1024 * 1024), 2),
                        "extension": image_file.suffix.lower(),
                        "modified": datetime.fromtimestamp(image_file.stat().st_mtime).isoformat()
                    }
                    
                    images_data[category_name]["images"].append(image_info)
                    images_data[category_name]["total_count"] += 1
            
            # Sort images by filename
            images_data[category_name]["images"].sort(key=lambda x: x["filename"])
            
            print(f"    Found {images_data[category_name]['total_count']} images")
    
    return images_data

def format_category_name(category_name):
    """
    Convert folder names to display-friendly names
    """
    # Replace hyphens and underscores with spaces, then title case
    formatted = category_name.replace('-', ' ').replace('_', ' ').title()
    
    # Special cases for better formatting
    special_cases = {
        "Church Baptism": "Church Baptism",
        "Church Camp": "Church Camp", 
        "Church General Photos": "Church General Photos",
        "Church Holidays": "Church Holidays",
        "Church Mother-Father Day": "Church Mother & Father Day",
        "Church Picnic": "Church Picnic",
        "Church Sunday School": "Church Sunday School",
        "Church Service": "Church Service",
        "Pastor Paul Family": "Pastor Paul Family"
    }
    
    return special_cases.get(category_name, formatted)

def generate_summary(images_data):
    """
    Generate a summary of all images found
    """
    total_categories = len(images_data)
    total_images = sum(cat["total_count"] for cat in images_data.values())
    total_size_mb = sum(
        sum(img["size_mb"] for img in cat["images"]) 
        for cat in images_data.values()
    )
    
    summary = {
        "scan_summary": {
            "total_categories": total_categories,
            "total_images": total_images,
            "total_size_mb": round(total_size_mb, 2),
            "scan_date": datetime.now().isoformat(),
            "scan_timestamp": datetime.now().timestamp()
        },
        "categories": images_data
    }
    
    return summary

def save_json(data, filename="images.json"):
    """
    Save the data to a JSON file
    """
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"✅ Successfully saved {filename}")
        return True
    except Exception as e:
        print(f"❌ Error saving {filename}: {e}")
        return False

def main():
    """
    Main function to run the image scanner
    """
    print("🖼️  Gospel Baptist Church Image Scanner")
    print("=" * 50)
    
    # Scan the images folder
    images_data = scan_images_folder()
    
    if not images_data:
        print("❌ Failed to scan images folder")
        return
    
    # Generate summary
    summary_data = generate_summary(images_data)
    
    # Save to JSON file
    if save_json(summary_data):
        print("\n📊 Scan Summary:")
        print(f"   Categories: {summary_data['scan_summary']['total_categories']}")
        print(f"   Total Images: {summary_data['scan_summary']['total_images']}")
        print(f"   Total Size: {summary_data['scan_summary']['total_size_mb']} MB")
        print(f"   Generated: {summary_data['scan_summary']['scan_date']}")
        
        print("\n📁 Categories found:")
        for category, data in summary_data['categories'].items():
            print(f"   • {data['display_name']}: {data['total_count']} images")
    
    print("\n✨ Image scanning complete!")

if __name__ == "__main__":
    main()
