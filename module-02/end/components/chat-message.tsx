'use client'

import {User} from 'lucide-react'
import {BotAvatar} from '@/components/bot-avatar'
import {Message} from 'ai'

export function ChatMessage({message}: {message: Message}) {
	const {role, content, toolInvocations} = message
	const hasToolCalls = toolInvocations && toolInvocations.length > 0

	return (
		<div
			className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
			<div
				className={`flex max-w-3xl ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
				{/* Avatar section */}
				<div className={role === 'user' ? 'ml-3' : 'mr-3'}>
					{role === 'user' ? (
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
							<User className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
						</div>
					) : (
						<BotAvatar />
					)}
				</div>

				{/* Message bubble */}
				<div
					className={`rounded-2xl p-4 ${role === 'user' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
					{content && <p className="leading-relaxed">{content}</p>}

					{/* Tool calls and results */}
					{hasToolCalls && (
						<div className="mt-3 space-y-3">
							{toolInvocations.map((tool) => (
								<div
									key={tool.toolCallId}
									className="rounded border border-gray-200 p-3">
									<p className="text-xs font-semibold text-gray-500">
										Tool: {tool.toolName}
									</p>

									{/* Parameters */}
									{tool.state === 'call' && (
										<div className="mt-2">
											<p className="text-xs font-semibold text-gray-500">
												Parameters:
											</p>
											<pre className="mt-1 max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
												{JSON.stringify(tool.args, null, 2)}
											</pre>
										</div>
									)}

									{/* Loading state */}
									{tool.state === 'call' && (
										<div className="mt-2 text-sm text-gray-500">
											<div className="flex items-center space-x-2">
												<div className="h-2 w-2 animate-pulse rounded-full bg-gray-300"></div>
												<div
													className="h-2 w-2 animate-pulse rounded-full bg-gray-300"
													style={{animationDelay: '150ms'}}></div>
												<div
													className="h-2 w-2 animate-pulse rounded-full bg-gray-300"
													style={{animationDelay: '300ms'}}></div>
											</div>
										</div>
									)}

									{/* Results */}
									{tool.state === 'result' && (
										<div className="mt-2">
											<p className="text-xs font-semibold text-gray-500">
												Result:
											</p>
											<pre className="mt-1 max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
												{JSON.stringify(tool.result, null, 2)}
											</pre>
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
