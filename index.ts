import { exec } from 'child_process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputFile1 = path.join(__dirname, `layout_preview_1.webm`);
const outputFile2 = path.join(__dirname, `layout_preview_2.webm`);
const outputFile3 = path.join(__dirname, `layout_preview_3.webm`);
const outputFile4 = path.join(__dirname, `layout_preview_4.webm`);
const outputFile5 = path.join(__dirname, `layout_preview_5.webm`);
const outputFile6 = path.join(__dirname, `layout_preview_6.webm`);
const outputFile7 = path.join(__dirname, `layout_preview_7.webm`);
const outputFile8 = path.join(__dirname, `layout_preview_8.webm`);
const outputFile9 = path.join(__dirname, `layout_preview_9.webm`);
const outputFile10 = path.join(__dirname, `layout_preview_10.webm`);


// shared screen + media clips
const screenCmd5 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=904x507:d=5 \ -f lavfi -i color=c=black:s=300x236:d=5 \ -f lavfi -i color=c=black:s=300x236:d=5 \ -f lavfi -i color=c=black:s=300x236:d=5 \ -f lavfi -i color=c=black:s=423x371:d=5 \ -f lavfi -i color=c=black:s=423x371:d=5 \ -filter_complex "[0:v][1:v]overlay=2:2[tmp1];[tmp1][2:v]overlay=2:511[tmp2];[tmp2]overlay=304:511[tmp3];[tmp3]overlay=606:511[tmp4];[tmp4]overlay=908:375[tmp5];[tmp5]overlay=908:2" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile1}"`;
const screenCmd4 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=904x507:d=5 \ -f lavfi -i color=c=black:s=300x236:d=5 \ -f lavfi -i color=c=black:s=300x236:d=5 \ -f lavfi -i color=c=black:s=423x371:d=5 \ -f lavfi -i color=c=black:s=423x371:d=5 \ -filter_complex "[0:v][1:v]overlay=2:2[tmp1];[tmp1][2:v]overlay=103:511[tmp2];[tmp2]overlay=506:511[tmp3];[tmp3]overlay=908:375[tmp4];[tmp4]overlay=908:2" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile2}"`;
const screenCmd3 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=904x507:d=5 \ -f lavfi -i color=c=black:s=380x247:d=5 \ -f lavfi -i color=c=black:s=380x247:d=5 \ -f lavfi -i color=c=black:s=380x247:d=5 \ -filter_complex "[0:v][1:v]overlay=16:121[tmp1];[tmp1][2:v]overlay=936:2[tmp2];[tmp2]overlay=936:251[tmp3];[tmp3]overlay=936:500" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile3}"`;
const screenCmd2 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=904x507:d=5 \ -f lavfi -i color=c=black:s=423x371:d=5 \ -f lavfi -i color=c=black:s=423x371:d=5 \ -filter_complex "[0:v][1:v]overlay=2:121[tmp1];[tmp1]overlay=908:375[tmp2];[tmp2]overlay=908:2" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile4}"`;
const screenCmd1 = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=950x534:d=5 \ -f lavfi -i color=c=black:s=377x270:d=5 \ -filter_complex "[0:v][1:v]overlay=2:2[tmp1];[tmp1]overlay=954:477" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile5}"`;
const single = `ffmpeg -y -f lavfi -i color=c=white:s=1333x749gt:d=5 -f lavfi -i color=c=black:s=1329x745:d=5 \ -filter_complex "[0:v][1:v]overlay=2:2" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile6}"`;

// only media clips
const mediaCmd5=`ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=441x371:d=5 \ -f lavfi -i color=c=black:s=441x371:d=5 \ -f lavfi -i color=c=black:s=441x371:d=5 \ -f lavfi -i color=c=black:s=441x371:d=5 \ -f lavfi -i color=c=black:s=441x371:d=5 \ -filter_complex "[0:v][1:v]overlay=3:2[tmp1];[tmp1][2:v]overlay=446:2[tmp2];[tmp2]overlay=890:2[tmp3];[tmp3]overlay=223:375[tmp4];[tmp4]overlay=667:375" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile7}"`;
const mediaCmd4=`ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=500x350:d=5 \ -f lavfi -i color=c=black:s=500x350:d=5 \ -f lavfi -i color=c=black:s=500x350:d=5 \ -f lavfi -i color=c=black:s=500x350:d=5 \ -filter_complex "[0:v][1:v]overlay=158:16[tmp1];[tmp1][2:v]overlay=674:16[tmp2];[tmp2]overlay=158:382[tmp3];[tmp3]overlay=674:382" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile8}"`;
const mediaCmd3=`ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=500x350:d=5 \ -f lavfi -i color=c=black:s=500x350:d=5 \ -f lavfi -i color=c=black:s=500x350:d=5 \ -filter_complex "[0:v][1:v]overlay=158:16[tmp1];[tmp1][2:v]overlay=674:16[tmp2];[tmp2]overlay=416:382" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile9}"`;
const mediaCmd2=`ffmpeg -y -f lavfi -i color=c=white:s=1333x749:d=5 -f lavfi -i color=c=black:s=620x480:d=5 \ -f lavfi -i color=c=black:s=620x480:d=5 \ -filter_complex "[0:v][1:v]overlay=31:134[tmp1];[tmp1][2:v]overlay=682:134" -t 5 -c:v libvpx -pix_fmt yuv420p "${outputFile10}"`;


const cmdArr=[screenCmd5,screenCmd4,screenCmd3,screenCmd2,screenCmd1,mediaCmd5,mediaCmd4,mediaCmd3,mediaCmd2,single];
const outputFileArr=[outputFile1,outputFile2,outputFile3,outputFile4,outputFile5,outputFile6,outputFile7,outputFile8,outputFile9,outputFile10]

async function createLayouts(cmd,ind : number){
  exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error('Error generating layout preview:', error.message);
        console.error(stderr);
        return;
      }
      console.log('Layout preview created:', outputFileArr[ind]);
    });
} 

for(let i=0;i<cmdArr.length;i++) await createLayouts(cmdArr[i],i).catch(console.error);