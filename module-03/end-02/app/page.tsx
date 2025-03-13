import type React from 'react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {ArrowRight, Zap, Palette, CreditCard} from 'lucide-react'
import {Logo} from '@/components/logo'

export default function LandingPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
			<div className="mx-auto max-w-3xl text-center">
				<div className="mb-8 flex justify-center">
					<Logo size="large" />
				</div>
				<h1 className="mb-6 text-4xl font-medium tracking-tight sm:text-5xl">
					AI Assistant for Developers
				</h1>
				<p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-gray-500">
					Elegant responses. Intuitive interface. Seamless experience.
				</p>
				<Link href="/chat" passHref prefetch>
					<Button
						size="lg"
						className="rounded-full bg-black px-8 py-6 text-base text-white shadow-sm hover:bg-black/90">
						Try it now <ArrowRight className="ml-2 h-5 w-5" />
					</Button>
				</Link>
			</div>

			<div className="mx-auto mt-32 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
				<FeatureCard
					icon={<Zap className="h-5 w-5 text-black" strokeWidth={1.5} />}
					title="Lightning Fast"
					description="Optimized for speed with instant responses and seamless transitions."
				/>
				<FeatureCard
					icon={<Palette className="h-5 w-5 text-black" strokeWidth={1.5} />}
					title="Beautiful Interface"
					description="Clean, minimal design that's a pleasure to use and easy on the eyes."
				/>
				<FeatureCard
					icon={<CreditCard className="h-5 w-5 text-black" strokeWidth={1.5} />}
					title="Affordable"
					description="Get more for less with our straightforward pricing model."
				/>
			</div>
		</div>
	)
}

function FeatureCard({
	icon,
	title,
	description
}: {
	icon: React.ReactNode
	title: string
	description: string
}) {
	return (
		<div className="rounded-2xl bg-gray-50 p-8">
			<div className="mb-4 flex items-center">
				{icon}
				<h3 className="ml-2 text-base font-medium">{title}</h3>
			</div>
			<p className="leading-relaxed text-gray-500">{description}</p>
		</div>
	)
}
