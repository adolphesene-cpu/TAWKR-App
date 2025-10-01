import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, TrendingDown, Users, MapPin, Target, Calendar, Activity } from 'lucide-react';
import { MOCK_TERRITORIES, MOCK_CAMPAIGNS, MOCK_FRANCHISES } from '@/data/territories';

export default function Analytics() {
  // Calculs des métriques
  const totalTerritories = MOCK_TERRITORIES.length;
  const eligibleTerritories = MOCK_TERRITORIES.filter(t => t.status === 'eligible').length;
  const assignedTerritories = MOCK_TERRITORIES.filter(t => t.assigned_franchise_id).length;
  const totalMondays = MOCK_TERRITORIES.reduce((sum, t) => sum + Math.round((t.logements * t.pct_resid_princ) / 100), 0);
  const assignedMondays = MOCK_TERRITORIES.filter(t => t.assigned_franchise_id).reduce((sum, t) => sum + Math.round((t.logements * t.pct_resid_princ) / 100), 0);

  // Données simulées pour les graphiques
  const monthlyData = [
    { month: 'Jan', territories: 45, mondays: 125000 },
    { month: 'Fév', territories: 52, mondays: 142000 },
    { month: 'Mar', territories: 48, mondays: 138000 },
    { month: 'Avr', territories: 61, mondays: 165000 },
    { month: 'Mai', territories: 58, mondays: 159000 },
    { month: 'Jun', territories: 67, mondays: 178000 }
  ];

  const franchisePerformance = MOCK_FRANCHISES.map(franchise => {
    const territories = MOCK_TERRITORIES.filter(t => t.assigned_franchise_id === franchise.id);
    const mondays = territories.reduce((sum, t) => sum + Math.round((t.logements * t.pct_resid_princ) / 100), 0);
    const efficiency = Math.floor(Math.random() * 30 + 70); // 70-100%
    
    return {
      ...franchise,
      territories: territories.length,
      mondays,
      efficiency,
      growth: Math.floor(Math.random() * 40 - 20) // -20% à +20%
    };
  });

  const getGrowthBadge = (growth: number) => {
    if (growth > 0) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+{growth}%</Badge>;
    } else if (growth < 0) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{growth}%</Badge>;
    }
    return <Badge variant="outline">0%</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Analyse des performances et statistiques détaillées
        </p>
      </div>

      {/* KPIs principaux */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'attribution</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((assignedTerritories / totalTerritories) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              {assignedTerritories}/{totalTerritories} territoires
            </p>
            <Progress value={(assignedTerritories / totalTerritories) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Couverture Mondays</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((assignedMondays / totalMondays) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              {assignedMondays.toLocaleString()}/{totalMondays.toLocaleString()}
            </p>
            <Progress value={(assignedMondays / totalMondays) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficacité Moyenne</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">franchises actives</p>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-2">
              +5% vs mois dernier
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes Actives</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_CAMPAIGNS.length}</div>
            <p className="text-xs text-muted-foreground">en cours</p>
            <div className="mt-2">
              <Badge variant="secondary">
                {MOCK_CAMPAIGNS.filter(c => c.priority).length} prioritaires
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Croissance</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <p className="text-xs text-muted-foreground">ce trimestre</p>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-2">
              Objectif atteint
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Onglets pour différentes analyses */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="franchises">Performance Franchises</TabsTrigger>
          <TabsTrigger value="territories">Analyse Territoires</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Évolution mensuelle</CardTitle>
                <CardDescription>Territoires attribués et Mondays par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{data.month} 2024</p>
                        <p className="text-xs text-muted-foreground">
                          {data.territories} territoires • {data.mondays.toLocaleString()} Mondays
                        </p>
                      </div>
                      <div className="text-right space-x-2">
                        <Badge variant="outline">{data.territories}</Badge>
                        {index > 0 && (
                          <>
                            {data.territories > monthlyData[index - 1].territories ? (
                              <TrendingUp className="h-4 w-4 text-green-600 inline" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600 inline" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par statut</CardTitle>
                <CardDescription>Distribution des territoires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Éligibles</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        {eligibleTerritories}
                      </Badge>
                    </div>
                    <Progress value={(eligibleTerritories / totalTerritories) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Assignés</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {assignedTerritories}
                      </Badge>
                    </div>
                    <Progress value={(assignedTerritories / totalTerritories) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fermés</span>
                      <Badge variant="secondary">
                        {totalTerritories - eligibleTerritories - assignedTerritories}
                      </Badge>
                    </div>
                    <Progress 
                      value={((totalTerritories - eligibleTerritories - assignedTerritories) / totalTerritories) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="franchises" className="space-y-4">
          <div className="grid gap-4">
            {franchisePerformance.map((franchise) => (
              <Card key={franchise.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{franchise.name}</CardTitle>
                      <CardDescription>{franchise.region}</CardDescription>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Efficacité: {franchise.efficiency}%</Badge>
                        {getGrowthBadge(franchise.growth)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Territoires</p>
                      <p className="text-2xl font-bold">{franchise.territories}</p>
                      <Progress value={(franchise.territories / 20) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Mondays</p>
                      <p className="text-2xl font-bold">{franchise.mondays.toLocaleString()}</p>
                      <Progress value={franchise.efficiency} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Performance</p>
                      <p className={`text-2xl font-bold ${franchise.growth > 0 ? 'text-green-600' : franchise.growth < 0 ? 'text-red-600' : ''}`}>
                        {franchise.growth > 0 ? '+' : ''}{franchise.growth}%
                      </p>
                      <Progress 
                        value={Math.max(0, franchise.growth + 50)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="territories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition géographique</CardTitle>
                <CardDescription>Territoires par région</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(new Set(MOCK_TERRITORIES.map(t => t.region))).map(region => {
                    const regionTerritories = MOCK_TERRITORIES.filter(t => t.region === region);
                    const regionMondays = regionTerritories.reduce((sum, t) => sum + Math.round((t.logements * t.pct_resid_princ) / 100), 0);
                    
                    return (
                      <div key={region} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{region}</span>
                          <div className="text-right">
                            <Badge variant="outline">{regionTerritories.length} territoires</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{regionMondays.toLocaleString()} Mondays</span>
                          <span>{Math.round((regionTerritories.length / totalTerritories) * 100)}%</span>
                        </div>
                        <Progress value={(regionTerritories.length / totalTerritories) * 100} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top 10 Territoires</CardTitle>
                <CardDescription>Par nombre de Mondays</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {MOCK_TERRITORIES
                    .map(t => ({
                      ...t,
                      mondays: Math.round((t.logements * t.pct_resid_princ) / 100)
                    }))
                    .sort((a, b) => b.mondays - a.mondays)
                    .slice(0, 10)
                    .map((territory, index) => (
                      <div key={territory.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="w-6 h-6 p-0 text-xs">
                            {index + 1}
                          </Badge>
                          <div>
                            <p className="text-sm font-medium">{territory.name}</p>
                            <p className="text-xs text-muted-foreground">{territory.departement}</p>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                          {territory.mondays.toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}