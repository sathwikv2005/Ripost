import { useEffect, useRef, useState } from 'react'
import styles from './WordDisplay.module.css'

interface Props {
	word: string | null
	timeToType: number
	delayBetweenWords: number
	wordState: 'typing' | 'success' | 'fail' | null
	setWordState: (s: 'typing' | 'success' | 'fail' | null) => void
	handleTypo: () => void
	keyPress: () => void
}

export default function WordDisplay({
	word,
	timeToType,
	delayBetweenWords,
	setWordState,
	wordState,
	handleTypo,
	keyPress,
}: Props) {
	if (!word) return null

	const [timePercent, setTimePercent] = useState(100)

	const letterRefs = useRef<(HTMLDivElement | null)[]>([])
	const iRef = useRef(0)
	const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const failTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const endTimeRef = useRef(0)

	//------------------------------------------------------
	// KEY PRESS HANDLING
	//------------------------------------------------------
	function onKey(char: string) {
		const index = iRef.current
		if (word && word[index] === char) {
			keyPress()
			letterRefs.current[index]?.classList.add(styles.typed)

			iRef.current++
			if (iRef.current >= word.length) {
				stopTimers()
				setWordState('success')
			}
		} else {
			letterRefs.current[index]?.classList.add(styles.typo)
			handleTypo()
		}
	}

	useEffect(() => {
		iRef.current = 0
		letterRefs.current = []
		const handler = (e: KeyboardEvent) => {
			if (/^[a-zA-Z]$/.test(e.key)) {
				onKey(e.key.toLowerCase())
			}
		}

		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [word])

	//------------------------------------------------------
	// TIMER LOGIC
	//------------------------------------------------------
	function stopTimers() {
		if (intervalRef.current) clearInterval(intervalRef.current)
		if (failTimeoutRef.current) clearTimeout(failTimeoutRef.current)
	}

	useEffect(() => {
		stopTimers()
		setTimePercent(100) // reset bar

		// Delay before the timer starts
		const startTimerTimeout = setTimeout(() => {
			endTimeRef.current = Date.now() + timeToType

			intervalRef.current = setInterval(() => {
				const remaining = endTimeRef.current - Date.now()
				if (remaining <= 0) {
					stopTimers()
					setTimePercent(0)
					setWordState('fail')
					return
				}
				setTimePercent((remaining / timeToType) * 100)
			}, 100)

			failTimeoutRef.current = setTimeout(() => {
				stopTimers()
				setTimePercent(0)
				setWordState('fail')
			}, timeToType)
		}, delayBetweenWords)

		return () => {
			clearTimeout(startTimerTimeout)
			stopTimers()
		}
	}, [word])

	return (
		<div key={word} className={styles.container}>
			<div className={styles.word}>
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

			{/* Timer bar */}
			<div className={styles.timer} style={{ width: `${timePercent}%` }}></div>
		</div>
	)
}
