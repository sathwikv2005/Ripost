import { Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Guide from './pages/Guide'
import Game from './pages/Game'

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/guide" element={<Guide />} />
				<Route path="/game" element={<Game />} />
			</Routes>
		</>
	)
}

export default App
