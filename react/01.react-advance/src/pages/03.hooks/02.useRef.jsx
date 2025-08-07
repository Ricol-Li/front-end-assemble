import { useRef, useState, useEffect } from 'react'

function Info() {
  return (
    <div>
      <h1>useRef</h1>
      <div>useRef是React中的一个Hook，用于在函数中创建可变的引用对象。它主要有两个用途：</div>
      <div>1. 存储不需要触发渲染的可变数据（如计数器、定时器 ID、DOM 引用等）</div>
      <div>2. 直接操作 DOM 元素或组件实例</div>
      <div>特点：</div>
      <div>useRef 创建的引用在组件的整个生命周期内保持不变（除非手动更改 current）</div>
      <div>不会因组件重新渲染而重置</div>
    </div>
  )
}
/**
 * * useRef 保存可变值（不触发重新渲染）
 * 用法：const myRef = useRef(initialValue)
 * myRef.current 访问或修改引用的值
 *
 */

export default function UseRef() {
  const renderCount = useRef(0) // 记录组件的渲染次数

  const [state, setState] = useState(0)

  renderCount.current++ // 每次渲染时更新，但不触发重新渲染

  console.log('renderCount', renderCount.current)

  // 2. 直接操作 DOM 元素或组件实例
  const inputRef = useRef(null)
  const focusInput = () => {
    inputRef.current.focus()
    console.log('inputRef.current.value', inputRef.current.value)

    inputRef.current.value = 'hello'
  }

  // 3. 保存旧值
  const [count, setCount] = useState(0)
  const prevCountRef = useRef()
  useEffect(() => {
    console.log('useEffect副作用执行')
    prevCountRef.current = count // 每次count 更新，保存旧值
  }, [count])

  const prevCount = prevCountRef.current
  return (
    <div>
      <Info />
      <hr />
      <h2>1. 存储可变数据</h2>
      <div>
        <p>State: {state}</p>
        <p>Render Count: {renderCount.current}</p>
        <button onClick={() => setState(state + 1)}>Increment</button>
      </div>
      <hr />
      <h2>2. 直接操作 DOM 元素或组件实例</h2>
      <p>通过将 useRef 创建的引用绑定到 JSX 元素的 ref 属性，可以直接访问 DOM 节点</p>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={focusInput}>Focus Input</button>
      </div>
      <hr />
      <h2>3. 保存旧值</h2>
      <div>
        <p>Current Count: {count}</p>
        <p>Previous Count: {prevCount}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <hr />
      <Timer />
    </div>
  )
}

// 管理定时器
function Timer() {
  const timer = useRef(null)
  const [count, setCount] = useState(0)

  console.log('组件渲染-Timer-Count', count)

  function startTimer() {
    timer.current = setInterval(() => {
      console.log('Timer running...', count)
      setCount(preCount => preCount + 1)
    }, 1000)
  }

  function stopTimer() {
    clearInterval(timer.current)
  }

  return (
    <div>
      <h2>4.管理定时器或副作用</h2>
      <div>count:{count}</div>
      <button onClick={() => startTimer()}>开始定时器</button>
      <button onClick={() => stopTimer()}>停止定时器</button>
    </div>
  )
}
