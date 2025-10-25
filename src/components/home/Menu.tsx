import { Link } from 'react-router-dom'
import styles from './Menu.module.css'

export default function Menu() {
	return (
		<>
			<div className={`${styles.menu}`}>
				<div>
					<Link to="/game" className={`${styles.item} creepster`}>
						Start Game
					</Link>
				</div>
				<div>
					<Link to="/guide" className={`${styles.item} creepster`}>
						How To Play
					</Link>
				</div>
				<div>
					<Link
						to="https://github.com/sathwikv2005"
						target="_blank"
						className={`${styles.item} creepster`}
					>
						About
					</Link>
				</div>
			</div>
		</>
	)
}
