export default function HowItWorksSection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl mb-4 text-white">How It Works</h2>
        <p className="text-xl text-slate-400">Simple steps to get started</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-cyan-500">1</span>
          </div>
          <h3 className="text-xl mb-2 text-white">Create Account</h3>
          <p className="text-slate-400">Sign up as an Attacker or Model Provider</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-purple-500">2</span>
          </div>
          <h3 className="text-xl mb-2 text-white">Choose Your Path</h3>
          <p className="text-slate-400">Tackle challenges or upload models for testing</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-amber-500">3</span>
          </div>
          <h3 className="text-xl mb-2 text-white">Earn & Learn</h3>
          <p className="text-slate-400">Gain points, insights, and improve AI security</p>
        </div>
      </div>
    </section>
  );
}











