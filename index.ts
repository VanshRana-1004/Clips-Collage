import { exec } from 'child_process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import fs from 'fs/promises';
const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const inputDir = path.join(__dirname, 'input-clips');
const allFiles = await fs.readdir(inputDir);

const videoFiles = allFiles
  .filter(f => f.endsWith('.webm') || f.endsWith('.mp4'))
  .map(f => path.join(inputDir, f));

const screenClips = videoFiles.filter(f => f.includes('screen'));
const mediaClips = videoFiles.filter(f => !f.includes('screen'));
console.log(screenClips);
console.log(mediaClips);

const outputDir=path.join(__dirname,'output-clips');

const outputFile1 = path.join(outputDir, `layout_preview_1.webm`);
const outputFile2 = path.join(outputDir, `layout_preview_2.webm`);
const outputFile3 = path.join(outputDir, `layout_preview_3.webm`);
const outputFile4 = path.join(outputDir, `layout_preview_4.webm`);
const outputFile5 = path.join(outputDir, `layout_preview_5.webm`);
const outputFile6 = path.join(outputDir, `layout_preview_6.webm`);
const outputFile7 = path.join(outputDir, `layout_preview_7.webm`);
const outputFile8 = path.join(outputDir, `layout_preview_8.webm`);
const outputFile9 = path.join(outputDir, `layout_preview_9.webm`);
const outputFile10 = path.join(outputDir, `layout_preview_10.webm`);


const single1 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=31 -i "${screenClips[0]}" \ -filter_complex "[1:v]scale=w=1333:h=749:force_original_aspect_ratio=decrease[overlayed];[0:v][overlayed]overlay=2:2" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile1}"`;
const screenCmd2 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=31 -i "${screenClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=950:534:force_original_aspect_ratio=decrease[sc1];[2:v]scale=377:270:force_original_aspect_ratio=decrease[sc2];[0:v][sc1]overlay=2:2[tmp1];[tmp1][sc2]overlay=954:477" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile2}"`;
const screenCmd3 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=31 -i "${screenClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=904:507:force_original_aspect_ratio=decrease[sc1];[2:v]scale=377:270:force_original_aspect_ratio=decrease[sc2];[3:v]scale=377:270:force_original_aspect_ratio=decrease[sc3];[0:v][sc1]overlay=2:121[tmp1];[tmp1][sc2]overlay=908:375[tmp2];[tmp2][sc3]overlay=908:2" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile3}"`;
const screenCmd4 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=31 -i "${screenClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=904:507:force_original_aspect_ratio=decrease[sc1];[2:v]scale=380:247:force_original_aspect_ratio=decrease[sc2];[3:v]scale=380:247:force_original_aspect_ratio=decrease[sc3];[4:v]scale=380:247:force_original_aspect_ratio=decrease[sc4];[0:v][sc1]overlay=16:121[tmp1];[tmp1][sc2]overlay=936:2[tmp2];[tmp2][sc3]overlay=936:251[tmp3];[tmp3][sc4]overlay=936:500" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile4}"`;
const screenCmd5 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=31 -i "${screenClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=904:507:force_original_aspect_ratio=decrease[sc1];[2:v]scale=300:236:force_original_aspect_ratio=decrease[sc2];[3:v]scale=300:236:force_original_aspect_ratio=decrease[sc3];[4:v]scale=423:371:force_original_aspect_ratio=decrease[sc4];[5:v]scale=423:371:force_original_aspect_ratio=decrease[sc5];[0:v][sc1]overlay=2:2[tmp1];[tmp1][sc2]overlay=103:511[tmp2];[tmp2][sc3]overlay=506:511[tmp3];[tmp3][sc4]overlay=908:375[tmp4];[tmp4][sc5]overlay=908:2" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile5}"`;
const screenCmd6 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=31 -i "${screenClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=904:507:force_original_aspect_ratio=decrease[sc1];[2:v]scale=300:236:force_original_aspect_ratio=decrease[sc2];[3:v]scale=300:236:force_original_aspect_ratio=decrease[sc3];[4:v]scale=300:236:force_original_aspect_ratio=decrease[sc4];[5:v]scale=423:371:force_original_aspect_ratio=decrease[sc5];[6:v]scale=423:371:force_original_aspect_ratio=decrease[sc6];[0:v][sc1]overlay=2:2[tmp1];[tmp1][sc2]overlay=2:511[tmp2];[tmp2][sc3]overlay=304:511[tmp3];[tmp3][sc4]overlay=606:511[tmp4];[tmp4][sc5]overlay=908:375[tmp5];[tmp5][sc6]overlay=908:2" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile6}"`;

const mediaCmd7=`ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -i "${mediaClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=620:480:force_original_aspect_ratio=decrease[sc1];[2:v]scale=620:480:force_original_aspect_ratio=decrease[sc2];[0:v][sc1]overlay=31:134[tmp1];[tmp1][sc2]overlay=682:134" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile7}"`;
const mediaCmd8=`ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=500:350:force_original_aspect_ratio=decrease[sc1];[2:v]scale=500:350:force_original_aspect_ratio=decrease[sc2];[3:v]scale=500:350:force_original_aspect_ratio=decrease[sc3];[0:v][sc1]overlay=158:16[tmp1];[tmp1][sc2]overlay=674:16[tmp2];[tmp2][sc3]overlay=416:382" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile8}"`;
const mediaCmd9=`ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=500:350:force_original_aspect_ratio=decrease[sc1];[2:v]scale=500:350:force_original_aspect_ratio=decrease[sc2];[3:v]scale=500:350:force_original_aspect_ratio=decrease[sc3];[4:v]scale=500:350:force_original_aspect_ratio=decrease[sc4];[0:v][sc1]overlay=158:16[tmp1];[tmp1][sc2]overlay=674:16[tmp2];[tmp2][sc3]overlay=158:382[tmp3];[tmp3][sc4]overlay=674:382" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile9}"`;
const mediaCmd10=`ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -i "${mediaClips[0]}" -filter_complex "[1:v]scale=441:371:force_original_aspect_ratio=decrease[sc1];[2:v]scale=441:371:force_original_aspect_ratio=decrease[sc2];[3:v]scale=441:371:force_original_aspect_ratio=decrease[sc3];[4:v]scale=441:371:force_original_aspect_ratio=decrease[sc4];[5:v]scale=441:371:force_original_aspect_ratio=decrease[sc5];[0:v][sc1]overlay=3:2[tmp1];[tmp1][sc2]overlay=446:2[tmp2];[tmp2][sc3]overlay=890:2[tmp3];[tmp3][sc4]overlay=223:375[tmp4];[tmp4][sc5]overlay=667:375" -t 31 -c:v libvpx -b:v 5M -crf 10 -quality good -cpu-used 0 -pix_fmt yuv420p "${outputFile10}"`;

const cmd=[single1,screenCmd2,screenCmd3,screenCmd4,screenCmd4,screenCmd5,screenCmd6,mediaCmd7,mediaCmd8,mediaCmd9,mediaCmd10];

async function asyncPool(poolLimit, commands) {
  const results: Promise<string | void>[] = [];
  const executing: Promise<void>[] = [];

  for (const cmd of commands) {
    const p = execAsync(cmd).then(result => {
      console.log(`Done: ${cmd.split(' ')[cmd.split(' ').length - 1]}`);
      return result.stdout || result.stderr;
    }).catch(err => {
      console.error(`Error in: ${cmd}`);
      console.error(err);
    });

    results.push(p);

    if (poolLimit <= commands.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

await asyncPool(2,cmd);