import styles from './Notification.module.css'

interface Props {
	NotificationContainerStyles?: React.CSSProperties
	show: boolean
	children: React.ReactNode
}

export default function Notification({ NotificationContainerStyles, show, children }: Props) {
	return (
		<div
			className={`${styles.noti} ${show ? '' : styles.close}`}
			style={NotificationContainerStyles}
		>
			{children}
		</div>
	)
}
