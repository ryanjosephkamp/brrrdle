import { useState } from 'react'

function App() {
  const [mode, setMode] = useState<'og' | 'go'>('og')

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <header className="border-b border-zinc-800 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tighter">brrrdle</h1>
          <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl">
            <button
              onClick={() => setMode('og')}
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${mode === 'og' ? 'bg-white text-black' : 'hover:bg-zinc-800'}`}
            >
              og
            </button>
            <button
              onClick={() => setMode('go')}
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${mode === 'go' ? 'bg-white text-black' : 'hover:bg-zinc-800'}`}
            >
              go
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl mb-2">{mode === 'og' ? 'og Mode' : 'go Mode'}</h2>
          <p className="text-zinc-400">Core game engine ready for Phase 1</p>
          <p className="text-emerald-400 mt-8 text-sm">✅ Grid + Keyboard + Coloring ready</p>
        </div>
      </main>
    </div>
  )
}

export default App
