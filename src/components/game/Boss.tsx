import { useEffect, useRef, useState } from 'react'
import styles from './Boss.module.css'

export default function Boss() {
	const [frame, setFrame] = useState(0)
	// Sprite config
	const totalFrames = 4
	const frameWidth = 350
	const frameHeight = 350
	const fps = 6

	const lastTime = useRef(0)
	const requestRef = useRef<number | null>(null)

	useEffect(() => {
		const frameDuration = 1000 / fps

		const animate = (time: number) => {
			if (time - lastTime.current >= frameDuration) {
				setFrame((prev) => (prev + 1) % totalFrames)
				lastTime.current = time
			}
			requestRef.current = requestAnimationFrame(animate)
		}

		requestRef.current = requestAnimationFrame(animate)
		return () => {
			if (requestRef.current) cancelAnimationFrame(requestRef.current)
		}
	}, [fps, totalFrames])
	return (
		<div
			className={styles.boss}
			style={{
				backgroundImage: 'url(/boss.png)',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: `-${frame * frameWidth}px 0`,
				backgroundSize: `${frameWidth * totalFrames}px ${frameHeight}px`,
				width: `${frameWidth}px`,
				height: `${frameHeight}px`,
				imageRendering: 'pixelated',
			}}
		/>
	)
}
