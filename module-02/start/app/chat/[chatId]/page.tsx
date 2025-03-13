import {Sidebar} from '@/components/sidebar'
import {ChatInterface} from '@/components/chat-interface'
import {notFound} from 'next/navigation'

// Mock conversation data that simulates AI chat history
const chatData = {
	'1': {
		title: 'How to learn React',
		messages: [
			{role: 'user', content: "What's the best way to learn React?"},
			{
				role: 'assistant',
				content:
					'Learning React is best approached step-by-step. Start with JavaScript fundamentals, then move to React basics like components, props, and state. Practice by building small projects, then learn hooks, context, and more advanced patterns. Online courses, documentation, and community resources can help guide your journey.'
			},
			{role: 'user', content: 'Are there any good free resources?'},
			{
				role: 'assistant',
				content:
					'Yes, there are excellent free resources for learning React! The official React documentation is comprehensive and recently updated. You can also check out freeCodeCamp, The Odin Project, and YouTube channels like Traversy Media or Web Dev Simplified. GitHub repositories with starter projects are great for hands-on practice.'
			}
		]
	},
	'2': {
		title: 'Explain quantum computing',
		messages: [
			{
				role: 'user',
				content: 'Can you explain quantum computing in simple terms?'
			},
			{
				role: 'assistant',
				content:
					"Quantum computing uses quantum bits or 'qubits' instead of regular bits. While normal bits can be either 0 or 1, qubits can exist in multiple states simultaneously thanks to 'superposition.' This allows quantum computers to process vast amounts of possibilities at once, potentially solving complex problems much faster than traditional computers."
			},
			{role: 'user', content: 'What are some practical applications?'},
			{
				role: 'assistant',
				content:
					'Quantum computing has several promising applications: cryptography (both breaking current encryption and creating more secure methods), drug discovery by simulating molecular interactions, optimization problems like traffic flow or supply chains, machine learning improvements, and simulating quantum physics itself. While still developing, these applications could revolutionize multiple industries.'
			}
		]
	},
	'3': {
		title: 'Write a poem about coding',
		messages: [
			{role: 'user', content: 'Can you write a poem about coding?'},
			{
				role: 'assistant',
				content:
					"In Realms of Logic\n\nFingers dance across the keys,\nBuilding worlds none but I can see.\nLines of logic, carefully placed,\nA digital tapestry, interlaced.\n\nBugs emerge from shadowed code,\nPatience tested, temper slowed.\nThen breakthrough comes in flash of light,\nThe solution clear in dead of night.\n\nFrom nothing, something now exists,\nA creation born of mind and wrists.\nThis power to build, to shape, to make,\nIs why the coder's path I take."
			},
			{
				role: 'user',
				content: "That's beautiful! Can you write another one about debugging?"
			},
			{
				role: 'assistant',
				content:
					"The Debugger's Lament\n\nA semicolon out of place,\nA bracket missing without trace.\nThe console screams in angry red,\nAs errors fill my heart with dread.\n\nHours pass in focused quest,\nEach hypothesis put to test.\nPrint statements scattered everywhere,\nRevealing secrets hidden there.\n\nThen suddenly—the code runs clean,\nThe simplest fix I've ever seen.\nA single character was wrong,\nYet hunting it took all day long.\n\nSuch is the debugger's plight,\nTo search for truth with all our might.\nYet when we find that elusive bug,\nThe joy we feel is quite smug."
			}
		]
	}
}

// This component renders a specific chat conversation page based on the chatId in the URL
export default function ChatPage({params}: {params: {chatId: string}}) {
	const {chatId} = params

	// Check if the requested chat exists, show 404 page if not found
	if (!chatData[chatId as keyof typeof chatData]) {
		notFound()
	}

	// Get the conversation data for this specific chat ID
	const chat = chatData[chatId as keyof typeof chatData]

	// Render a two-panel layout with navigation sidebar and main chat interface
	// Pass the active chat ID to sidebar and the messages/title to the chat interface
	return (
		<div className="flex h-screen bg-white">
			<Sidebar activeChatId={chatId} />
			<ChatInterface initialMessages={chat.messages} title={chat.title} />
		</div>
	)
}
