import { useState, useRef, useEffect, type ReactNode } from 'react'
import styles from './Window.module.css'
import { TbArrowBigRightFilled, TbArrowBigLeftFilled } from 'react-icons/tb'
import { FaRegMinusSquare, FaRegWindowClose } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface arrayItem {
	item: ReactNode
}

interface WindowProps {
	array: arrayItem[]
	children?: React.ReactNode
}

export default function Window({ array }: WindowProps) {
	const [index, setIndex] = useState(0)
	const [close, setClose] = useState(false)
	const boxRef = useRef<HTMLDivElement>(null)

	const naviagte = useNavigate()

	function next() {
		if (index === array.length - 1) return
		setIndex(index + 1)
	}

	function back() {
		if (index === 0) return
		setIndex(index - 1)
	}

	function closeHandle() {
		setClose(true)
		setTimeout(() => {
			naviagte('/')
		}, 450)
	}

	useEffect(() => {
		if (boxRef.current) {
			boxRef.current.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}, [index])

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next()
			else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') back()
			else if (e.key === 'Escape') naviagte('/')
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [index])

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.window} ${close ? styles.minimise : ''}`}>
				<div className={`${styles.bar}`}>
					<div className={`${styles.title} creepster`}>Guide</div>
					<div className={styles.btn_container}>
						<div onClick={closeHandle}>
							<FaRegMinusSquare className={`${styles.icon} ${styles.minus}`} />
						</div>
						<div onClick={closeHandle}>
							<FaRegWindowClose className={`${styles.icon} ${styles.close}`} />
						</div>
					</div>
				</div>
				<div className={`${styles.box}`} ref={boxRef}>
					<div className={`${styles.children}`}>{array[index].item}</div>
				</div>
				<div className={`${styles.footer}`}>
					<div className={`${styles.arrow_box}`}>
						<TbArrowBigLeftFilled
							className={`${styles.icon} ${styles.arrow} ${
								index === 0 ? styles.arrow_disabled : ''
							}`}
							onClick={back}
						/>
						<TbArrowBigRightFilled
							className={`${styles.icon} ${styles.arrow} ${
								index === array.length - 1 ? styles.arrow_disabled : ''
							}`}
							onClick={next}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
