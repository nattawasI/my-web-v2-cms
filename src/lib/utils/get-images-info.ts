import fs from 'node:fs/promises'
import { getPlaiceholder } from 'plaiceholder'

async function getFileBufferLocal(src: string) {
  try {
    return await fs.readFile(src)
  } catch (err) {
    console.error('Error buffer local: ', err)
  }
}

async function getFileBufferRemote(src: string) {
  try {
    return await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))
  } catch (err) {
    console.error('Error buffer remote: ', err)
  }
}

async function getFileBuffer(src: string) {
  const isRemote = src.startsWith('http')
  return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src)
}

export async function getImagesInfo(src: string) {
  try {
    const buffer = await getFileBuffer(src)
    if (!buffer) return
    return await getPlaiceholder(buffer)
  } catch (err) {
    console.error('Error get image info: ', err)
  }
}
