import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-eesel-accent text-eesel-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <span className="text-xl font-bold tracking-tight">
            MarketMeda <span className="font-medium text-gray-500">AI</span>
          </span>
          <p className="mt-2 text-sm text-gray-500 font-medium">© 2025 MarketMeda AI. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <a href="#" className="text-gray-600 hover:text-eesel-dark font-medium transition text-sm">About</a>
          <a href="#" className="text-gray-600 hover:text-eesel-dark font-medium transition text-sm">Contact</a>
          <a href="#" className="text-gray-600 hover:text-eesel-dark font-medium transition text-sm">Privacy</a>
          <a href="#" className="text-gray-600 hover:text-eesel-dark font-medium transition text-sm">Terms</a>
        </div>
      </div>
    </footer>
  )
}