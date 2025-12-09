import { useNavigate } from 'react-router-dom'
import styles from './GameOver.module.css'
import type { StatsInterface } from '../../types/stats'

interface propsInterface {
	stats: StatsInterface
	winStatus: boolean
	resetGame: () => void
}

export default function GameOver(props: propsInterface) {
	const navigate = useNavigate()
	function formatTime(ms: number) {
		const totalSeconds = Math.floor(ms / 1000)

		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)
		const seconds = totalSeconds % 60

		const parts = []

		if (hours > 0) parts.push(`${hours}h`)
		if (minutes > 0) parts.push(`${minutes}m`)
		if (seconds > 0) parts.push(`${seconds}s`)

		if (parts.length === 0) return '0s'

		return parts.join(' ')
	}

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.window}`}>
				<div className={`${styles.header} creepster`}>
					{props.winStatus ? 'Victory' : 'Game Over'}
				</div>
				<div className={`${styles.statsContainer}`}>
					<div className={`${styles.statsItem}`}>
						<div className={`${styles.statsName} creepster`}>Total Words</div>
						<div className={`${styles.statsValue} `}>{props.stats.totalWords}</div>
					</div>
					<div className={`${styles.statsItem}`}>
						<div className={`${styles.statsName} creepster`}>Correctly Typed</div>
						<div className={`${styles.statsValue} `}>{props.stats.correctWords}</div>
					</div>
					<div className={`${styles.statsItem}`}>
						<div className={`${styles.statsName} creepster`}>Miss Typed</div>
						<div className={`${styles.statsValue} `}>{props.stats.missedWords}</div>
					</div>
					<div className={`${styles.statsItem}`}>
						<div className={`${styles.statsName} creepster`}>Longest Combo</div>
						<div className={`${styles.statsValue} `}>{props.stats.longestCombo}</div>
					</div>
					<div className={`${styles.statsItem}`}>
						<div className={`${styles.statsName} creepster`}>Higest Number of Burns</div>
						<div className={`${styles.statsValue} `}>{props.stats.higestBurnStack}</div>
					</div>
					<div className={`${styles.statsItem}`}>
						<div className={`${styles.statsName} creepster`}>Play Time</div>
						<div className={`${styles.statsValue} `}>
							{formatTime(props.stats.gameEndTime - props.stats.gameStartTime)}
						</div>
					</div>
					<div className={`${styles.statsItem}`}>
						<div className={`${styles.statsName} creepster`}>Damage Recieved</div>
						<div className={`${styles.statsValue} `}>{props.stats.damageRecieved}</div>
					</div>
					<div className={`${styles.statsItem}`}>
						<div className={`${styles.statsName} creepster`}>Damage Delt</div>
						<div className={`${styles.statsValue} `}>{props.stats.damageDelt}</div>
					</div>
				</div>
				<div className={`${styles.btnContainer}`}>
					<div className={`${styles.btn} creepster`} onClick={() => props.resetGame()}>
						New Game
					</div>
					<div className={`${styles.btn} creepster`} onClick={() => navigate('/')}>
						Main Menu
					</div>
				</div>
			</div>
		</div>
	)
}
