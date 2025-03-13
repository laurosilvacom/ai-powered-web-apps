import {Sidebar} from '@/components/sidebar'
import {Logo} from '@/components/logo'

// Default chat page component that displays when no specific chat is selected
export default function ChatPage() {
	return (
		<div className="flex h-screen bg-white">
			<Sidebar />
			<div className="flex flex-1 flex-col items-center justify-center">
				<div className="max-w-md px-4 text-center">
					<div className="mb-6 flex justify-center">
						<Logo />
					</div>
					<h2 className="mb-3 text-2xl font-medium">
						Welcome to FrontendTrail
					</h2>
					<p className="mb-8 leading-relaxed text-gray-500">
						Your AI assistant for development questions. Select a conversation
						or start a new one.
					</p>
					<svg
						className="mx-auto mb-4 h-24 w-24 text-gray-200"
						fill="none"
						stroke="currentColor"
						strokeWidth="1"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
						/>
					</svg>
				</div>
			</div>
		</div>
	)
}
