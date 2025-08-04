#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of all images found in blog posts with original URLs
const imageMapping = [
  {
    file: 'new-blog-with-gatsby.md',
    proxyUrl: 'https://images.weserv.nl/?url=tva1.sinaimg.cn/large/007S8ZIlly1gdqwuibnabj32540rgdpl.jpg',
    originalUrl: 'https://tva1.sinaimg.cn/large/007S8ZIlly1gdqwuibnabj32540rgdpl.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/gatsby-blog-1.jpg',
    filename: 'gatsby-blog-1.jpg'
  },
  {
    file: 'no-filter-instagram.md',
    proxyUrl: 'https://images.weserv.nl/?url=tva1.sinaimg.cn/large/0081Kckwly1gm2d9v1tjwj317v0u0af6.jpg',
    originalUrl: 'https://tva1.sinaimg.cn/large/0081Kckwly1gm2d9v1tjwj317v0u0af6.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/instagram-1.jpg',
    filename: 'instagram-1.jpg'
  },
  {
    file: '2020-03.md',
    proxyUrl: 'https://images.weserv.nl/?url=i.typlog.com/yifen/8414078262_960514.png',
    originalUrl: 'https://i.typlog.com/yifen/8414078262_960514.png',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/2020-03-1.png',
    filename: '2020-03-1.png'
  },
  {
    file: 'thought-about-remote-working.md',
    proxyUrl: 'https://images.weserv.nl/?url=tva1.sinaimg.cn/large/0082zybply1gc7x4sp6gnj30x80m8b29.jpg',
    originalUrl: 'https://tva1.sinaimg.cn/large/0082zybply1gc7x4sp6gnj30x80m8b29.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/remote-work-1.jpg',
    filename: 'remote-work-1.jpg'
  },
  {
    file: 'thought-about-remote-working.md',
    proxyUrl: 'https://images.weserv.nl/?url=tva1.sinaimg.cn/large/0082zybply1gc7w55unx9j31400u0qsr.jpg',
    originalUrl: 'https://tva1.sinaimg.cn/large/0082zybply1gc7w55unx9j31400u0qsr.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/remote-work-2.jpg',
    filename: 'remote-work-2.jpg'
  },
  {
    file: 'thought-about-remote-working.md',
    proxyUrl: 'https://images.weserv.nl/?url=tva1.sinaimg.cn/large/0082zybply1gc7v69lqoij30h305it92.jpg',
    originalUrl: 'https://tva1.sinaimg.cn/large/0082zybply1gc7v69lqoij30h305it92.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/remote-work-3.jpg',
    filename: 'remote-work-3.jpg'
  },
  {
    file: 'should-i-speak-english-with-llm.md',
    proxyUrl: 'https://images.weserv.nl/?url=tvax1.sinaimg.cn/large/9fbe0bc0gy1i427ybw60tj20sg0sgnhl.jpg',
    originalUrl: 'https://tvax1.sinaimg.cn/large/9fbe0bc0gy1i427ybw60tj20sg0sgnhl.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/llm-lang-1.jpg',
    filename: 'llm-lang-1.jpg'
  },
  {
    file: 'should-i-speak-english-with-llm.md',
    proxyUrl: 'https://images.weserv.nl/?url=tvax3.sinaimg.cn/large/9fbe0bc0gy1i426xidrrbj20pq0togpg.jpg',
    originalUrl: 'https://tvax3.sinaimg.cn/large/9fbe0bc0gy1i426xidrrbj20pq0togpg.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/llm-lang-2.jpg',
    filename: 'llm-lang-2.jpg'
  },
  {
    file: 'should-i-speak-english-with-llm.md',
    proxyUrl: 'https://images.weserv.nl/?url=tvax4.sinaimg.cn/large/9fbe0bc0gy1i4270ys47wj20oe0tutcr.jpg',
    originalUrl: 'https://tvax4.sinaimg.cn/large/9fbe0bc0gy1i4270ys47wj20oe0tutcr.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/llm-lang-3.jpg',
    filename: 'llm-lang-3.jpg'
  },
  {
    file: 'should-i-speak-english-with-llm.md',
    proxyUrl: 'https://images.weserv.nl/?url=tvax3.sinaimg.cn/large/9fbe0bc0gy1i4278yn7imj20s60be0v9.jpg',
    originalUrl: 'https://tvax3.sinaimg.cn/large/9fbe0bc0gy1i4278yn7imj20s60be0v9.jpg',
    newUrl: 'https://raw.githubusercontent.com/Anthonyeef/homepage/main/static/images/llm-lang-4.jpg',
    filename: 'llm-lang-4.jpg'
  }
];

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const imagesDir = path.join(__dirname, '..', 'static', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    const filePath = path.join(imagesDir, filename);
    fs.writeFileSync(filePath, buffer);
    console.log(`Downloaded: ${filename}`);
  } catch (error) {
    console.error(`Failed to download ${filename}:`, error.message);
  }
}

async function updateMarkdownFiles() {
  const blogDir = path.join(__dirname, '..', 'src', 'routes', 'blog');
  
  for (const mapping of imageMapping) {
    const filePath = path.join(blogDir, mapping.file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(mapping.proxyUrl, mapping.newUrl);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${mapping.file}`);
    }
  }
}

async function main() {
  console.log('Downloading images...');
  for (const mapping of imageMapping) {
    // Try proxy URL first, then original
    let success = false;
    try {
      await downloadImage(mapping.proxyUrl, mapping.filename);
      success = true;
    } catch (error) {
      console.log(`Proxy failed for ${mapping.filename}, trying original...`);
      try {
        await downloadImage(mapping.originalUrl, mapping.filename);
        success = true;
      } catch (error2) {
        console.error(`Both URLs failed for ${mapping.filename}`);
      }
    }
  }
  
  console.log('\nUpdating markdown files...');
  await updateMarkdownFiles();
  
  console.log('\nDone! Please commit and push the changes.');
}

main().catch(console.error);
