import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			keyframes: {
				slideRightEnter: {
					'0%': {
						opacity: 0,
						transform: 'translateX(-30px)'
					},
					'100%': {
						opacity: 100,
						transform: 'translateX(0px)'
					}
				},
				slideLeftEnter: {
					'0%': {
						opacity: 0,
						transform: 'translateX(30px)'
					},
					'100%': {
						opacity: 100,
						transform: 'translateX(0px)'
					}
				},
				opacityEnter: {
					'0%': {
						opacity: 0
					},
					'100%': {
						opacity: 100
					}
				},
				opacityExit: {
					'0%': {
						opacity: 100
					},
					'100%': {
						opacity: 0
					}
				}
			}
		}
	},
	plugins: []
}
export default config
