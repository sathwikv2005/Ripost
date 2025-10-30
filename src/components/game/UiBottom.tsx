import styles from './UiBottom.module.css'

interface props {
	bossHealth: number
	damage: number
}

export default function UiBottom({ bossHealth, damage }: props) {
	return (
		<div className={styles.ui_bottom}>
			<div className={styles.word}></div>
			<div className={styles.boss_health_container}>
				<div className={`${styles.top}`}>
					<div className={`${styles.boss_name} creepster`}>
						Goobnar, the Slightly Confused Dragon
					</div>
					{damage > 0 && <div className={`${styles.damage_value}`}>{damage}</div>}
				</div>
				<div className={styles.boss_health_bar}>
					<div className={styles.boss_health} style={{ width: `${bossHealth}%` }}></div>
					<div
						key={bossHealth}
						className={styles.boss_damage}
						style={{ width: `${damage}%` }}
					></div>
				</div>
			</div>
		</div>
	)
}
