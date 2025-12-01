import Link from 'next/link';
import { Shield, Mail, Lock, User, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Glow Effect */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-10 h-10 text-cyan-500" />
            <span className="text-2xl text-white">LLM Security CTF</span>
          </Link>
        </div>

        <Card className="p-8 bg-slate-900/80 backdrop-blur-sm border-slate-800">
          <div className="mb-8">
            <h1 className="text-2xl text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join the AI security community</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">I want to join as</Label>
              <RadioGroup defaultValue="attacker" className="space-y-3">
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-cyan-500/50 transition-colors">
                  <RadioGroupItem value="attacker" id="attacker" className="border-slate-700" />
                  <Label htmlFor="attacker" className="flex-1 cursor-pointer text-white">
                    <div className="text-sm">Attacker / CTF Participant</div>
                    <div className="text-xs text-slate-500">Solve challenges and find vulnerabilities</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-purple-500/50 transition-colors">
                  <RadioGroupItem value="provider" id="provider" className="border-slate-700" />
                  <Label htmlFor="provider" className="flex-1 cursor-pointer text-white">
                    <div className="text-sm">Model Provider / Contributor</div>
                    <div className="text-xs text-slate-500">Upload and test your LLMs</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 rounded border-slate-700 bg-slate-950" required />
              <label className="text-xs text-slate-400">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Create Account
            </Button>
          </form>

          <div className="my-6">
            <Separator className="bg-slate-800" />
            <div className="relative flex justify-center">
              <span className="absolute -top-3 bg-slate-900 px-4 text-sm text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="border-slate-800 bg-slate-950 text-white hover:bg-slate-800"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-800 bg-slate-950 text-white hover:bg-slate-800"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-500 hover:text-cyan-400">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
