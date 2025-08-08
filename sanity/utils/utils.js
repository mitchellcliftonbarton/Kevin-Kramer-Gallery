import {VideoPreview} from './fieldObjects'

export function toPlainText(blocks = []) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('')
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  )
}

export function getMediaPreview(media) {
  if (media?._type === 'Image') {
    return media?.asset
  } else if (media?._type === 'Video') {
    return VideoPreview(media)
  }
  return null
}
