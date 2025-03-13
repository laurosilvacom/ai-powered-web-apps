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
			getWeatherInformation: {
				description: 'Get the current weather for a location',
				parameters: z.object({
					location: z.string().describe('The city name, e.g., "New York"')
				}),
				execute: async ({location}) => {
					// Mock weather data
					const conditions = ['sunny', 'cloudy', 'rainy', 'windy', 'snowy']
					const temperature = Math.floor(Math.random() * 30) + 40

					return {
						location,
						temperature: `${temperature}°F`,
						condition: conditions[Math.floor(Math.random() * conditions.length)]
					}
				}
			}
		}
	})

	return result.toDataStreamResponse()
}
