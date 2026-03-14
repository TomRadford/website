import path from 'node:path';
import sharp from 'sharp';
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 88;

interface OGPage {
  title: string;
  description: string;
  socialImage?: string;
  entryFilePath?: string;
}

const writing = await getCollection('writing');
const projects = await getCollection('projects');

const pages: Record<string, OGPage> = {
  home: {
    title: 'Tom Radford',
    description:
      'Creative engineer shaping meaningful products through technical depth and strong vision.',
    entryFilePath: 'src/assets/index',
    socialImage: './hero-portrait.png',
  },
  writing: {
    title: 'my thoughts.',
    description: 'various ramblings listed on this page',
    entryFilePath: 'src/assets/moments/index',
    socialImage: './11.jpg',
  },
  projects: {
    title: "problems I've solved.",
    description: "meaningful products that I've been shipping",
    entryFilePath: 'src/assets/moments/index',
    socialImage: './8.jpg',
  },
};

for (const post of writing) {
  pages[`writing/${post.id}`] = {
    title: post.data.title,
    description: post.data.description,
    socialImage: post.data.socialImage,
    entryFilePath: post.filePath,
  };
}

for (const project of projects) {
  pages[`projects/${project.id}`] = {
    title: project.data.title,
    description: project.data.description,
    socialImage: project.data.socialImage,
    entryFilePath: project.filePath,
  };
}
console.log(pages);

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function splitWords(text: string, maxCharactersPerLine: number, maxLines: number) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length <= maxCharactersPerLine) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    currentLine = word;

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (lines.length < maxLines && currentLine) {
    lines.push(currentLine);
  }

  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:!?-]?$/, '')}…`;
  }

  return lines;
}

function renderTextLines(lines: string[], startX: number, startY: number, fontSize: number) {
  return lines
    .map(
      (line, index) =>
        `<text x="${startX}" y="${startY + index * fontSize * 1.18}" fill="#f8fafc" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800">${escapeXml(line)}</text>`
    )
    .join('');
}

function renderDescriptionLines(lines: string[], startX: number, startY: number, fontSize: number) {
  return lines
    .map(
      (line, index) =>
        `<text x="${startX}" y="${startY + index * fontSize * 1.35}" fill="#e2e8f0" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="500">${escapeXml(line)}</text>`
    )
    .join('');
}

function resolveSocialImagePath(page: OGPage) {
  if (!page.socialImage || !page.entryFilePath) return undefined;
  return path.resolve(path.dirname(page.entryFilePath), page.socialImage);
}

async function buildBackgroundLayer(page: OGPage) {
  const socialImagePath = resolveSocialImagePath(page);

  if (socialImagePath) {
    return sharp(socialImagePath)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
      .modulate({ brightness: 0.68 })
      .png()
      .toBuffer();
  }

  const gradientSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="58%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#082f49" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
    </svg>
  `;

  return Buffer.from(gradientSvg);
}

async function buildOverlay(page: OGPage) {
  const titleLines = splitWords(page.title, 24, 4);
  const descriptionLines = splitWords(page.description, 52, 3);
  const titleStartY = PADDING + 96;
  const descriptionStartY = titleStartY + titleLines.length * 72 + 26;

  const overlaySvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(2, 6, 23, 0.38)" />
          <stop offset="100%" stop-color="rgba(2, 6, 23, 0.82)" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#shade)" />
      <rect x="52" y="52" width="${WIDTH - 104}" height="${HEIGHT - 104}" rx="28" fill="none" stroke="rgba(255,255,255,0.14)" />
      ${renderTextLines(titleLines, PADDING, titleStartY, 64)}
      ${renderDescriptionLines(descriptionLines, PADDING, descriptionStartY, 28)}
    </svg>
  `;

  return Buffer.from(overlaySvg);
}

async function generateImage(page: OGPage) {
  const background = await buildBackgroundLayer(page);
  const overlayBuffer = await buildOverlay(page);

  return sharp(background)
    .resize(WIDTH, HEIGHT, { fit: 'cover' })
    .composite([{ input: overlayBuffer, top: 0, left: 0 }])
    .png()
    .toBuffer();
}

export const prerender = true;

export const getStaticPaths = (() =>
  Object.entries(pages).map(([route, page]) => ({
    params: { route },
    props: { page },
  }))) satisfies GetStaticPaths;

export const GET = (async ({ props }) => {
  const page = props.page as OGPage;
  const image = await generateImage(page);

  return new Response(new Uint8Array(image), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}) satisfies APIRoute;
