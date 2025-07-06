import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const INPUT_DIR = path.join(process.cwd(), 'input-clips');
const OUTPUT_DIR = path.join(process.cwd(), 'output-clips');

async function ensureOutputDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

function generateScreenGridLayout(n: number): string {
  const filterParts: string[] = [];

  const canvasW = 1280, canvasH = 720;
  const gap = 5;

  const screenW = 960, screenH = 540;
  let screenX = gap;
  let screenY = gap;

  let mediaW = 310, mediaH = 175;
  if (n >= 2) {
    mediaW = 282;
    mediaH = 164;
  }

  filterParts.push(`color=color=white:size=${canvasW}x${canvasH}:duration=10[base]`);

  filterParts.push(
    `[0:v]scale=${screenW - 4}:${screenH - 4}:force_original_aspect_ratio=decrease,` +
    `pad=${screenW}:${screenH}:(ow-iw)/2:(oh-ih)/2:color=white[screen]`
  );

  for (let i = 0; i < n; i++) {
    const idx = i + 1;
    filterParts.push(
      `[${idx}:v]scale=${mediaW - 4}:${mediaH - 4}:force_original_aspect_ratio=decrease,` +
      `pad=${mediaW}:${mediaH}:(ow-iw)/2:(oh-ih)/2:color=white[m${i}]`
    );
  }

  if (n === 2 || n === 3) {
    screenX = (canvasW - screenW) / 2;
  } else if (n === 5) {
    screenX = canvasW - screenW - gap;
  }


  filterParts.push(`[base][screen]overlay=${screenX}:${screenY}[layer0]`);

  let currentLayer = 'layer0';
  let layerCount = 1;

  const overlay = (input: string, x: number, y: number, isLast = false) => {
    const output = `layer${layerCount}`;
    const extra = isLast ? ':shortest=1' : '';
    filterParts.push(`[${currentLayer}][${input}]overlay=${x}:${y}${extra}[${output}]`);
    currentLayer = output;
    layerCount++;
  };

  if (n === 1) {
    overlay(`m0`, canvasW - mediaW - gap, canvasH - mediaH - gap, true);
  }

  if (n === 2) {
    overlay(`m0`, gap, canvasH - mediaH - gap);
    overlay(`m1`, canvasW - mediaW - gap, canvasH - mediaH - gap, true);
  }

  if (n === 3) {
    overlay(`m0`, gap, canvasH - mediaH - gap);
    overlay(`m1`, canvasW - mediaW - gap, canvasH - mediaH - gap);
    overlay(`m2`, (canvasW - mediaW) / 2, canvasH - mediaH - gap, true);
  }

  if (n === 4) {
    overlay(`m0`, canvasW - mediaW - gap, gap);
    overlay(`m1`, canvasW - mediaW - gap, mediaH + 2 * gap);
    overlay(`m2`, gap, canvasH - mediaH - gap);
    overlay(`m3`, gap + mediaW + gap, canvasH - mediaH - gap, true);
  }

  if (n === 5) {
    overlay(`m0`, canvasW - mediaW - gap, gap);
    overlay(`m1`, canvasW - mediaW - gap, mediaH + 2 * gap);
    const totalBottomW = mediaW * 3 + gap * 2;
    const startX = (canvasW - totalBottomW) / 2;
    overlay(`m2`, startX, canvasH - mediaH - gap);
    overlay(`m3`, startX + mediaW + gap, canvasH - mediaH - gap);
    overlay(`m4`, startX + (mediaW + gap) * 2, canvasH - mediaH - gap, true);
  }

  filterParts.push(`[${currentLayer}]copy[outv]`);
  return filterParts.join('; ');
}

function generateGridLayout(n: number) {
  const layouts = {
    1: `[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=white[outv]`,
    2: `
      [0:v]scale=640:720:force_original_aspect_ratio=decrease,pad=640:720:(ow-iw)/2:(oh-ih)/2:color=white[v0];
      [1:v]scale=640:720:force_original_aspect_ratio=decrease,pad=640:720:(ow-iw)/2:(oh-ih)/2:color=white[v1];
      [v0][v1]hstack=inputs=2[outv]
    `,
    3: `
      [0:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2:color=white[v0];
      [1:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2:color=white[v1];
      [2:v]scale=1280:360:force_original_aspect_ratio=decrease,pad=1280:360:(ow-iw)/2:(oh-ih)/2:color=white[v2];
      [v0][v1]hstack=inputs=2[top];
      [top][v2]vstack=inputs=2[outv]
    `,
    4: `
      [0:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2:color=white[v0];
      [1:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2:color=white[v1];
      [2:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2:color=white[v2];
      [3:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2:color=white[v3];
      [v0][v1]hstack=inputs=2[top];
      [v2][v3]hstack=inputs=2[bottom];
      [top][bottom]vstack=inputs=2[outv]
    `,
    5: `
      [0:v]scale=426:360:force_original_aspect_ratio=decrease,pad=426:360:(ow-iw)/2:(oh-ih)/2:color=white[v0];
      [1:v]scale=426:360:force_original_aspect_ratio=decrease,pad=426:360:(ow-iw)/2:(oh-ih)/2:color=white[v1];
      [2:v]scale=426:360:force_original_aspect_ratio=decrease,pad=426:360:(ow-iw)/2:(oh-ih)/2:color=white[v2];
      [3:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2:color=white[v3];
      [4:v]scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2:color=white[v4];
      [v0][v1][v2]hstack=inputs=3[topraw];
      [topraw]pad=1280:360:(ow-iw)/2:0:color=white[top];
      [v3][v4]hstack=inputs=2[bottomraw];
      [bottomraw]pad=1280:360:(ow-iw)/2:0:color=white[bottom];
      [top][bottom]vstack=inputs=2[outv]
    `
  };

  return layouts[n] ? layouts[n].replace(/\s+/g, ' ') : '';
}

