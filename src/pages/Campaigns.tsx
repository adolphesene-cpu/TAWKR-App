import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, MapPin, Clock, Users } from 'lucide-react';
import { MOCK_CAMPAIGNS } from '@/data/territories';

export default function Campaigns() {
  const getPriorityBadge = (priority: number | null) => {
    if (!priority) return <Badge variant="outline">Standard</Badge>;
    
    const variants = {
      1: <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Priorité 1</Badge>,
      2: <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Priorité 2</Badge>,
      3: <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Priorité 3</Badge>,
    };
    
    return variants[priority as keyof typeof variants] || <Badge variant="outline">Priorité {priority}</Badge>;
  };

  const getJachereInfo = (months: number) => {
    return {
      text: `${months} mois`,
      color: months === 6 ? 'text-red-600' : 'text-blue-600',
      campaign: months === 6 ? 'Croix-Rouge' : 'Standard'
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campagnes</h1>
        <p className="text-muted-foreground">
          Gestion des campagnes actives et quotas Mondays
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes Actives</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_CAMPAIGNS.length}</div>
            <p className="text-xs text-muted-foreground">campagnes en cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quota Total</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.quota_mondays, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Mondays requis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prioritaires</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_CAMPAIGNS.filter(c => c.priority).length}
            </div>
            <p className="text-xs text-muted-foreground">avec priorité</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Croix-Rouge</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_CAMPAIGNS.filter(c => c.jachere_period_months === 6).length}
            </div>
            <p className="text-xs text-muted-foreground">jachère 6 mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des campagnes */}
      <div className="grid gap-4">
        {MOCK_CAMPAIGNS.map((campaign) => {
          const jachereInfo = getJachereInfo(campaign.jachere_period_months);
          const mockProgress = Math.floor(Math.random() * 80 + 10); // Simulation du progrès
          
          return (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-3">
                      <span>{campaign.name}</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {campaign.pin}
                      </Badge>
                      {getPriorityBadge(campaign.priority)}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {campaign.city} • {campaign.month}
                    </CardDescription>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-2xl font-bold text-primary">
                      {campaign.quota_mondays.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Mondays</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Barre de progression simulée */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium">{mockProgress}%</span>
                    </div>
                    <Progress value={mockProgress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{Math.floor((mockProgress / 100) * campaign.quota_mondays).toLocaleString()} assignés</span>
                      <span>{(campaign.quota_mondays - Math.floor((mockProgress / 100) * campaign.quota_mondays)).toLocaleString()} restants</span>
                    </div>
                  </div>

                  {/* Informations sur la jachère */}
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Période de jachère</span>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${jachereInfo.color}`}>
                        {jachereInfo.text}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {jachereInfo.campaign}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Voir détails
                    </Button>
                    <Button size="sm" className="flex-1">
                      Gérer territoires
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}