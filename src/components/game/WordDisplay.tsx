import { useEffect, useRef, useState } from 'react'
import styles from './WordDisplay.module.css'

interface props {
	word: string | null
	timerPercent: number
	wordState: string | null
	setWordState: (s: 'typing' | 'success' | 'fail' | null) => void
	handleTypo: () => void
}

export default function WordDisplay({
	word,
	timerPercent,
	setWordState,
	wordState,
	handleTypo,
}: props) {
	if (word === null) return
	const [i, setI] = useState(0)
	const iRef = useRef(0)

	const letterRefs = useRef<(HTMLDivElement | null)[]>([])

	function handleKeyPress(char: string) {
		if (!word) return

		const currentIndex = iRef.current

		if (word[currentIndex] === char) {
			letterRefs.current[currentIndex]?.classList.add(styles.typed)
			iRef.current += 1
			setI(iRef.current)

			if (currentIndex + 1 >= word.length) setWordState('success')
		} else {
			letterRefs.current[currentIndex]?.classList.add(styles.typo)
		}
	}

	useEffect(() => {
		iRef.current = 0
		setI(0)
		const handleKeyDown = (e: KeyboardEvent) => {
			if (/^[a-zA-Z]$/.test(e.key)) {
				handleKeyPress(e.key.toLowerCase())
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [word])

	if (timerPercent === 0) {
		setWordState('fail')
	}
	return (
		<div className={`${styles.container}`}>
			<div key={word} className={`${styles.word} ${wordState === 'failed' ? styles.failed : ''}`}>
				{word.split('').map((char, index) => (
					<div
						ref={(el) => (letterRefs.current[index] = el)}
						key={index}
						className={`creepster ${styles.letter}`}
					>
						{char}
					</div>
				))}
			</div>
			<div className={`${styles.timer}`} style={{ width: `${timerPercent}%` }}></div>
		</div>
	)
}
