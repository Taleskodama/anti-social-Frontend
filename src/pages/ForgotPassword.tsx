import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Link } from "wouter";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6 items-center">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <KeyRound className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Esqueci a senha
            </h1>
            <p className="text-muted-foreground">
              {submitted
                ? "Verifique seu email para redefinir sua senha"
                : "Digite seu email para receber instruções de recuperação"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!submitted ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <Button
                  type="submit"
                  className="w-full h-12"
                  data-testid="button-submit"
                >
                  Enviar instruções
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Lembrou sua senha?{" "}
                <Link href="/login">
                  <a
                    className="text-primary hover:underline font-semibold"
                    data-testid="link-login"
                  >
                    Voltar ao login
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground">
                  Enviamos um email para <strong>{email}</strong> com instruções
                  para redefinir sua senha.
                </p>
              </div>

              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full h-12"
                  data-testid="button-back-login"
                >
                  Voltar ao login
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
