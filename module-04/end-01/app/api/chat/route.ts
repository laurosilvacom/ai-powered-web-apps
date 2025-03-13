import {createOpenAI} from '@ai-sdk/openai'
import {streamText} from 'ai'
import {z} from 'zod'

const openai = createOpenAI({
	apiKey: 'text-key-goes-here'
})

export async function POST(req: Request) {
	const {messages} = await req.json()

	const result = streamText({
		model: openai('gpt-4o'),
		messages,
		system: `You are a helpful developer assistant specializing in web development and GitHub.

    When helping users:
    - Keep explanations concise but thorough
    - Include code examples when relevant
    - Format code with proper syntax highlighting
    - Cite sources when possible
    - If a user asks about a GitHub profile, use the getGitHubProfile tool

    Your tone should be professional but friendly. When you don't know something, admit it rather than making up information.`,
		tools: {
			getGitHubProfile: {
				description: 'Get public information about a GitHub user profile',
				parameters: z.object({
					username: z.string().describe('The GitHub username to look up')
				}),
				execute: async ({username}) => {
					try {
						// Fetch the user profile from GitHub's public API
						const response = await fetch(
							`https://api.github.com/users/${username}`
						)

						if (!response.ok) {
							if (response.status === 404) {
								return {error: `User ${username} not found`}
							}
							return {
								error: `GitHub API error: ${response.status}`
							}
						}

						const data = await response.json()

						// Return selected profile information
						return {
							login: data.login,
							name: data.name,
							bio: data.bio,
							public_repos: data.public_repos,
							followers: data.followers,
							following: data.following,
							html_url: data.html_url,
							avatar_url: data.avatar_url
						}
					} catch (error) {
						return {error: 'Failed to fetch GitHub profile'}
					}
				}
			}
		}
	})

	return result.toDataStreamResponse()
}
