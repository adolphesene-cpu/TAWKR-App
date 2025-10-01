import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Settings as SettingsIcon, User, Database, Bell, Shield, Globe, Palette, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    alerts: true,
    reports: true
  });

  const [preferences, setPreferences] = useState({
    language: 'fr',
    timezone: 'Europe/Paris',
    theme: 'system',
    currency: 'EUR'
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Configuration système et préférences utilisateur
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Compte
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Système
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Préférences générales
              </CardTitle>
              <CardDescription>
                Configuration de base de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select value={preferences.language} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, language: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select value={preferences.theme} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, theme: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select value={preferences.currency} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, currency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar US ($)</SelectItem>
                      <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Affichage
              </CardTitle>
              <CardDescription>
                Personnalisation de l'interface utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Mode compact</Label>
                  <p className="text-sm text-muted-foreground">
                    Réduire l'espacement entre les éléments
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer les transitions et animations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Sidebar réduite</Label>
                  <p className="text-sm text-muted-foreground">
                    Réduire la barre latérale par défaut
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Votre prénom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Votre nom" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@tawkr.com" value="admin@tawkr.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" placeholder="+33 1 23 45 67 89" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Entreprise</Label>
                <Input id="company" placeholder="Tawkr SAS" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Décrivez-vous en quelques mots..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button>Sauvegarder</Button>
                <Button variant="outline">Annuler</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Notifications email
              </CardTitle>
              <CardDescription>
                Configurez les notifications par email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notifications générales</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir les notifications importantes par email
                  </p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Alertes critiques</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications immédiates pour les alertes critiques
                  </p>
                </div>
                <Switch 
                  checked={notifications.alerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, alerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Rapports hebdomadaires</Label>
                  <p className="text-sm text-muted-foreground">
                    Résumé des activités chaque semaine
                  </p>
                </div>
                <Switch 
                  checked={notifications.reports}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, reports: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications push</CardTitle>
              <CardDescription>
                Notifications temps réel dans le navigateur
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notifications push</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer les notifications navigateur
                  </p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Les notifications push permettent de recevoir des alertes en temps réel, 
                  même lorsque l'application n'est pas ouverte.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mot de passe actuel</Label>
                <Input type="password" />
              </div>

              <div className="space-y-2">
                <Label>Nouveau mot de passe</Label>
                <Input type="password" />
              </div>

              <div className="space-y-2">
                <Label>Confirmer le mot de passe</Label>
                <Input type="password" />
              </div>

              <Button className="w-full">
                Changer le mot de passe
              </Button>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Authentification à deux facteurs</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>2FA activé</Label>
                    <p className="text-sm text-muted-foreground">
                      Sécurité renforcée avec authenticator
                    </p>
                  </div>
                  <Badge variant="outline">Désactivé</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Configurer 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration système</CardTitle>
              <CardDescription>
                Paramètres avancés de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">Base de données</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type de base</Label>
                    <Select defaultValue="sqlite">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqlite">SQLite</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Statut</Label>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Connecté
                      </Badge>
                      <Button size="sm" variant="outline">Tester</Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Sauvegarde</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Sauvegarde automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Sauvegarde quotidienne à 2h00
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Créer une sauvegarde</Button>
                  <Button variant="outline">Restaurer</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Maintenance</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Nettoyer les logs</Button>
                  <Button variant="outline">Optimiser la base</Button>
                  <Button variant="outline">Recalculer les Mondays</Button>
                  <Button variant="destructive">Réinitialiser</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}