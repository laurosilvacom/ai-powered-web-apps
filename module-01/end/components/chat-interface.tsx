'use client'

import type React from 'react'
import {useState, useRef, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {SendIcon} from 'lucide-react'
import {ChatMessage} from '@/components/chat-message'

interface Message {
	role: string
	content: string
	id?: string
}

interface ChatInterfaceProps {
	initialMessages?: Message[]
	title?: string
}

// Main chat interface component that handles message display and submission
export function ChatInterface({
	initialMessages = [],
	title = ''
}: ChatInterfaceProps) {
	// State to track messages, input field value, and loading status
	const [messages, setMessages] = useState<Message[]>(
		initialMessages.map((msg) => ({
			...msg,
			id: Math.random().toString(36).substring(2, 9)
		}))
	)

	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// Helper function to scroll to the bottom of the chat
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
	}

	// Automatically scroll to bottom when new messages are added
	useEffect(() => {
		scrollToBottom()
	}, [messages])

	// Handle form submission to send new messages
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!inputValue.trim() || isLoading) return

		// Add user message to the chat
		const userMessage = {
			role: 'user',
			content: inputValue,
			id: Math.random().toString(36).substring(2, 9)
		}
		setMessages((prev) => [...prev, userMessage])
		setInputValue('')
		setIsLoading(true)

		// Simulate AI response with a timeout (would be replaced with actual API call)
		setTimeout(() => {
			const assistantMessage = {
				role: 'assistant',
				content: 'Add AI functionality to your applicatio!',
				id: Math.random().toString(36).substring(2, 9)
			}
			setMessages((prev) => [...prev, assistantMessage])
			setIsLoading(false)
		}, 500)
	}

	return (
		<div className="flex h-full flex-1 flex-col overflow-hidden bg-white">
			{/* Optional title bar shown when title prop is provided */}
			{title && (
				<div className="border-b border-gray-100 p-4">
					<h1 className="text-xl font-medium">{title}</h1>
				</div>
			)}

			{/* Main chat messages area with scrolling */}
			<div className="flex-1 space-y-8 overflow-y-auto p-6">
				{messages.length === 0 ? (
					// Empty state when no messages exist yet
					<div className="flex h-full items-center justify-center">
						<div className="text-center">
							<h1 className="mb-3 text-2xl font-medium">Ask me anything</h1>
							<p className="leading-relaxed text-gray-500">
								Get lightning-fast answers to your development questions.
							</p>
						</div>
					</div>
				) : (
					// Map through and display all messages
					messages.map((message) => (
						<div key={message.id}>
							<ChatMessage role={message.role} content={message.content} />
						</div>
					))
				)}

				{/* Loading indicator shown while waiting for AI response */}
				{isLoading && (
					<div className="ml-12 flex items-center space-x-2">
						<div className="h-2 w-2 animate-pulse rounded-full bg-gray-300"></div>
						<div
							className="h-2 w-2 animate-pulse rounded-full bg-gray-300"
							style={{animationDelay: '150ms'}}></div>
						<div
							className="h-2 w-2 animate-pulse rounded-full bg-gray-300"
							style={{animationDelay: '300ms'}}></div>
					</div>
				)}

				{/* Reference element for auto-scrolling */}
				<div ref={messagesEndRef} />
			</div>

			{/* Message input form at the bottom */}
			<div className="border-t border-gray-100 p-4">
				<form onSubmit={handleSubmit} className="flex space-x-2">
					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Ask anything..."
						className="flex-1 rounded-full border border-gray-200 py-6 focus-visible:ring-black"
						disabled={isLoading}
					/>
					<Button
						type="submit"
						size="icon"
						className="h-12 w-12 rounded-full bg-black hover:bg-black/90"
						disabled={isLoading}>
						<SendIcon className="h-5 w-5" strokeWidth={1.5} />
					</Button>
				</form>
				<p className="mt-3 text-center text-xs text-gray-400">
					Faster · Better · More Affordable
				</p>
			</div>
		</div>
	)
}
