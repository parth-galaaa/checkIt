'use client'

// Signup page component with form handling and Supabase integration for user registration
// Includes validation, loading states, and success/error feedback
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// SignupPage component
export default function SignupPage() {
	// State variables for form inputs and UI states
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const router = useRouter()
	const supabase = createClient()

	// Handle form submission for signup
	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		// Basic validation
		if (password !== confirmPassword) {
			setError('Passwords do not match')
			setLoading(false)
			return
		}

		// Password strength validation
		if (password.length < 6) {
			setError('Password must be at least 6 characters')
			setLoading(false)
			return
		}

		// Call Supabase signUp method
		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/auth/callback`,
				},
			})

			if (error) throw error

			// On success, show success message and redirect
			setSuccess(true)
			setTimeout(() => {
				router.push('/todos')
				router.refresh()
			}, 2000)
		} catch (err) {
			// Handle and display error
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	// Render success message or signup form
	if (success) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">Success! 🎉</CardTitle>
						<CardDescription className="text-center">
							Your account has been created. Redirecting you to your todos...
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		)
	}

	// Render signup form
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
					<CardDescription className="text-center">
						Enter your email and password to get started
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSignup}>
					<CardContent className="space-y-4">
						{error && (
							<div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
								{error}
							</div>
						)}
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								disabled={loading}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								disabled={loading}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="••••••••"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								disabled={loading}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? 'Creating account...' : 'Sign Up'}
						</Button>
						<div className="text-sm text-center text-muted-foreground">
							Already have an account?{' '}
							<Link href="/login" className="text-primary hover:underline">
								Sign in
							</Link>
						</div>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}