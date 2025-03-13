import {Button} from '@/components/ui/button'
import {PlusIcon, MessageSquare} from 'lucide-react'
import Link from 'next/link'
import {Logo} from '@/components/logo'

// Static list of chat conversations for the sidebar navigation
const chats = [
	{id: '1', title: 'How to learn React'},
	{id: '2', title: 'Explain quantum computing'},
	{id: '3', title: 'Write a poem about coding'}
]

// Sidebar component that displays navigation and chat history
export function Sidebar({activeChatId}: {activeChatId?: string}) {
	return (
		<div className="hidden h-full w-64 flex-col border-r border-gray-100 bg-white md:flex">
			{/* Logo section at the top */}
			<div className="flex items-center p-4">
				<Logo size="small" />
			</div>

			{/* New chat button section */}
			<div className="p-4">
				<Link href="/chat" passHref prefetch>
					<Button
						variant="outline"
						className="w-full justify-start rounded-full border border-gray-200 text-black hover:bg-gray-50">
						<PlusIcon className="mr-2 h-4 w-4" strokeWidth={1.5} />
						New chat
					</Button>
				</Link>
			</div>

			{/* Chat history list - scrollable if there are many chats */}
			<div className="flex-1 overflow-y-auto p-2">
				<div className="space-y-1">
					{chats.map((chat) => (
						<Link href={`/chat/${chat.id}`} key={chat.id} passHref prefetch>
							<button
								className={`flex w-full items-start rounded-xl p-3 text-left transition-colors hover:bg-gray-50 ${
									activeChatId === chat.id ? 'bg-gray-50' : ''
								}`}>
								<MessageSquare
									className="mr-2 mt-0.5 h-4 w-4 text-gray-400"
									strokeWidth={1.5}
								/>
								<span className="truncate text-sm">{chat.title}</span>
							</button>
						</Link>
					))}
				</div>
			</div>

			<div className="border-t border-gray-100 p-4">
				<div className="text-center text-xs text-gray-400">
					FrontendTrail © 2025
				</div>
			</div>
		</div>
	)
}
