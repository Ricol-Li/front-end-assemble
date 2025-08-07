import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Jxs from './pages/01.JSX/Jsx'
import MyComponent from './pages/02.component/MyComponent'
import UseState from './pages/03.hooks/01.useState'
import UseRef from './pages/03.hooks/02.useRef'
import UseEffect from './pages/03.hooks/03.useEffect'
import UseMemo from './pages/03.hooks/04.useMemo'

const menu = [
  {
    path: '/',
    name: 'JSX',
    component: Jxs,
  },
  {
    path: '/component',
    name: 'MyComponent',
    component: MyComponent,
  },
  {
    path: '/useState',
    name: 'useState',
    component: UseState,
  },
  {
    path: '/useRef',
    name: 'useRef',
    component: UseRef,
  },
  {
    path: '/useEffect',
    name: 'useEffect',
    component: UseEffect,
  },
  {
    path: '/useMemo',
    name: 'useMemo',
    component: UseMemo,
  },
]

function App() {
  console.log('App 组件渲染')
  return (
    <BrowserRouter>
      <ul>
        {menu.map(item => (
          <li key={item.path}>
            <a href={item.path}>{item.name}</a>
          </li>
        ))}
      </ul>
      <Routes>
        {menu.map(item => (
          <Route key={item.path} path={item.path} element={<item.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
