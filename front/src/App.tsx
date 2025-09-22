import './App.css'
// 在这引入要展示的demo
// 注：组件名必须以大写字母开头，这是React设计的规范。否则React会把它当作原生HTML标签来处理，而非自定义组件。
import Index from './components/animation'
function App() {

  return (
      <Index/>
  )
}

export default App
