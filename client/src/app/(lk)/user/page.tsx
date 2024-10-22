import Footer from "@/components/LK/footer"
import Header from "@/components/LK/header"
import { redirect } from "next/navigation";

export default function UserPage() {
  redirect('/user/bookings')
}