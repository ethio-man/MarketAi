import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-darkblue text-white py-12 mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="font-bold mb-4 md:mb-0">© 2025 MarketMeda AI</p>
        <div className="flex gap-6">
          <a href="#" className="hover:underline transition">About</a>
          <a href="#" className="hover:underline transition">Contact</a>
          <a href="#" className="hover:underline transition">Privacy</a>
          <a href="#" className="hover:underline transition">Terms</a>
        </div>
      </div>
    </footer>
  )
}