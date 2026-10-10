const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const targetDir = path.join(process.cwd(), 'public', 'assets', 'brands');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const logos = [
  {
    filename: 'skipper-pipes.png',
    url: 'https://images.seeklogo.com/logo-png/63/1/skipper-limited-logo-png_seeklogo-633679.png'
  },
  {
    filename: 'roff.png',
    url: 'https://images.seeklogo.com/logo-png/18/1/roff-logo-png_seeklogo-188677.png'
  },
  {
    filename: 'fevicol.png',
    url: 'https://images.seeklogo.com/logo-png/22/1/fevicol-logo-png_seeklogo-226167.png'
  },
  {
    filename: 'sintex-tanks.png',
    url: 'https://images.seeklogo.com/logo-png/30/1/sintex-logo-png_seeklogo-305080.png'
  }
];

function download(url, filePath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Referer': 'https://seeklogo.com/'
        }
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location, filePath).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
        }
        const stream = fs.createWriteStream(filePath);
        res.pipe(stream);
        stream.on('finish', () => {
          stream.close();
          console.log(`Downloaded ${filePath}`);
          resolve();
        });
      }
    );
    req.on('error', reject);
  });
}

async function main() {
  for (const item of logos) {
    const dest = path.join(targetDir, item.filename);
    try {
      await download(item.url, dest);
    } catch (err) {
      console.error(`Error downloading ${item.filename}: ${err.message}`);
    }
  }
}

main();
