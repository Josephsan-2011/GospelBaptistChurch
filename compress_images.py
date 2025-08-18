#!/usr/bin/env python3
"""
Image Compression Script for Web Optimization
Compresses large images to reduce file sizes for faster loading
"""

import os
import sys
from PIL import Image
import argparse

def compress_image(input_path, output_path, quality=85, max_width=1920):
    """Compress an image with specified quality and max width"""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize if too wide
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Save with compression
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Get file sizes
            original_size = os.path.getsize(input_path)
            compressed_size = os.path.getsize(output_path)
            savings = ((original_size - compressed_size) / original_size) * 100
            
            return {
                'success': True,
                'original_size': original_size,
                'compressed_size': compressed_size,
                'savings': savings
            }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def find_large_images(directory, min_size_mb=1.0):
    """Find images larger than specified size"""
    large_images = []
    min_size_bytes = min_size_mb * 1024 * 1024
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                file_path = os.path.join(root, file)
                try:
                    size = os.path.getsize(file_path)
                    if size > min_size_bytes:
                        large_images.append({
                            'path': file_path,
                            'size_mb': size / (1024 * 1024)
                        })
                except OSError:
                    continue
    
    return sorted(large_images, key=lambda x: x['size_mb'], reverse=True)

def main():
    parser = argparse.ArgumentParser(description='Compress large images for web use')
    parser.add_argument('--quality', type=int, default=85, help='JPEG quality (1-100)')
    parser.add_argument('--max-width', type=int, default=1920, help='Maximum image width')
    parser.add_argument('--min-size', type=float, default=1.0, help='Minimum size in MB to compress')
    parser.add_argument('--output-dir', default='compressed', help='Output directory for compressed images')
    
    args = parser.parse_args()
    
    print("🔍 Finding large images...")
    large_images = find_large_images('.', args.min_size)
    
    if not large_images:
        print("✅ No large images found!")
        return
    
    print(f"📁 Found {len(large_images)} large images:")
    for img in large_images:
        print(f"   {img['path']} ({img['size_mb']:.1f} MB)")
    
    # Create output directory
    os.makedirs(args.output_dir, exist_ok=True)
    
    print(f"\n🔄 Compressing images with quality {args.quality} and max width {args.max_width}...")
    
    total_original = 0
    total_compressed = 0
    
    for img in large_images:
        input_path = img['path']
        filename = os.path.basename(input_path)
        output_path = os.path.join(args.output_dir, filename)
        
        print(f"\nCompressing: {filename}")
        result = compress_image(input_path, output_path, args.quality, args.max_width)
        
        if result['success']:
            original_mb = result['original_size'] / (1024 * 1024)
            compressed_mb = result['compressed_size'] / (1024 * 1024)
            savings = result['savings']
            
            print(f"   ✅ Original: {original_mb:.1f} MB")
            print(f"   ✅ Compressed: {compressed_mb:.1f} MB")
            print(f"   ✅ Savings: {savings:.1f}%")
            
            total_original += result['original_size']
            total_compressed += result['compressed_size']
        else:
            print(f"   ❌ Error: {result['error']}")
    
    if total_original > 0:
        total_savings = ((total_original - total_compressed) / total_original) * 100
        print(f"\n🎉 Compression complete!")
        print(f"📊 Total original size: {total_original / (1024 * 1024):.1f} MB")
        print(f"📊 Total compressed size: {total_compressed / (1024 * 1024):.1f} MB")
        print(f"📊 Total savings: {total_savings:.1f}%")
        print(f"📁 Compressed images saved in: {args.output_dir}/")

if __name__ == "__main__":
    main()
