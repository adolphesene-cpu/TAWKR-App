import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle2, Info, Clock, MapPin } from 'lucide-react';
import { MOCK_ALERTS } from '@/data/territories';
import { useState } from 'react';

export default function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  
  const unreadAlerts = MOCK_ALERTS.filter(alert => !alert.is_read);
  const readAlerts = MOCK_ALERTS.filter(alert => alert.is_read);

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getAlertBadge = (level: string) => {
    switch (level) {
      case 'error':
        return <Badge variant="destructive">Critique</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Attention</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Information</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const AlertCard = ({ alert, showActions = true }: { alert: any, showActions?: boolean }) => (
    <Card key={alert.id} className={`transition-all hover:shadow-md ${!alert.is_read ? 'ring-2 ring-primary/20' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {getAlertIcon(alert.level)}
            <div className="space-y-1">
              <CardTitle className="text-base">{alert.territory_name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                {new Date(alert.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getAlertBadge(alert.level)}
            {!alert.is_read && (
              <Badge variant="secondary" className="text-xs">
                Nouveau
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{alert.message}</p>
        
        {showActions && (
          <div className="flex gap-2">
            {!alert.is_read && (
              <Button size="sm" onClick={() => setSelectedAlert(alert.id)}>
                Marquer comme lu
              </Button>
            )}
            <Button size="sm" variant="outline">
              Voir territoire
            </Button>
            {alert.level === 'error' && (
              <Button size="sm" variant="destructive">
                Action requise
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alertes</h1>
        <p className="text-muted-foreground">
          Notifications et alertes système des territoires
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non lues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{unreadAlerts.length}</div>
            <p className="text-xs text-muted-foreground">alertes actives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critiques</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_ALERTS.filter(a => a.level === 'error').length}
            </div>
            <p className="text-xs text-muted-foreground">nécessitent action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avertissements</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MOCK_ALERTS.filter(a => a.level === 'warning').length}
            </div>
            <p className="text-xs text-muted-foreground">à surveiller</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traitées</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readAlerts.length}</div>
            <p className="text-xs text-muted-foreground">aujourd'hui</p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets pour les alertes */}
      <Tabs defaultValue="unread" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unread" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Non lues ({unreadAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Traitées ({readAlerts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unread" className="space-y-4">
          {unreadAlerts.length > 0 ? (
            <div className="space-y-4">
              {unreadAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-muted rounded-lg">
              <div className="text-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-muted-foreground">Aucune alerte non lue</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {readAlerts.length > 0 ? (
            <div className="space-y-4">
              {readAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} showActions={false} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-muted rounded-lg">
              <div className="text-center">
                <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Aucune alerte traitée</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}