function generateAudioMix(files: string[], audioInputs: number[]) {
  if (audioInputs.length === 0) return '';

  const inputLabels = audioInputs.map(i => `[${i}:a]`).join('');
  return `${inputLabels}amix=inputs=${audioInputs.length}:duration=shortest:dropout_transition=2[outa]`;
}

async function hasAnyAudio(files: string[]) {
  for (const file of files) {
    const cmd = `ffprobe -i "${path.join(INPUT_DIR, file)}" -show_streams -select_streams a -loglevel error`;
    try {
      const { stdout } = await execAsync(cmd);
      if (stdout.includes('codec_type=audio')) return true;
    } catch {}
  }
  return false;
}

async function generateCollage(files : string[],ind : number) {
  await ensureOutputDir();

  if (files.length === 0) throw new Error("No valid input clips found");

  const screenIndex = files.findIndex(f => f.startsWith('s'));
  const mediaIndexes = files.map((f, i) => (f.startsWith('a') || f.startsWith('b') || f.startsWith('c')) ? i : -1).filter(i => i !== -1);

  let filter = '';
  if (screenIndex !== -1) {
    console.log('screen included');
    filter = generateScreenGridLayout(mediaIndexes.length);
  } else {
    filter = generateGridLayout(mediaIndexes.length);
  }

  const inputArgs = files.map(f => `-i "${path.join(INPUT_DIR, f)}"`).join(' ');
  const OUTPUT_FILE = path.join(OUTPUT_DIR, `collage_output-${ind}.mp4`);

  const hasAudio = await hasAnyAudio(files);

  const audioIndexes: number[] = [];
  for (let i = 0; i < files.length; i++) {
    const cmd = `ffprobe -i "${path.join(INPUT_DIR, files[i])}" -show_streams -select_streams a -loglevel error`;
    try {
      const { stdout } = await execAsync(cmd);
      if (stdout.includes('codec_type=audio')) audioIndexes.push(i);
    } catch {}
  }
  const audioFilter = generateAudioMix(files, audioIndexes);

  const audioMap = hasAudio ? '-map "[outa]"' : '';
  const audioFilterCmd = audioFilter ? `; ${audioFilter}` : '';

  const command = `ffmpeg ${inputArgs} -filter_complex "${filter}${audioFilterCmd}" -map "[outv]" ${audioMap} -shortest -y "${OUTPUT_FILE}"`;

  console.log('Running FFmpeg command...');
  console.log(command);
  const { stdout, stderr } = await execAsync(command);
  console.log(stdout);
  console.error(stderr);
  console.log(`Collage created at: ${OUTPUT_FILE}`);
}

const files0 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('s') || f.startsWith('a')));
const files1 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('a') || f.startsWith('b')));
const files2 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('s') || f.startsWith('a') || f.startsWith('b')));
const files3 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('a') || f.startsWith('b') || f.startsWith('c')));
const files4 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('s') || f.startsWith('a') || f.startsWith('b') || f.startsWith('c')));
const files5 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('a') || f.startsWith('b') || f.startsWith('c') || f.startsWith('d')));
const files6 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('s') || f.startsWith('a') || f.startsWith('b') || f.startsWith('c') || f.startsWith('d')));
const files7 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('a') || f.startsWith('b') || f.startsWith('c') || f.startsWith('d') || f.startsWith('e')));
const files8 = (await fs.readdir(INPUT_DIR)).filter(f => f.endsWith('.mp4') && (f.startsWith('s') || f.startsWith('a') || f.startsWith('b') || f.startsWith('c') || f.startsWith('d') || f.startsWith('e')));

const arr=[files0,files1,files2,files3,files4,files5,files6,files7,files8]

for(let i=0;i<9;i++) await generateCollage(arr[i],i).catch(console.error);