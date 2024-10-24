import { redirect } from 'next/navigation'

import Footer from '@/components/LK/footer'
import Header from '@/components/LK/header'

export default function UserPage() {
	redirect('/user/bookings')
}
