import type React from 'react'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'FrontendTrail - AI Assistant for Developers',
	description:
		'Elegant AI assistant with intuitive interface and seamless experience',
	metadataBase: new URL('https://frontendtrail.vercel.app')
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				{children}
			</body>
		</html>
	)
}
