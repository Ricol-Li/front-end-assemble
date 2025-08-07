import { useEffect, useState, useLayoutEffect } from 'react'

export default function UseEffect() {
  const [status, setStatus] = useState(true)

  return (
    <div>
      <Info />
      <BasicUsage />
      <hr />
      <button onClick={() => setStatus(!status)}>切换显示</button>
      {status && <ClearEffect />}
    </div>
  )
}

// 基础用法
function BasicUsage() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  // 1. 依赖值更新才会触发副作用的更新
  useEffect(() => {
    // useEffect: 异步执行，DOM 渲染后运行
    console.log('useEffect: 渲染后异步执行')
  }, [count])

  // useLayoutEffect: 同步执行，DOM 更新后但绘制前运行
  useLayoutEffect(() => {
    console.log('useLayoutEffect: DOM 更新后同步执行')
  }, [count])

  console.log('🚀 ~ BasicUsage ~ 渲染，最先执行')

  // 2.传入空数组[]，只会更新一次
  useEffect(() => {
    console.log('🚀 ~ BasicUsage ~ useEffect:', '我只会更新一次')
  }, [])

  return (
    <div>
      <h1>1. 基础用法</h1>
      <div>Count:{count}</div>
      <div>Count2:{count2}</div>
      <button onClick={() => setCount(count + 1)}>Increment1</button>
      <button onClick={() => setCount2(count2 + 1)}>Increment2</button>
    </div>
  )
}
const contentStyleObj = {
  color: '#000',
  fontWeight: '600',
  width: '500px',
  fontSize: '16px',
}

// 清除函数
function ClearEffect() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    console.log('副作用执行')
    return function cleanUp() {
      // 如果Effect参数是空数组[]，cleanUp只会在组件卸载的时候执行
      console.log('组件的下一次提交或组件卸载会执行CleanUp')
    }
  })

  return (
    <div>
      <h1>2. 清除函数</h1>
      <p style={contentStyleObj}>
        useEffect接收了副作用回调函数和依赖数组两个参数，其中副作用回调函数的返回值也是一个函数，这个返回的函数叫做清除函数。
        组件在下一次提交阶段执行同一个副作用回调函数之前，或者是组件即将被卸载
      </p>
      <div>Count:{count}</div>
      <div>Count2:{count2}</div>
      <button onClick={() => setCount(count + 1)}>Increment1</button>
      <button onClick={() => setCount2(count2 + 1)}>Increment2</button>
    </div>
  )
}

function Info() {
  return (
    <div>
      <h1>useEffect副作用 & useLayoutEffect副作用</h1>
      <p style={contentStyleObj}>
        虽然Effect作为组件函数体的一部分，再每次组件渲染（包括挂载和更新阶段）时都会被调用，
        但作为参数的副作用回调函数是在提交阶段才会被调用的，这时副作用回调函数可以访问到组件的真实DOM
      </p>
    </div>
  )
}
