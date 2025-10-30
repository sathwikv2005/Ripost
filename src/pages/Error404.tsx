import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Error404.module.css'

export default function Error404() {
	const navigate = useNavigate()
	const [saved, setSaved] = useState(false)

	function goHome() {
		navigate('/')
	}

	function save() {
		setSaved(true)
	}
	return (
		<>
			<div className={styles.container}>
				<div className={styles.title_container}>
					<div className={`${styles.title} creepster`}>Error</div>
					<div className={styles.number_holder}>
						<div className={`${styles.number} creepster`}>4</div>
						<div className={`${styles.number} creepster`}>0</div>
						<div
							className={`${styles.number} creepster ${saved ? styles.save : ''}`}
							onClick={save}
						>
							4
						</div>
					</div>
				</div>

				<p className={styles.description}>
					You seem to have wandered off the battlefield...
					<br /> this page doesn’t exist. 🕸️
				</p>
				<button className={`${styles.button}`} onClick={goHome}>
					Return Home
				</button>
			</div>
		</>
	)
}
