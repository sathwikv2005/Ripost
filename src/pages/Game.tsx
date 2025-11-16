import { useEffect, useState, useRef } from 'react'
import styles from './Game.module.css'
import words from '../../words/words_9k.json'
import UiBottom from '../components/game/UiBottom'
import Boss from '../components/game/Boss'
import WordDisplay from '../components/game/WordDisplay'

export default function Game() {
	const baseTime = 1000
	const timePerLetter = 500
	const delayBetweenWords = 800

	const [bossHealth, setBossHealth] = useState(100)
	const [damage, setDamage] = useState(0)
	const [word, setWord] = useState<string | null>(null)
	const [wordState, setWordState] = useState<'typing' | 'success' | 'fail' | null>(null)
	const [gameState, setGameState] = useState<'starting' | 'playing' | 'complete'>('starting')
	const [timer, setTimer] = useState(0)
	const [timeRemaining, setTimeRemaining] = useState(0)
	const [hit, setHit] = useState(false)

	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const timerEndRef = useRef<number>(0)
	const hitClearTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const getRandomWord = () => {
		const randomIndex = Math.floor(Math.random() * words.length)
		return words[randomIndex].toLowerCase()
	}

	function handleTypo() {
		setWordState('fail')
	}

	function bossDamage(value: number) {
		if (bossHealth <= 0) return setGameState('complete')

		setDamage((prev) => prev + value)
		setBossHealth((prev) => {
			if (prev - value <= 0) setGameState('complete') //TODO: add win screen
			if (prev < value) return 0
			return prev - value
		})

		setHit((prev) => {
			if (!prev) {
				if (hitClearTimeoutRef.current) clearTimeout(hitClearTimeoutRef.current)
				hitClearTimeoutRef.current = setTimeout(() => {
					setHit(false)
					hitClearTimeoutRef.current = null
				}, 1000)
				return true
			}
			return prev
		})

		setTimeout(() => {
			setDamage((prev) => prev - value)
		}, 2000)
	}

	function handleSetWordState(state: 'typing' | 'success' | 'fail' | null) {
		if (word && state === 'success') {
			bossDamage(word.length)
		}
		setWordState(state)
	}

	useEffect(() => {
		setTimeout(() => setGameState('playing'), 2000)
	}, [])

	useEffect(() => {
		if (gameState !== 'playing') {
			if (timerRef.current) clearTimeout(timerRef.current)
			if (intervalRef.current) clearInterval(intervalRef.current)
			setWord(null)
			setTimer(0)
			setTimeRemaining(0)
			setWordState(null)
			return
		}
		if (timerRef.current) clearTimeout(timerRef.current)
		if (intervalRef.current) clearInterval(intervalRef.current)

		const newWord = getRandomWord()
		const timeToType = baseTime + newWord.length * timePerLetter

		setWord(newWord)
		setTimer(timeToType)
		setTimeRemaining(timeToType)
		setWordState('typing')

		timerEndRef.current = Date.now() + timeToType + delayBetweenWords

		const delayTimeout = setTimeout(() => {
			intervalRef.current = setInterval(() => {
				const remaining = timerEndRef.current - Date.now()
				if (remaining <= 0) {
					clearInterval(intervalRef.current!)
					setWordState('fail')
					setTimeRemaining(0)
					return
				}
				setTimeRemaining(remaining)
			}, 100)

			timerRef.current = setTimeout(() => {
				setWordState('fail')
			}, timeToType)
		}, delayBetweenWords)

		return () => {
			clearTimeout(delayTimeout)
			if (timerRef.current) clearTimeout(timerRef.current)
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [wordState, gameState])

	return (
		<div className={styles.gameContainer}>
			<div className={styles.background}></div>

			<Boss hit={hit || bossHealth === 0} />
			<WordDisplay
				word={word}
				timerPercent={(timeRemaining / timer) * 100}
				setWordState={handleSetWordState}
				wordState={wordState}
				handleTypo={handleTypo}
			/>
			<UiBottom bossHealth={bossHealth} damage={damage} />
		</div>
	)
}
