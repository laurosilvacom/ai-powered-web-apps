export function BotAvatar() {
	return (
		<div className="relative flex h-8 w-8 items-center justify-center">
			<svg
				viewBox="0 0 38 38"
				className="h-8 w-8 text-black dark:text-white"
				fill="none">
				<path
					d="M19 4C11.268 4 5 10.268 5 18C5 25.732 11.268 32 19 32C26.732 32 33 25.732 33 18C33 10.268 26.732 4 19 4Z"
					fill="currentColor"
					fillOpacity="0.05"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<path
					d="M19 10C14.582 10 11 13.582 11 18C11 22.418 14.582 26 19 26C23.418 26 27 22.418 27 18C27 13.582 23.418 10 19 10Z"
					fill="currentColor"
					fillOpacity="0.1"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<circle cx="19" cy="18" r="4" fill="currentColor" />
			</svg>
		</div>
	)
}
