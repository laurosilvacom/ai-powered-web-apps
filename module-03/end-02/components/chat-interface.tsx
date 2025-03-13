'use client'

import {useRef, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {SendIcon} from 'lucide-react'
import {ChatMessage} from '@/components/chat-message'
import {useChat} from '@ai-sdk/react'
import {Message} from 'ai'

export function ChatInterface({
	initialMessages = [],
	title = ''
}: {
	initialMessages?: Message[]
	title?: string
}) {
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		error,
		reload
	} = useChat({
		initialMessages,
		maxSteps: 5 // Enable multi-step tool execution
	})

	const messagesEndRef = useRef<HTMLDivElement>(null)

	// Scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
	}, [messages])

	return (
		<div className="flex h-full flex-1 flex-col overflow-hidden bg-white">
			{/* Title bar */}
			{title && (
				<div className="border-b border-gray-100 p-4">
					<h1 className="text-xl font-medium">{title}</h1>
				</div>
			)}

			{/* Chat messages area */}
			<div className="flex-1 space-y-8 overflow-y-auto p-6">
				{messages.length === 0 ? (
					<div className="flex h-full items-center justify-center">
						<div className="text-center">
							<h1 className="mb-3 text-2xl font-medium">Ask me anything</h1>
							<p className="leading-relaxed text-gray-500">
								Get lightning-fast answers to your development questions.
							</p>
						</div>
					</div>
				) : (
					messages.map((message) => (
						<div key={message.id}>
							<ChatMessage message={message} />
						</div>
					))
				)}

				{/* Error message */}
				{error && (
					<div className="rounded-md bg-red-50 p-4 text-red-800">
						<p className="flex items-center">
							<span className="mr-2">⚠️</span>
							<span>An error occurred. Please try again.</span>
							<Button
								variant="ghost"
								size="sm"
								className="ml-2"
								onClick={(e) => {
									e.preventDefault()
									reload()
								}}>
								Retry
							</Button>
						</p>
					</div>
				)}

				{/* Loading indicator */}
				{isLoading && !messages[messages.length - 1]?.toolInvocations && (
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

				<div ref={messagesEndRef} />
			</div>

			{/* Input form */}
			<div className="border-t border-gray-100 p-4">
				<form onSubmit={handleSubmit} className="flex space-x-2">
					<Input
						value={input}
						onChange={handleInputChange}
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
					Powered by AI SDK • OpenAI
				</p>
			</div>
		</div>
	)
}
