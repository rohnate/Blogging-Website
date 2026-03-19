import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-800">
          Blog Platform 🚀
        </h1>
        <p className="text-slate-500">Tailwind + Shadcn is working!</p>
        <Button>Get Started</Button>
      </div>
    </div>
  )
}

export default App
