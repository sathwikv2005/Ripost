import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Notification from '../Notification'

export default function MobileNoti() {
	const [isMobile, setIsMobile] = useState(false)
	const [showNoti, setShowNoti] = useState(false)
	const [dontShowAgain, setDontShowAgain] = useState(false)

	useEffect(() => {
		const storedPref = localStorage.getItem('hideMobileNotice')
		if (storedPref === 'true') return

		const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
		checkIsMobile()
		window.addEventListener('resize', checkIsMobile)

		return () => window.removeEventListener('resize', checkIsMobile)
	}, [])

	useEffect(() => {
		if (isMobile && localStorage.getItem('hideMobileNotice') !== 'true') {
			setShowNoti(true)
		}
	}, [isMobile])

	function close() {
		setShowNoti(false)
		if (dontShowAgain) {
			localStorage.setItem('hideMobileNotice', 'true')
		}
	}
	return (
		isMobile && (
			<Notification show={showNoti && isMobile}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row-reverse',
						gap: '5px',
						height: '100%',
					}}
				>
					<div
						style={{
							fontSize: '30px',
							padding: '0',
							display: 'flex',
							justifyContent: 'center',
							textAlign: 'center',
							alignItems: 'center',
							backgroundColor: 'var(--red-dark)',
							minHeight: '100%',
							width: '40px',
							flexShrink: 0,
							borderRadius: '0px 10px 10px 0px',
							cursor: 'pointer',
						}}
						onClick={close}
					>
						<IoClose onClick={close} />
					</div>
					<div style={{ padding: '10px' }}>
						<div>
							🤖 Oops! This game only runs on PCs. Fire up your computer and get ready to play!
						</div>

						<label
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								fontSize: '13px',
								marginTop: '10px',
								gap: '6px',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={dontShowAgain}
								onChange={(e) => setDontShowAgain(e.target.checked)}
							/>
							Don't show again
						</label>
					</div>
				</div>
			</Notification>
		)
	)
}
