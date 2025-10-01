import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const success = await login(email, password);
    
    if (!success) {
      setError('Email ou mot de passe incorrect');
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants et réessayez.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Tawkr !",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Tawkr</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Plateforme de gestion des territoires commerciaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Se connecter
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Comptes de démonstration :</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><strong>Admin :</strong> admin@tawkr.com / admin123</p>
              <p><strong>Franchisé :</strong> franchise.bordeaux@tawkr.com / franchise123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}