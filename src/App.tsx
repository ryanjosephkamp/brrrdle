function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-cyan-400">brrrdle</h1>
        <p className="mt-4 text-xl">Wordle + Hurdle. Go brrr.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-lg font-semibold">Play og mode</button>
          <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-lg font-semibold">Play go mode</button>
        </div>
      </div>
    </div>
  )
}

export default App