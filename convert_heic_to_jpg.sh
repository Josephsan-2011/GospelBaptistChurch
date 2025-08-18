#!/bin/bash

echo "🔄 Converting HEIC files to JPG..."

# Find all HEIC files and convert them to JPG
find . -name "*.heic" -type f | while read -r heic_file; do
    # Get the directory and filename without extension
    dir_path=$(dirname "$heic_file")
    filename=$(basename "$heic_file" .heic)
    jpg_file="$dir_path/$filename.jpg"
    
    echo "Converting: $heic_file → $jpg_file"
    
    # Convert HEIC to JPG using macOS sips command
    sips -s format jpeg "$heic_file" --out "$jpg_file"
    
    # Check if conversion was successful
    if [ -f "$jpg_file" ]; then
        echo "✅ Successfully converted: $jpg_file"
        
        # Get file sizes for comparison
        heic_size=$(du -h "$heic_file" | cut -f1)
        jpg_size=$(du -h "$jpg_file" | cut -f1)
        echo "   HEIC size: $heic_size, JPG size: $jpg_size"
    else
        echo "❌ Failed to convert: $heic_file"
    fi
done

echo ""
echo "🎉 HEIC to JPG conversion complete!"
echo "📁 Check the converted JPG files in their respective directories"
