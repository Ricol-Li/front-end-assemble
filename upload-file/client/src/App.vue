<script setup>
import SparkMD5 from 'spark-md5';
import { ref } from 'vue'
/**
 * 1GB = 1024MB
 * 1MB = 1024KB
 * 1KB = 1024B
 * 1B（Byte） = 8b // byte 字节是基本存储单位
 * bit(b) // 位​ (比特)最小单位，表示0或1
 */
// 文件大小
const CHUNK_SIZE = 1 * 1024 * 1024 // 1MB
const fileHash = ref('')
const fileName = ref('')
// 文件分片
function createChunks(file) {
  let cur = 0
  let chunks = []

  while (cur < file.size) {
    const blob = file.slice(cur, cur + CHUNK_SIZE)
    cur += CHUNK_SIZE
    chunks.push(blob)
  }

  return chunks
}

function calculateHash(chunks) {
  return new Promise((resolve, reject) => {
    // 不是所有的内容都参与计算hash
    // 1. 第一个和最后一个切片参与计算
    // 2. 中间的切片只计算前面2个字节，中间2个字节，最后两个字节
    const targets = []
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    chunks.forEach((chunk, index) => {
      if (index === 0 || index === chunks.length - 1) {
        targets.push(chunk)
      } else {
        targets.push(chunk.slice(0, 2))
        targets.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2))
        targets.push(chunk.slice(CHUNK_SIZE - 2, CHUNK_SIZE))
      }
    });

    fileReader.readAsArrayBuffer(new Blob(targets))
    fileReader.onload = function (e) {
      spark.append(e.target.result)
      // 拿到计算出来的hash值
      // console.log('hash:', spark.end());
      resolve(spark.end())
    }
  })
}

async function uploadChunks(chunks) {
  const data = chunks.map((chunk, index) => {
    return {
      fileHash: fileHash.value,
      chunkHash: fileHash.value + '-' + index,
      chunk,
    }
  })

  const formDatas = data.map((item) => {
    const formData = new FormData()
    formData.append('fileHash', item.fileHash)
    formData.append('chunkHash', item.chunkHash)
    formData.append('chunk', item.chunk)

    return formDatas

  })

  const max = 6
  let index = 0

  const taskPool = [] // 请求池

  while (index < formDatas.length) {
    const task = fetch('/upload', {
      method: 'POST',
      body: formDatas[index],
    })

    taskPool.splice(taskPool.findIndex((item) => item === task))
    taskPool.push(task)
    if (taskPool.length === max) {
      await Promise.race(taskPool)
    }
    index++

  }

  await Promise.all(taskPool)

}


async function handleUpload(e) {
  // console.log(e.target.files);
  const files = e.target.files
  if (!files) return
  // 读取文件
  console.log(files[0]);
  fileName.value = files[0].name // 文件名

  // 将文件切片
  const chunks = createChunks(files[0])

  console.log('chunks', chunks);

  // hash计算
  const hash = await calculateHash(chunks)
  fileHash.value = hash // 文件hash

  // 上传分片
  uploadChunks(chunks)
}

</script>

<template>
  <div>
    <h1>大文件上传</h1>
    <input type="file" @change="handleUpload">
  </div>
</template>

<style scoped></style>
