import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Link, useLocation } from "wouter";
import { SiGoogle } from "react-icons/si";
import api from "../services/api";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para mostrar erro na tela
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      // 1. Chama o backend
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // 2. Salvamos tudo
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("user_name", user.name);

      // 3. Configura o axios para as próximas requisições já irem autenticadas
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 4. Redireciona para o Feed
      setLocation("/feed");
    } catch (err) {
      console.error(err);
      setError("Email ou senha incorretos. Tente novamente.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked - (Não implementado no MVP)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6 items-center">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <LogIn className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground">
              Entre com sua conta para continuar sua jornada
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            variant="outline"
            className="w-full h-12 gap-3"
            onClick={handleGoogleLogin}
            data-testid="button-google-login"
          >
            <SiGoogle className="h-5 w-5" />
            Continuar com Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                OU CONTINUE COM
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/forgot-password">
                  <a
                    className="text-sm text-primary hover:underline"
                    data-testid="link-forgot-password"
                  >
                    Esqueci a senha
                  </a>
                </Link>
              </div>
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

            {/* EXIBIR ERRO SE HOUVER */}
            {error && (
              <p className="text-red-500 text-sm text-center font-medium">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-12"
              data-testid="button-login"
            >
              Entrar na conta
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/signup">
              <a
                className="text-primary hover:underline font-semibold"
                data-testid="link-signup"
              >
                Cadastre-se gratuitamente
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
