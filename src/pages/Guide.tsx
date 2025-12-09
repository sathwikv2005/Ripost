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
									Welcome, challenger! You are about to enter the world of <strong>RIPOST</strong> —
									a fast-paced retro typing battle where{' '}
									<strong>your words become your parries</strong>.
								</p>
								<p>
									The boss launches attacks in the form of words. Your goal is to{' '}
									<strong>parry </strong>
									each incoming word by typing it correctly before the timer runs out.
								</p>
								<p>
									Perfect parries deal damage to the boss. Failed or slow parries will cause
									<strong>burn damage</strong> to you — so stay focused, stay fast, and stay sharp.
								</p>
								<p className={styles.tip}>
									Tip: Keep calm and type with rhythm. Panic is the real enemy.
								</p>
							</div>

							<div className={styles.section}>
								<h2>How to Play</h2>
								<ul>
									<li>The boss spits out a word — the attack has begun.</li>
									<li>Type the entire word correctly within the time limit to parry it.</li>
									<li>
										If you succeed, the boss takes{' '}
										<strong>damage equal to the length of the word</strong>.
									</li>
									<li>
										If you fail or run out of time, you take <strong>15 burn damage</strong>.
									</li>
									<li>
										After every word (success or fail), you gain <strong>2 Burn Stacks</strong>.
									</li>
									<li>
										Only <strong>1 burn</strong> is consumed per word, dealing{' '}
										<strong>5 bonus burn damage</strong>.
									</li>
								</ul>

								<p className={styles.powerup}>
									Mechanic Insight: Burn damage stacks over time — stay accurate to minimize life
									loss.
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
								<h2>Health & Victory Conditions</h2>
								<p>
									You start with <strong>100 Health</strong>. The boss also has{' '}
									<strong>100 Health</strong>.
								</p>
								<ul>
									<li>
										<strong>You win</strong> when the boss’s health reaches 0.
									</li>
									<li>
										<strong>You lose</strong> if your health reaches 0.
									</li>
									<li>
										Strong parries (longer words) deal more damage — use them to shred the boss
										fast.
									</li>
									<li>Mistakes quickly snowball due to burn stacks — accuracy is survival.</li>
								</ul>
								<p className={styles.protip}>
									Pro Tip: The real battle isn’t speed — it’s consistency. Play steady, not
									reckless.
								</p>
							</div>

							<div className={styles.section}>
								<h2>Tips & Strategy</h2>
								<p>
									- Focus on one clean parry at a time. Don't look at your health bar mid-fight.
								</p>
								<p>- Longer words = more boss damage. Treat them like power moves.</p>
								<p>- Burn stacks are inevitable — minimize failures to keep damage manageable.</p>
								<p>- Keep your typing steady and rely on rhythm instead of brute force speed.</p>

								<p className={styles.reminder}>
									Remember: Every word is a duel. Parry cleanly, survive the burn, and defeat the
									boss.
								</p>
							</div>
						</div>
					),
				},
			]}
		/>
	)
}
