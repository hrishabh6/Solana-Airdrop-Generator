"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import {  useWallet } from '@solana/wallet-adapter-react';
import { Input } from './ui/input'
import { Alert, AlertDescription } from './ui/alert'
import { InfoIcon } from 'lucide-react'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css';
import ClientOnly from './ClientOnly';
import { toast } from "sonner"


const Dialogue = () => {
    const { connected, publicKey } = useWallet()
    const [solAmount, setSolAmount] = useState("1")
    
    const loading = false;

    

    const airdrop = async () => {
        const rpcUrl = "https://api.devnet.solana.com"; // Solana Devnet RPC
    
        const requestBody = {
            jsonrpc: "2.0",
            id: 1,
            method: "requestAirdrop",
            params: [
                publicKey, 
                1_000_000_000 // 1 SOL in lamports
            ]
        };
    
        try {
            const response = await fetch(rpcUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
    
            const data = await response.json();

            console.log(data);
    
            if (response.status === 200 && data.result) {
                toast("✅ Airdrop successful! Check your wallet.");
                console.log("Airdrop successful! Transaction Signature:", data.result);
            } else if (response.status === 429) {
                toast("⚠️ Rate limited! Try again later.");
            } 
        } catch (error) {
            toast.error("❌ Error requesting airdrop! Check console.");
            console.error("Error requesting airdrop:", error);
        }
    };
           
    

    return (
        <div className="backdrop-blur-lg bg-white/10 p-6 md:p-8 rounded-2xl shadow-xl border border-white/20">
            {!connected ? (
                <div className="custom-wallet-button flex items-center justify-center space-x-4">
                    <ClientOnly>
                        <WalletMultiButton
                            style={{
                                background: 'linear-gradient(to right, #8a2be2, #4b0082)',
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease-in-out'
                            }}
                        />
                    </ClientOnly>

                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-purple-200 text-sm">Connected Wallet</p>
                        <p className="text-white font-mono text-xs truncate">{publicKey?.toString()}</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="sol-amount" className="block text-purple-200 mb-2 text-sm">
                                SOL Amount
                            </label>
                            <div className="flex space-x-2">
                                <Input
                                    id="sol-amount"
                                    type="number"
                                    value={solAmount}
                                    onChange={(e) => setSolAmount(e.target.value)}
                                    min="0.1"
                                    step="0.1"
                                    className="bg-white/5 border-white/10 text-white"
                                    placeholder="Enter SOL amount"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {
                                loading ? (
                                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white" disabled>
                                        Airdropping...
                                    </Button>
                                ) : (
                                    <Button onClick={airdrop} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                                        Devnet Airdrop
                                    </Button>
                                )
                            }

                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                                Testnet Airdrop
                            </Button>
                        </div>
                    </div>
                    <WalletDisconnectButton />
                </div>
            )}
            <Alert className="mt-6 bg-white/5 border-amber-500/50 flex gap-2">
                <InfoIcon className="h-6 w-6 text-amber-500" />
                <AlertDescription className="text-amber-200 text-xs ">
                    These are test tokens for development purposes only and have no real value. For more information, visit
                    the{" "}
                    <a
                        href="https://docs.solana.com/cli/transfer-tokens"
                        className="underline hover:text-amber-100"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Solana documentation.
                    </a>

                </AlertDescription>
            </Alert>
        </div>
    )
}

export default Dialogue
