# PDF Files Directory

This directory contains PDF files for the Rice Thailand knowledge base.

## How to add PDF files:

1. **Place your PDF files in this directory** (`public/pdfs/`)
2. **Name them according to the filenames in the code:**
   - `cultivation-guide.pdf` - เทคนิคการปลูกข้าวหอมมะลิ
   - `ipm-guide.pdf` - การจัดการศัตรูพืชและโรคข้าว
   - `awd-technique.pdf` - ระบบการให้น้ำข้าวแบบประหยัด
   - `organic-fertilizer.pdf` - การใช้ปุ๋ยอินทรีย์
   - `rice-milling.pdf` - กระบวนการสีข้าว
   - `rice-drying.pdf` - เทคโนโลยีการอบแห้งข้าว
   - `brown-rice-products.pdf` - ผลิตภัณฑ์จากข้าวกล้อง
   - And more...

## File Structure:
```
public/
└── pdfs/
    ├── cultivation-guide.pdf
    ├── ipm-guide.pdf
    ├── awd-technique.pdf
    ├── organic-fertilizer.pdf
    ├── rice-milling.pdf
    ├── rice-drying.pdf
    ├── brown-rice-products.pdf
    └── ... (other PDF files)
```

## Notes:
- Files in the `public` folder are served directly by Vite
- URLs will be `/pdfs/filename.pdf`
- Make sure file names match exactly what's in the code
- PDF files should be optimized for web (compressed)