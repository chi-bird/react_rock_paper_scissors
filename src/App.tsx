import './App.css'
import { Game } from './components/Game'

function App() {
  return (
    <div>
      <h1>じゃんけんゲーム</h1>
      <div className="card">
        <Game />
      </div>
    </div>
  )
}

export default App
