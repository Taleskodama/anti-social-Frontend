import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import { SiGoogle } from "react-icons/si";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    }
    console.log("Signup:", { name, email, password });
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6 items-center">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Criar Conta</h1>
            <p className="text-muted-foreground">
              Junte-se à nossa comunidade hoje
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            variant="outline"
            className="w-full h-12 gap-3"
            onClick={handleGoogleSignup}
            data-testid="button-google-signup"
          >
            <SiGoogle className="h-5 w-5" />
            Continuar com Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">OU CONTINUE COM</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
                required
                data-testid="input-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
                data-testid="input-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
                data-testid="input-password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12"
                required
                data-testid="input-confirm-password"
              />
            </div>

            <Button type="submit" className="w-full h-12" data-testid="button-signup">
              Criar conta
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login">
              <a className="text-primary hover:underline font-semibold" data-testid="link-login">
                Entrar
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
