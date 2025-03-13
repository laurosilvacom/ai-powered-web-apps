import {User} from 'lucide-react'
import {BotAvatar} from '@/components/bot-avatar'

interface ChatMessageProps {
	role: string
	content: string
}

// Component that renders a single chat message with different styling based on sender role
export function ChatMessage({role, content}: ChatMessageProps) {
	return (
		<div
			className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
			<div
				className={`flex max-w-3xl ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
				{/* Avatar section - shows user icon or bot avatar based on message role */}
				<div className={role === 'user' ? 'ml-3' : 'mr-3'}>
					{role === 'user' ? (
						// User avatar - simple gray circle with user icon
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
							<User className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
						</div>
					) : (
						// Bot avatar - custom component for AI assistant
						<BotAvatar />
					)}
				</div>

				{/* Message bubble - black for user messages, gray for assistant messages */}
				<div
					className={`rounded-2xl p-4 ${role === 'user' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
					<p className="leading-relaxed">{content}</p>
				</div>
			</div>
		</div>
	)
}
