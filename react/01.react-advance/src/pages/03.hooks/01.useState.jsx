/**
 * * useState 状态管理
 * 用法：const [state, setState] = useState(initialState)
 * initialState: 状态的初始值，可以是任意类型（字符串、数字、对象、数组、函数）。它会在组件第一次渲染时被使用。

 * state: 状态的当前值
 * setState: 更新状态的函数，调用它会触发组件重新渲染，同时更新状态的值




 */
import { useState } from 'react'

export default function UseState() {
  const [count, setCount] = useState(0)

  console.log('组件渲染-count', count)

  // 惰性初始化: 如果初始状态需要复杂计算，可以传入一个函数，函数只在首次渲染时执行
  const [count2, setCount2] = useState(() => {
    console.log('惰性初始化')
    return 100
  })

  const [count3, setCount3] = useState(0)

  function handleAddTwice() {
    // setState是异步的，同步的写法不会获取到之前的状态值
    // setCount3(count3 => count3 + 1)
    // setCount3(count3 => count3 + 1)
    // 解决方法：使用函数式更新
    setCount3(prevCount => prevCount + 1)
    setCount3(prevCount => prevCount + 1)
  }

  return (
    <div>
      <h1>useState 状态管理</h1>
      <div>当前计数：{count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <hr />
      <div>当前计数2：{count2}</div>
      <button onClick={() => setCount2(count2 + 1)}>增加2</button>
      <hr />
      函数式更新，状态更新时基于旧状态进行计算
      <div>当前计数3：{count3}</div>
      <button onClick={handleAddTwice}>增加3</button>
    </div>
  )
}
