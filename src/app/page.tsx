import type { Metadata } from "next";
import Home from './home-page'

export const metadata: Metadata = {
  title: 'Quest Bazaar'
}

export default function Page() {

  return <Home />
}