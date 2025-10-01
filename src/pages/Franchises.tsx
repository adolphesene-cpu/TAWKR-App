import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MapPin, Target, Mail, Phone } from 'lucide-react';
import { MOCK_FRANCHISES, MOCK_TERRITORIES } from '@/data/territories';

export default function Franchises() {
  const getFranchiseStats = (franchiseId: number) => {
    const territories = MOCK_TERRITORIES.filter(t => t.assigned_franchise_id === franchiseId);
    const availableTerritories = MOCK_TERRITORIES.filter(t => !t.assigned_franchise_id && t.status === 'eligible');
    const totalMondays = territories.reduce((sum, t) => sum + Math.round((t.logements * t.pct_resid_princ) / 100), 0);
    
    return {
      territories: territories.length,
      availableTerritories: availableTerritories.length,
      totalMondays,
      lastActivity: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date in last 30 days
    };
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
    ) : (
      <Badge variant="secondary">Inactif</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Franchises</h1>
        <p className="text-muted-foreground">
          Gestion des franchises et supervision des activités
        </p>
      </div>

      {/* Statistiques générales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Franchises</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_FRANCHISES.length}</div>
            <p className="text-xs text-muted-foreground">franchises actives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Territoires Assignés</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_TERRITORIES.filter(t => t.assigned_franchise_id).length}
            </div>
            <p className="text-xs text-muted-foreground">sur {MOCK_TERRITORIES.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mondays Totaux</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_TERRITORIES
                .filter(t => t.assigned_franchise_id)
                .reduce((sum, t) => sum + Math.round((t.logements * t.pct_resid_princ) / 100), 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">assignés aux franchises</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_TERRITORIES.filter(t => !t.assigned_franchise_id && t.status === 'eligible').length}
            </div>
            <p className="text-xs text-muted-foreground">territoires libres</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des franchises */}
      <div className="grid gap-6">
        {MOCK_FRANCHISES.map((franchise) => {
          const stats = getFranchiseStats(franchise.id);
          const isActive = Math.random() > 0.2; // 80% chance d'être actif
          
          return (
            <Card key={franchise.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(franchise.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {franchise.name}
                        {getStatusBadge(isActive)}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {franchise.region}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {franchise.contact}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">ID: {franchise.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Dernière activité: {stats.lastActivity.toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Statistiques de la franchise */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Territoires assignés</span>
                        <Badge variant="outline">{stats.territories}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mondays gérés</span>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                          {stats.totalMondays.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Territoires disponibles */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Opportunités</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Territoires disponibles</span>
                        <Badge variant="secondary">{stats.availableTerritories}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Potentiel Mondays</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {MOCK_TERRITORIES
                            .filter(t => !t.assigned_franchise_id && t.status === 'eligible')
                            .reduce((sum, t) => sum + Math.round((t.logements * t.pct_resid_princ) / 100), 0)
                            .toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Actions</h4>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full">
                        Voir détails
                      </Button>
                      <Button size="sm" className="w-full">
                        Gérer territoires
                      </Button>
                      <Button size="sm" variant="secondary" className="w-full">
                        Historique
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Territoires récents */}
                {stats.territories > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Territoires récents</h4>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_TERRITORIES
                        .filter(t => t.assigned_franchise_id === franchise.id)
                        .slice(0, 3)
                        .map(territory => (
                          <Badge key={territory.id} variant="outline" className="text-xs">
                            {territory.name} ({territory.departement})
                          </Badge>
                        ))}
                      {stats.territories > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{stats.territories - 3} autres
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}