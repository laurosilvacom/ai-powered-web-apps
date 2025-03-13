import {Users, BookOpen, ExternalLink, Star, GitBranch} from 'lucide-react'

interface GitHubProfileProps {
	login: string
	name: string | null
	bio: string | null
	public_repos: number
	followers: number
	html_url: string
	avatar_url: string
}

export function GitHubProfileCard({
	login,
	name,
	bio,
	public_repos,
	followers,
	html_url,
	avatar_url
}: GitHubProfileProps) {
	return (
		<div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
			{/* Header with gradient background */}
			<div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-5">
				<div className="pattern-grid-lg absolute inset-0 bg-black opacity-10"></div>
				<div className="relative z-10">
					<div className="flex items-center gap-4">
						<img
							src={avatar_url}
							alt={`${login}'s avatar`}
							className="h-20 w-20 rounded-full border-4 border-white shadow-md"
							onError={(e) => {
								const target = e.target as HTMLImageElement
								target.src = `https://ui-avatars.com/api/?name=${login}&background=random`
							}}
						/>
						<div className="text-white">
							<h3 className="text-xl font-bold">{name || login}</h3>
							<p className="text-sm font-medium text-blue-100">@{login}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Profile content */}
			<div className="p-5">
				{bio && <p className="mb-5 italic text-gray-600">{bio}</p>}

				{/* Stats area */}
				<div className="mb-5 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3">
					<div className="flex flex-col items-center rounded-md p-2 transition-colors hover:bg-gray-100">
						<div className="mb-1 flex items-center gap-1 text-gray-500">
							<BookOpen className="h-4 w-4" />
							<span className="text-xs font-semibold uppercase">Repos</span>
						</div>
						<span className="text-xl font-bold text-gray-800">
							{public_repos}
						</span>
					</div>

					<div className="flex flex-col items-center rounded-md p-2 transition-colors hover:bg-gray-100">
						<div className="mb-1 flex items-center gap-1 text-gray-500">
							<Users className="h-4 w-4" />
							<span className="text-xs font-semibold uppercase">Followers</span>
						</div>
						<span className="text-xl font-bold text-gray-800">{followers}</span>
					</div>
				</div>

				{/* Action button */}
				<a
					href={html_url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
					<ExternalLink className="h-4 w-4" />
					View GitHub Profile
				</a>

				{/* GitHub branding */}
				<div className="mt-4 flex items-center justify-center text-xs text-gray-400">
					<GitBranch className="mr-1 h-3 w-3" />
					<span>GitHub API</span>
				</div>
			</div>
		</div>
	)
}
