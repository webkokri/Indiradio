import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

export default function NotFound() {
  return (
    <PageTransition className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-ink">404</h1>
      <p className="mt-4 text-ink/60">This page doesn't exist.</p>
      <Link to="/" className="btn-primary mt-8">
        Back Home
      </Link>
    </PageTransition>
  )
}
