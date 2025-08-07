import { useState, useMemo } from 'react'

export default function UseMemo() {
  return (
    <div>
      <Info />
      <hr />
      <BasicUsage />
    </div>
  )
}

function fibonacci(n) {
  if (n <= 1) return n // 基线条件：F(0)=0, F(1)=1
  return fibonacci(n - 1) + fibonacci(n - 2) // 递归调用
}

// 基础用法

function BasicUsage() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const sum = useMemo(() => {
    console.log('计算fibonacci')
    const n = parseInt(count, 10)
    return fibonacci(n)
  }, [count])

  console.log('sum', sum)

  return (
    <div>
      <h2>基础用法</h2>
      <div>
        <div>当前计数：{count}</div>
        <button onClick={() => setCount(count + 1)}>增加</button>
      </div>
      <div>
        <div>当前计数2：{count2}</div>
        <button onClick={() => setCount2(count2 + 1)}>增加2</button>
      </div>
    </div>
  )
}

function Info() {
  return (
    <div>
      <h1>useMemo</h1>
      <div className="description-content">
        <p>useMemo 是 React 提供的一个 Hook，用于缓存计算结果，避免在每次渲染时都重新计算。</p>
        <p>useMemo 接收两个参数：一个是计算函数，一个是依赖数组。当依赖数组中的值发生变化时，才会重新计算。</p>
        <p>useMemo 可以避免在每次渲染时都重新计算，提高性能。</p>
        <p>用法：</p>
        <p>{`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`}</p>
      </div>
    </div>
  )
}
