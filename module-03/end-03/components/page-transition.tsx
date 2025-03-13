'use client'

import {motion} from 'framer-motion'
import {usePathname} from 'next/navigation'
import type {ReactNode} from 'react'

export function PageTransition({children}: {children: ReactNode}) {
	const pathname = usePathname()

	return (
		<motion.div
			key={pathname}
			initial={{opacity: 0, y: 8}}
			animate={{opacity: 1, y: 0}}
			exit={{opacity: 0, y: 8}}
			transition={{duration: 0.15, ease: 'easeOut'}}
			className="h-full">
			{children}
		</motion.div>
	)
}
