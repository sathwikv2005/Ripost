import { useEffect, useRef, useState } from 'react'
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6'
import styles from './Game.module.css'
import words from '../../words/words_9k.json'

import UiBottom from '../components/game/UiBottom'
import Boss from '../components/game/Boss'
import WordDisplay from '../components/game/WordDisplay'
import PlayerStats from '../components/game/PlayerStats'

import bossTheme from '../assets/sfx/bossbgm.mp3'
import bosshit from '../assets/sfx/bosshit.mp3'
import wrong from '../assets/sfx/wrong.mp3'
import keyPress from '../assets/sfx/keypress.mp3'
import damageTaken from '../assets/sfx/damagetaken.mp3'

import type { StatsInterface } from '../types/stats'
import GameOver from '../components/game/GameOver'

const defaultStats: StatsInterface = {
	totalWords: 0,
	missedWords: 0,
	correctWords: 0,
	damageDelt: 0,
	longestCombo: 0,
	damageRecieved: 0,
	gameStartTime: 0,
	gameEndTime: 0,
	higestBurnStack: 0,
}

export default function Game() {
	//------------------------------------------------------
	// CONSTANTS
	//------------------------------------------------------
	const baseTime = 1000
	const timePerLetter = 500
	const delayBetweenWords = 500
	const burnStatusRounds = 2
	const damageFromFire = 15
	const damageFromBurns = 5

	//------------------------------------------------------
	// GAME STATE
	//------------------------------------------------------
	const [winStatus, setWinStatus] = useState<boolean>(false)
	const [stats, setStats] = useState<StatsInterface>(defaultStats)

	const [bossHealth, setBossHealth] = useState(100)
	const [playerHealth, setPlayerHealth] = useState(100)
	const [damage, setDamage] = useState(0)
	const [damagePlayer, setDamagePlayer] = useState(0)

	const [word, setWord] = useState<string | null>(null)
	const [wordState, setWordState] = useState<'typing' | 'success' | 'fail' | null>(null)
	const [gameState, setGameState] = useState<'starting' | 'playing' | 'complete'>('starting')

	const [showBoss, setShowBoss] = useState(false)
	const [burnStatus, setBurnStatus] = useState(0)
	const [comboStatus, setComboStatus] = useState(0)

	const [timeToType, setTimeToType] = useState(0)

	const hitClearRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	//------------------------------------------------------
	// SOUND
	//------------------------------------------------------
	const [muted, setMuted] = useState(() => {
		return localStorage.getItem('muted') === 'true'
	})
	const bossHitSound = useRef(new Audio(bosshit))
	const bossThemeSound = useRef(new Audio(bossTheme))
	const keyPressSound = useRef(new Audio(keyPress))
	const wrongSound = useRef(new Audio(wrong))
	const damageTakenSound = useRef(new Audio(damageTaken))

	//------------------------------------------------------
	// HELPERS
	//------------------------------------------------------
	const getRandomWord = () => {
		const randomIndex = Math.floor(Math.random() * words.length)
		return words[randomIndex].toLowerCase()
	}

	function handleTypo() {
		wrongSound.current.currentTime = 0
		wrongSound.current.volume = 0.3
		wrongSound.current.play()
	}

	function handleKeyPress() {
		keyPressSound.current.currentTime = 0
		keyPressSound.current.volume = 0.3
		keyPressSound.current.play()
	}

	function playDamageTaken() {
		damageTakenSound.current.currentTime = 0
		damageTakenSound.current.volume = 0.3
		damageTakenSound.current.play()
	}

	function addBurnStatus(rounds: number = burnStatusRounds) {
		setBurnStatus((b) => b + rounds)
	}

	function handleMute() {
		setMuted((prev) => {
			localStorage.setItem('muted', (!prev).toString())
			if (!prev) bossThemeSound.current.pause()
			else playBossTheme()
			return !prev
		})
	}

	function playBossTheme() {
		bossThemeSound.current.currentTime = 0
		bossThemeSound.current.loop = true
		bossThemeSound.current.volume = 0.2
		bossThemeSound.current.play()
	}

	function updateStats(partial: Partial<StatsInterface>) {
		setStats((s) => ({ ...s, ...partial }))
	}

	function resetGame() {
		// Reset stats
		setStats({ ...defaultStats, gameStartTime: 0 })

		// Reset health
		setBossHealth(100)
		setPlayerHealth(100)

		// Reset damage
		setDamage(0)
		setDamagePlayer(0)

		// Reset word-related
		setWord(null)
		setWordState(null)
		setTimeToType(0)

		// Reset status
		setBurnStatus(0)
		setComboStatus(0)
		setHit(false)

		// Reset flags
		setShowBoss(false)
		setWinStatus(false)

		//
		setGameState('starting')
	}

	//------------------------------------------------------
	// BOSS DAMAGE
	//------------------------------------------------------
	function bossDamage(value: number) {
		if (bossHealth <= 0) return setGameState('complete')

		bossHitSound.current.currentTime = 0
		bossHitSound.current.volume = 0.3
		bossHitSound.current.play()

		setDamage((d) => d + value)
		setBossHealth((prev) => {
			if (prev - value <= 0) setGameState('complete')
			return Math.max(prev - value, 0)
		})

		if (!hitClearRef.current) {
			hitClearRef.current = setTimeout(() => {
				setHit(false)
				hitClearRef.current = null
			}, 1000)
		}
		setHit(true)
		updateStats({ damageDelt: stats.damageDelt + value })
		setTimeout(() => setDamage((d) => d - value), 2000)
	}

	//------------------------------------------------------
	// WORD RESULT
	//------------------------------------------------------
	const [hit, setHit] = useState(false)

	function handleSetWordState(state: 'typing' | 'success' | 'fail' | null) {
		if (word && state === 'success') {
			setComboStatus((c) => {
				updateStats({
					longestCombo: Math.max(stats.longestCombo, c + 1),
					correctWords: stats.correctWords + 1,
					totalWords: stats.totalWords + 1,
				})

				return c + 1
			})

			if (burnStatus > 0) {
				playDamageTaken()
				setPlayerHealth((h) => {
					if (h - damageFromBurns <= 0) setGameState('complete')
					return Math.max(h - damageFromBurns, 0)
				})

				setDamagePlayer((d) => d + damageFromBurns)
				setTimeout(() => setDamagePlayer((d) => d - damageFromBurns), 2000)

				setBurnStatus((b) => b - 1)
				updateStats({
					damageRecieved: stats.damageRecieved + damageFromBurns,
				})
			}

			bossDamage(word.length)
		}

		if (word && state === 'fail') {
			let total = damageFromFire

			if (burnStatus > 0) {
				total += damageFromBurns
				setBurnStatus((b) => b - 1)
			}

			setPlayerHealth((h) => {
				if (h - total <= 0) setGameState('complete')
				return Math.max(h - total, 0)
			})
			setDamagePlayer((d) => d + total)
			setTimeout(() => setDamagePlayer((d) => d - total), 2000)

			updateStats({
				missedWords: stats.missedWords + 1,
				damageRecieved: stats.damageRecieved + total,
				totalWords: stats.totalWords + 1,
			})

			playDamageTaken()
			addBurnStatus()
			setComboStatus(0)
		}

		setWordState(state)
	}

	//------------------------------------------------------
	// Game state handling
	//------------------------------------------------------

	useEffect(() => {
		if (gameState === 'complete') {
			setWord(null)
			bossThemeSound.current.pause()
			updateStats({ gameEndTime: Date.now() })

			const didWin = bossHealth <= 0

			if (didWin) {
				setWinStatus(true)
			}
		}
	}, [gameState])

	//------------------------------------------------------
	// START GAME
	//------------------------------------------------------
	useEffect(() => {
		if (gameState !== 'starting') return
		function handleFirstInput() {
			if (!muted) playBossTheme()

			updateStats({ ...defaultStats, gameStartTime: Date.now() })

			setShowBoss(true)
			setTimeout(() => setGameState('playing'), 2000)

			window.removeEventListener('keydown', handleFirstInput)
		}

		window.addEventListener('keydown', handleFirstInput)
		return () => window.removeEventListener('keydown', handleFirstInput)
	}, [gameState])

	//------------------------------------------------------
	// NEW WORD ON SUCCESS/FAIL
	//------------------------------------------------------
	useEffect(() => {
		if (gameState !== 'playing') return
		console.log(stats)
		const newWord = getRandomWord()
		setWord(newWord)

		updateStats({ higestBurnStack: Math.max(stats.higestBurnStack, burnStatus) })

		const time = baseTime + newWord.length * timePerLetter
		setTimeToType(time)

		setWordState('typing')
	}, [wordState, gameState])

	return (
		<div className={styles.container}>
			<div className={styles.background}></div>
			{gameState === 'complete' && (
				<GameOver stats={stats} winStatus={winStatus} resetGame={resetGame} />
			)}
			<div className={styles.topUI}>
				<PlayerStats burns={burnStatus} health={playerHealth} damage={damagePlayer} />
				<div className={styles.topUI_right}>
					{!muted ? (
						<FaVolumeHigh onClick={handleMute} className={styles.topUI_icon} />
					) : (
						<FaVolumeXmark
							onClick={handleMute}
							className={`${styles.topUI_icon} ${styles.topUI_icon_muted}`}
						/>
					)}
				</div>
			</div>

			<div className={styles.gameContainer}>
				{gameState === 'starting' && !showBoss && (
					<div className={`${styles.startText} creepster`}>Press any key to start</div>
				)}

				{showBoss && <Boss hit={hit || bossHealth === 0} />}

				{gameState !== 'starting' && (
					<WordDisplay
						key={word}
						word={word}
						timeToType={timeToType}
						delayBetweenWords={delayBetweenWords}
						wordState={wordState}
						setWordState={handleSetWordState}
						handleTypo={handleTypo}
						keyPress={handleKeyPress}
					/>
				)}
			</div>

			<UiBottom bossHealth={bossHealth} damage={damage} />
		</div>
	)
}
