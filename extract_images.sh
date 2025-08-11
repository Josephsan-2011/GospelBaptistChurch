#!/bin/bash

# Image Extraction Script for Church Website
# This script extracts all image files from category folders and copies them to a single location

echo "🔍 Starting image extraction..."

# Source directory containing category folders
SOURCE_DIR="ChurchWebsiteIMG"

# Destination directory for extracted images
DEST_DIR="extracted_images"

# Remove existing destination directory if it exists
if [ -d "$DEST_DIR" ]; then
    echo "🗑️  Removing existing $DEST_DIR directory..."
    rm -rf "$DEST_DIR"
fi

# Create destination directory
echo "📁 Creating destination directory: $DEST_DIR"
mkdir -p "$DEST_DIR"

# Counter for extracted files
TOTAL_FILES=0

echo "📁 Source: $SOURCE_DIR"
echo "📁 Destination: $DEST_DIR"
echo "--------------------------------------------------"

# Process each category folder
for category in "$SOURCE_DIR"/*/; do
    if [ -d "$category" ]; then
        category_name=$(basename "$category")
        echo ""
        echo "📂 Processing category: $category_name"
        
        # Create category subfolder in destination
        category_dest="$DEST_DIR/$category_name"
        mkdir -p "$category_dest"
        
        # Find and copy all image files
        image_count=0
        for ext in jpg jpeg png gif bmp heic webp JPG JPEG PNG GIF BMP HEIC WEBP; do
            for file in "$category"*."$ext"; do
                if [ -f "$file" ]; then
                    filename=$(basename "$file")
                    cp "$file" "$category_dest/"
                    echo "   ✅ Copied: $filename"
                    ((image_count++))
                    ((TOTAL_FILES++))
                fi
            done
        done
        
        echo "   📊 Found $image_count image files"
    fi
done

# Create summary file
SUMMARY_FILE="$DEST_DIR/EXTRACTION_SUMMARY.txt"
echo "CHURCH WEBSITE IMAGE EXTRACTION SUMMARY" > "$SUMMARY_FILE"
echo "==================================================" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "Total images extracted: $TOTAL_FILES" >> "$SUMMARY_FILE"
echo "Categories processed: $(ls -1 "$SOURCE_DIR" | wc -l)" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "CATEGORY BREAKDOWN:" >> "$SUMMARY_FILE"
echo "------------------------------" >> "$SUMMARY_FILE"

# Add category breakdown to summary
for category in "$SOURCE_DIR"/*/; do
    if [ -d "$category" ]; then
        category_name=$(basename "$category")
        echo "" >> "$SUMMARY_FILE"
        echo "$category_name:" >> "$SUMMARY_FILE"
        
        # Count images in this category
        image_count=$(find "$category" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" -o -iname "*.heic" -o -iname "*.webp" \) | wc -l)
        echo "  - $image_count images" >> "$SUMMARY_FILE"
    fi
done

echo "" >> "$SUMMARY_FILE"
echo "Extraction completed at: $(date)" >> "$SUMMARY_FILE"
echo "Source directory: $(realpath "$SOURCE_DIR")" >> "$SUMMARY_FILE"
echo "Destination directory: $(realpath "$DEST_DIR")" >> "$SUMMARY_FILE"

echo ""
echo "=================================================="
echo "🎉 Extraction completed successfully!"
echo "📊 Total files extracted: $TOTAL_FILES"
echo "📁 Files saved to: $DEST_DIR"
echo "📋 Summary created: $SUMMARY_FILE"
echo ""
echo "📤 Ready for GitHub upload!"
echo ""
echo "To upload to GitHub:"
echo "1. Add the 'extracted_images' folder to your repository"
echo "2. Commit and push the changes"
echo "3. The images will be available in your GitHub repository"
