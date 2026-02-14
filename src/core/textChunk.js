export default function createChunkArray(transcript, maxChar) {
  const str = transcript;
  const strLen = str.length;
  const chunk = [];
  let ptr = 0;

  while (ptr < strLen) {
    chunk.push(str.slice(ptr, ptr + maxChar));
    ptr += maxChar;
  }
  return chunk;
}


