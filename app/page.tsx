"use client"

import SolanaProvider from "@/components/SolanaProvider"

// Default styles that can be overridden by your app

import Dialogue from "@/components/Dialogue"
export default function SolanaAirdrop() {


  return (
    <SolanaProvider>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Solana Airdrop</h1>
            <p className="text-purple-200 text-lg">Get test SOL for development and testing</p>
          </div>

          <Dialogue />


        </div>
      </div>

    </SolanaProvider>

  )
}

