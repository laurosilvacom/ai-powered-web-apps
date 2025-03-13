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
		tools: {
			getGitHubProfile: {
				description: 'Get public information about a GitHub user profile',
				parameters: z.object({
					username: z.string().describe('The GitHub username to look up')
				}),
				execute: async ({username}) => {
					try {
						const response = await fetch(
							`https://api.github.com/users/${username}`
						)

						if (!response.ok) {
							return {error: `Failed to fetch profile: ${response.status}`}
						}

						const data = await response.json()

						return {
							login: data.login,
							name: data.name,
							bio: data.bio,
							public_repos: data.public_repos,
							followers: data.followers,
							html_url: data.html_url
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
