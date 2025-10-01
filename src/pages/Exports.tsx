import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileSpreadsheet, FileText, Calendar, MapPin, Users, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function Exports() {
  const [selectedExports, setSelectedExports] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState('csv');
  
  const exportOptions = [
    {
      id: 'territories',
      title: 'Territoires',
      description: 'Liste complète des territoires avec statuts, Mondays et disponibilités',
      icon: <MapPin className="h-5 w-5 text-blue-600" />,
      count: 156,
      fields: ['Code INSEE', 'Nom', 'Département', 'Logements', 'Mondays', 'Statut', 'Distance']
    },
    {
      id: 'campaigns',
      title: 'Campagnes',
      description: 'Données des campagnes actives avec quotas et priorités',
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      count: 8,
      fields: ['PIN', 'Nom', 'Mois', 'Ville', 'Quota Mondays', 'Priorité', 'Jachère']
    },
    {
      id: 'franchises',
      title: 'Franchises',
      description: 'Informations des franchises et leurs performances',
      icon: <Users className="h-5 w-5 text-purple-600" />,
      count: 12,
      fields: ['Nom', 'Contact', 'Région', 'Territoires assignés', 'Mondays gérés']
    },
    {
      id: 'alerts',
      title: 'Alertes',
      description: 'Historique des alertes et notifications système',
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      count: 24,
      fields: ['Territoire', 'Message', 'Niveau', 'Date création', 'Statut']
    }
  ];

  const handleExportToggle = (exportId: string) => {
    setSelectedExports(prev => 
      prev.includes(exportId) 
        ? prev.filter(id => id !== exportId)
        : [...prev, exportId]
    );
  };

  const handleExportAll = () => {
    if (selectedExports.length === exportOptions.length) {
      setSelectedExports([]);
    } else {
      setSelectedExports(exportOptions.map(opt => opt.id));
    }
  };

  const handleDownload = () => {
    // Simulation du téléchargement
    const exportType = exportFormat.toUpperCase();
    alert(`Export ${exportType} de ${selectedExports.length} jeu(x) de données en cours...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exports</h1>
        <p className="text-muted-foreground">
          Exportez vos données au format CSV ou Excel pour analyse externe
        </p>
      </div>

      {/* Configuration de l'export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Configuration de l'export
          </CardTitle>
          <CardDescription>
            Sélectionnez les données à exporter et le format souhaité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium">Format d'export</label>
                <p className="text-xs text-muted-foreground">Choisissez le format de fichier</p>
              </div>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      CSV (Comma-separated)
                    </div>
                  </SelectItem>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Excel (.xlsx)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="space-y-1">
                <label className="text-sm font-medium">Sélection des données</label>
                <p className="text-xs text-muted-foreground">
                  {selectedExports.length} jeu(x) de données sélectionné(s)
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportAll}>
                  {selectedExports.length === exportOptions.length ? 'Tout désélectionner' : 'Tout sélectionner'}
                </Button>
                <Button 
                  onClick={handleDownload} 
                  disabled={selectedExports.length === 0}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Télécharger ({selectedExports.length})
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Options d'export */}
      <div className="grid gap-4">
        {exportOptions.map((option) => (
          <Card key={option.id} className={`transition-all cursor-pointer hover:shadow-md ${
            selectedExports.includes(option.id) ? 'ring-2 ring-primary' : ''
          }`} onClick={() => handleExportToggle(option.id)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    checked={selectedExports.includes(option.id)}
                    onChange={() => handleExportToggle(option.id)}
                  />
                  {option.icon}
                  <div className="space-y-1">
                    <CardTitle className="text-base">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="ml-2">
                  {option.count} enregistrements
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">Champs inclus:</p>
                <div className="flex flex-wrap gap-1">
                  {option.fields.map((field, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Exports récents */}
      <Card>
        <CardHeader>
          <CardTitle>Exports récents</CardTitle>
          <CardDescription>
            Historique de vos derniers exports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Territoires_complet_2024.csv', date: '26/09/2024 14:30', size: '2.3 MB' },
              { name: 'Campagnes_actives_2024.xlsx', date: '25/09/2024 09:15', size: '456 KB' },
              { name: 'Franchises_rapport_2024.csv', date: '24/09/2024 16:45', size: '1.1 MB' }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  {file.name.endsWith('.xlsx') ? (
                    <FileSpreadsheet className="h-4 w-4 text-green-600" />
                  ) : (
                    <FileText className="h-4 w-4 text-blue-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.date} • {file.size}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}