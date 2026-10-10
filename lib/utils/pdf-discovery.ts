import fs from 'fs';
import path from 'path';

export interface PDFDocumentItem {
  id: string;
  title: string;
  filename: string;
  publicUrl: string;
  fileSize: string;
  relativePath: string;
  category: 'paint' | 'general';
}

/**
 * Dynamically discovers all PDF files stored in public/assets/pdf/ and subdirectories.
 * Runs on server-side / build-time in Next.js.
 */
export function discoverPDFs(): PDFDocumentItem[] {
  const pdfDir = path.join(process.cwd(), 'public', 'assets', 'pdf');
  if (!fs.existsSync(pdfDir)) {
    return [];
  }

  const pdfFiles: PDFDocumentItem[] = [];

  function scanDir(dir: string, relativeSubDir = '') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = relativeSubDir ? path.join(relativeSubDir, entry.name) : entry.name;

        if (entry.isDirectory()) {
          scanDir(fullPath, relPath);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
          const stats = fs.statSync(fullPath);
          const sizeInMB = (stats.size / (1024 * 1024)).toFixed(1);
          const sizeStr = stats.size >= 1024 * 1024 ? `${sizeInMB} MB` : `${Math.round(stats.size / 1024)} KB`;

          // Format clean human-readable title from filename
          // e.g., GlamorColourCombination.pdf -> Glamor Colour Combination
          const nameWithoutExt = entry.name.replace(/\.pdf$/i, '');
          const formattedTitle = nameWithoutExt
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[-_]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          const relativeUrlPath = relPath.split(path.sep).join('/');
          const publicUrl = `/assets/pdf/${encodeURIComponent(relativeUrlPath).replace(/%2F/g, '/')}`;

          pdfFiles.push({
            id: entry.name,
            title: formattedTitle,
            filename: entry.name,
            publicUrl,
            fileSize: sizeStr,
            relativePath: relativeUrlPath,
            category: 'paint',
          });
        }
      }
    } catch (err) {
      console.error('Error scanning PDF directory:', err);
    }
  }

  scanDir(pdfDir);
  return pdfFiles;
}
