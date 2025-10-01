import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Target, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MOCK_TERRITORIES } from '@/data/territories';
import { useState } from 'react';

export default function Territories() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredTerritories = MOCK_TERRITORIES.filter(territory => {
    const matchesSearch = territory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         territory.departement.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || territory.status === statusFilter;
    const matchesFranchise = user?.role === 'admin' || 
                            (user?.role === 'franchise' && (territory.assigned_franchise_id === user.franchise_id || !territory.assigned_franchise_id));
    
    return matchesSearch && matchesStatus && matchesFranchise;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'eligible':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Éligible</Badge>;
      case 'assigned':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Assigné</Badge>;
      case 'closed':
        return <Badge variant="secondary">Fermé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const calculateMondays = (logements: number, pctResidPrinc: number) => {
    return Math.round((logements * pctResidPrinc) / 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Territoires</h1>
        <p className="text-muted-foreground">
          {user?.role === 'admin' ? 'Gestion globale des territoires' : 'Sélection des territoires disponibles'}
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par nom ou département..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="eligible">Éligible</SelectItem>
            <SelectItem value="assigned">Assigné</SelectItem>
            <SelectItem value="closed">Fermé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Liste des territoires */}
      <div className="grid gap-4">
        {filteredTerritories.map((territory) => (
          <Card key={territory.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {territory.name}
                  </CardTitle>
                  <CardDescription>
                    {territory.departement} • {territory.region}
                  </CardDescription>
                </div>
                {getStatusBadge(territory.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    Mondays
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {calculateMondays(territory.logements, territory.pct_resid_princ).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {territory.logements.toLocaleString()} logements • {territory.pct_resid_princ}% RP
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Distance
                  </div>
                  <p className="font-semibold">{territory.distance_km}</p>
                  <p className="text-xs text-muted-foreground">
                    Trajet: {territory.temps_trajet}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Dernières ventes
                  </div>
                  <div className="space-y-1">
                    {territory.last_sales_crf && (
                      <p className="text-xs">CRF: {new Date(territory.last_sales_crf).toLocaleDateString('fr-FR')}</p>
                    )}
                    {territory.last_sales_mdm && (
                      <p className="text-xs">MDM: {new Date(territory.last_sales_mdm).toLocaleDateString('fr-FR')}</p>
                    )}
                    {territory.last_sales_other && (
                      <p className="text-xs">Autre: {new Date(territory.last_sales_other).toLocaleDateString('fr-FR')}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    Actions
                  </div>
                  <div className="space-y-2">
                    {territory.status === 'eligible' && user?.role === 'franchise' && (
                      <Button size="sm" className="w-full">
                        Sélectionner
                      </Button>
                    )}
                    {user?.role === 'admin' && (
                      <div className="space-y-1">
                        <Button size="sm" variant="outline" className="w-full">
                          Modifier
                        </Button>
                        {territory.status === 'eligible' && (
                          <Button size="sm" variant="secondary" className="w-full">
                            Valider
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Informations de disponibilité */}
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {territory.dispo_crf && (
                    <div>
                      <span className="text-muted-foreground">CRF:</span>
                      <span className="ml-1 font-medium">{territory.dispo_crf}</span>
                    </div>
                  )}
                  {territory.dispo_mdm && (
                    <div>
                      <span className="text-muted-foreground">MDM:</span>
                      <span className="ml-1 font-medium">{territory.dispo_mdm}</span>
                    </div>
                  )}
                  {territory.dispo_autres && (
                    <div>
                      <span className="text-muted-foreground">Autres:</span>
                      <span className="ml-1 font-medium">{territory.dispo_autres}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerritories.length === 0 && (
        <div className="flex items-center justify-center h-32 border-2 border-dashed border-muted rounded-lg">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Aucun territoire trouvé</p>
          </div>
        </div>
      )}
    </div>
  );
}