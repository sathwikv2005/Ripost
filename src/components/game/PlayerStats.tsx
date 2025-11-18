import styles from './PlayerStats.module.css'

interface props {
	health: number
	damage: number
	burns: number
}

export default function PlayerStats({ burns, health, damage }: props) {
	return (
		<div className={styles.container}>
			<div className={styles.health_bar}>
				<div className={styles.health} style={{ width: `${health}%` }}></div>
				<div key={health} className={styles.damage} style={{ width: `${damage}%` }}></div>
			</div>
			<div className={styles.flexBox}>
				<div className={`${styles.title} creepster`}>Challenger</div>
				<div className={`${styles.statusBox}`}>
					{burns > 0 && (
						<>
							<img className={`${styles.icon}`} src="/fire.png"></img>
							<div className={`${styles.times} creepster`}>
								<span className="creepster">x</span>
								{burns}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
