import React, { createContext, useState, useContext, useEffect } from 'react'

function UseContext() {
  return (
    <div>
      <Info />
      <hr />
      <ContextApp />
    </div>
  )
}

// 1. 创建context
const CountContext = createContext()

function CounterProvider({ children }) {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (count % 2 === 0) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [count])

  return (
    // 2. 提供context
    <CountContext.Provider value={{ count, setCount, theme, setTheme }}>{children}</CountContext.Provider>
  )
}

function ExampleOne() {
  const { count, setCount } = useContext(CountContext)

  return (
    <div>
      <p>exampleOne Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

function ExampleTwo() {
  const { count, theme } = useContext(CountContext)
  return (
    <div>
      <p>exampleTwo Count: {count}</p>
      <p>exampleTwo Theme: {theme}</p>
    </div>
  )
}

function ContextApp() {
  return (
    <CounterProvider>
      <ExampleOne />
      <hr />
      <ExampleTwo />
    </CounterProvider>
  )
}

function Info() {
  return (
    <div>
      <h1>useContext</h1>
      <p className="description-content">
        在 React 中，useContext 是一个 Hook，用于在函数组件中访问 Context（上下文）， 以便在组件树中共享数据（如状态、函数等），避免通过
        props 逐层传递数据。 它简化了全局状态或配置的访问，特别适合与 useReducer 或其他状态管理结合使用
      </p>
      <p className="description-content">语法：{`const value = useContext(context)`}</p>
      <p className="description-content">创建context：{`const MyContext = createContext(defaultValue)`}</p>
    </div>
  )
}

export default UseContext
