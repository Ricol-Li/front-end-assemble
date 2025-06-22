/**
 * * 文件上传的要领
 * @description 1. 文件上传要分片
 * * 文件分片，用到了Blob的slice方法, instanceofBlob.slice(start [, end, [, contentType]])
 * @description 2. 计算文件的Hash值
 * * 根据文件内容生成Hash值，如果文件内容发生变化Hash值会变化，内容一样Hash值一样，如果这样，可以实现秒传
 * * 如果别的用户秒传了文件，那么服务端就可以判断文件是否已经存在了，如果存在了，那么就不用上传了，直接返回文件信息
 * ? 如何保证Hash的准确性，又不能让hash计算太耗时
 * 1. 第一个和最后一个切片的内容参与计算
 * 2. 中间剩余的切片我们分别在前面、后面和中间取2个字节参与计算
 * 这样就既能保证所有的切片参与了计算、也能保证不耗费很长的时间
 */

const newBlob = blob.slice(start, end, contentType)
// 参数           类型    描述                  默认值
// start         number  起始字节位置（包含）     0
// end           number  结束字节位置（不包含）   0
// contentType   string  新 Blob 的 MIME 类型  原 Blob 的类型

// 创建一个示例 Blob
const blob = new Blob(['Hello, World!'], { type: 'text/plain' })

// 截取第6到11字节（不包括11）
const slicedBlob = blob.slice(6, 11, 'text/plain')

// 读取结果
const reader = new FileReader()
reader.onload = function (e) {
  console.log(e.target.result) // 输出 "World"
}
reader.readAsText(slicedBlob)
