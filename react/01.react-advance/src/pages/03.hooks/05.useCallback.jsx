import React, { useState, useCallback, useRef } from 'react'

export default function UseCallback() {
  return (
    <div>
      <Info />
      <hr />
      <ExampleOne />
    </div>
  )
}

// 场景1：防止子组件不必要的渲染
const Child = React.memo(({ onClick }) => {
  console.log('Child 渲染')
  const renderCount = useRef(0)
  renderCount.current++
  console.log('Child 渲染次数', renderCount.current)

  return (
    <div>
      <p>Child 渲染次数：{renderCount.current}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  )
})

function ExampleOne() {
  console.log('组件渲染-ExampleOne')

  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  const handleChange = e => {
    console.log('handleChange创建了函数')
    setName(e.target.value)
  }

  // 定义一个函数，用于增加计数
  const handleClick = () => {
    console.log('handleClick 创建了函数')

    setCount(count + 1)
  }

  // 缓存函数，只有在依赖项发生变化时才会重新创建函数
  const memoizedHandleClick = useCallback(handleClick, [count])

  return (
    <div>
      <h1>Name: {name}</h1>
      <input type="text" value={name} onChange={e => handleChange(e)} />
      <p>Name变化不会导致子组件渲染</p>
      <br />
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increase Count</button>
      <Child onClick={memoizedHandleClick} />
      <p>Count变化会导致子组件渲染</p>
    </div>
  )
}

function Info() {
  return (
    <div>
      <h1>UseCallback</h1>
      <div className="description-content">
        <p>useCallback 用于缓存函数，只有在依赖项发生变化时才会重新创建函数</p>
        <p>
          语法：<span text="red">{`const memoizedCallback = useCallback(() => { 函数逻辑 }, [dependencies])`}</span>
        </p>
        <h1>为什么要使用 useCallback</h1>
        <p>在React中，每次渲染组件时，函数都会被重新创建，导致函数引用发生变化。即使函数逻辑相同，新的引用会导致以下问题：</p>
        <li>
          <b text="red">子组件不必要的渲染：</b>
          如果函数作为props传递给使用React.memo的子组件，引用变化会触发子组件的重新渲染
        </li>
        <li>
          <b text="red">触发不必要的副作用：</b>
          如果函数作为useEffect或useMemo的依赖，引用变化会导致副作用重复执行
        </li>
        useCallback通过缓存函数引用，解决这些问题
      </div>
    </div>
  )
}
