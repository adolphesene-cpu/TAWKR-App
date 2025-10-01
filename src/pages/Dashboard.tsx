import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Users
} from 'lucide-react';
import { MOCK_TERRITORIES, MOCK_CAMPAIGNS, MOCK_FRANCHISES, MOCK_ALERTS } from '@/data/territories';

export default function Dashboard() {
  const { user } = useAuth();

  // Calculate dashboard statistics
  const totalTerritories = MOCK_TERRITORIES.length;
  const availableTerritories = MOCK_TERRITORIES.filter(t => t.status === 'eligible').length;
  const totalMondays = MOCK_TERRITORIES.reduce((sum, t) => sum + t.mondays_available, 0);
  const activeCampaigns = MOCK_CAMPAIGNS.length;
  const unreadAlerts = MOCK_ALERTS.filter(a => !a.is_read).length;
  const totalFranchises = MOCK_FRANCHISES.length;

  // Mock selected mondays (would come from selections data)
  const selectedMondays = Math.floor(totalMondays * 0.15); // 15% selected
  const mondaysProgress = (selectedMondays / totalMondays) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          {user?.role === 'admin' 
            ? 'Vue d\'ensemble de la plateforme de gestion des territoires'
            : `Bienvenue ${user?.franchise_name || ''}`
          }
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Territoires</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTerritories}</div>
            <p className="text-xs text-muted-foreground">
              sur {totalTerritories} total
            </p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {Math.round((availableTerritories / totalTerritories) * 100)}% disponibles
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mondays Totaux</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMondays.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {selectedMondays.toLocaleString()} sélectionnés
            </p>
            <div className="mt-2">
              <Progress value={mondaysProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes Actives</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              campagnes en cours
            </p>
            <div className="mt-2">
              <Badge className="text-xs">
                En cours
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user?.role === 'admin' ? 'Franchises' : 'Alertes'}
            </CardTitle>
            {user?.role === 'admin' ? (
              <Users className="h-4 w-4 text-muted-foreground" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user?.role === 'admin' ? totalFranchises : unreadAlerts}
            </div>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'admin' ? 'franchises actives' : 'non lues'}
            </p>
            {unreadAlerts > 0 && user?.role !== 'admin' && (
              <div className="mt-2">
                <Badge variant="destructive" className="text-xs">
                  Attention requise
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Territoires Récemment Disponibles</CardTitle>
            <CardDescription>
              Nouveaux territoires ouverts à la sélection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_TERRITORIES.filter(t => t.status === 'eligible').slice(0, 3).map((territory) => (
                <div key={territory.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{territory.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {territory.departement} • {territory.mondays_available} Mondays
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {territory.distance_km}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes Récentes</CardTitle>
            <CardDescription>
              Dernières notifications importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_ALERTS.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-4">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    alert.level === 'error' ? 'bg-destructive' :
                    alert.level === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`} />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{alert.territory_name}</p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  {!alert.is_read && (
                    <Badge variant="secondary" className="text-xs">
                      Nouveau
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Aperçu des Campagnes</CardTitle>
          <CardDescription>
            Campagnes actives avec quotas et priorités
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_CAMPAIGNS.slice(0, 5).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{campaign.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {campaign.pin}
                    </Badge>
                    {campaign.priority && (
                      <Badge className="text-xs">
                        Priorité {campaign.priority}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {campaign.city} • {campaign.month}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {campaign.quota_mondays.toLocaleString()} Mondays
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Jachère: {campaign.jachere_period_months} mois
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}