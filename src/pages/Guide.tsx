import Window from '../components/guide/Window'
import styles from './Guide.module.css'

export default function Guide() {
	return (
		<Window
			array={[
				{
					item: (
						<div className={styles.container}>
							<div className={styles.pageNumber}>Page 1</div>

							<div className={styles.section}>
								<h2>Welcome to RIPOST!</h2>
								<p>
									Welcome, challenger! You are about to enter the world of <strong>RIPOST</strong>,
									a retro-styled typing battle game where words are your weapons.
								</p>
								<p>
									Face off against the mighty boss who attacks by spitting out words. Your mission
									is simple: type the words correctly and quickly to parry incoming attacks!
								</p>
								<p>
									The faster and more accurate you type, the more damage you deal—and the less
									damage you take. Are your fingers ready for action?
								</p>
								<p className={styles.tip}>
									Tip: Keep your fingers on the home row and focus on one word at a time!
								</p>
							</div>

							<div className={styles.section}>
								<h2>How to Play</h2>
								<ul>
									<li>Watch the words the boss spits out.</li>
									<li>Type each word correctly before it reaches you.</li>
									<li>Mistyped words will cause damage!</li>
									<li>Completing words quickly increases your combo multiplier.</li>
								</ul>
								<p className={styles.powerup}>
									Power-up Words: Certain words give you shields, extra points, or special
									abilities. Type them perfectly to gain an edge.
								</p>
							</div>
						</div>
					),
				},

				{
					item: (
						<div className={styles.container}>
							<div className={styles.pageNumber}>Page 2</div>

							<div className={styles.section}>
								<h2>Difficulty Levels</h2>
								<p>
									RIPOST adjusts the challenge to your typing speed. Start easy and move up to
									harder levels as your skills improve.
								</p>
								<ul>
									<li>
										<strong>Easy:</strong> Slow word attacks, simple words.
									</li>
									<li>
										<strong>Medium:</strong> Moderate speed, mix of common and tricky words.
									</li>
									<li>
										<strong>Hard:</strong> Fast attacks, longer and complex words.
									</li>
									<li>
										<strong>Expert:</strong> Lightning-fast attacks, random and challenging words.
									</li>
								</ul>
								<p className={styles.protip}>
									Pro Tip: Practice makes perfect—keep typing to climb the ranks and survive longer
									battles!
								</p>
							</div>

							<div className={styles.section}>
								<h2>Tips & Tricks</h2>
								<p>- Focus on rhythm: Type steadily rather than rushing one word at a time.</p>
								<p>- Use all fingers: Avoid hunting and pecking; train your touch typing.</p>
								<p>- Take breaks: Stay sharp to maintain speed and accuracy.</p>
								<p className={styles.reminder}>
									Remember: Your keyboard is your weapon. Sharpen your skills and defeat the boss in
									style!
								</p>
							</div>
						</div>
					),
				},
			]}
		/>
	)
}
