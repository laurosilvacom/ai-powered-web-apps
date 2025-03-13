import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Logo} from '@/components/logo'

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
			<div className="mx-auto max-w-md text-center">
				<div className="mb-8 flex justify-center">
					<Logo />
				</div>
				<h1 className="mb-4 text-6xl font-medium text-black">404</h1>
				<h2 className="mb-4 text-2xl font-medium text-black">Page Not Found</h2>
				<p className="mb-8 leading-relaxed text-gray-500">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Link href="/chat" passHref prefetch>
					<Button className="rounded-full bg-black px-6 py-5 text-white shadow-sm hover:bg-black/90">
						Return to Chat
					</Button>
				</Link>
			</div>
		</div>
	)
}
