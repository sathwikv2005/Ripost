import styles from './Title.module.css'

export default function Title() {
	const text = 'Ripost'

	return (
		<div className={`${styles.title_container} creepster`}>
			{text.split('').map((char, i) => (
				<span
					className={`${styles.title} creepster`}
					key={i}
					style={{ '--i': i } as React.CSSProperties}
				>
					{char}
				</span>
			))}
		</div>
	)
}
