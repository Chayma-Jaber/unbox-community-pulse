
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle, Flag, MessageSquare, User, XCircle } from "lucide-react";

// Types pour les signalements
type ReportReason = "inappropriate" | "spam" | "harassment" | "misinformation" | "other";

interface ReportedContentProps {
  id: string;
  contentType: "post" | "comment";
  content: string;
  reason: ReportReason;
  reportedAt: Date;
  reportedBy: string;
  author: {
    name: string;
    avatar: string;
  };
  status: "pending" | "approved" | "rejected";
}

// Données factices pour l'affichage
const reportedContent: ReportedContentProps[] = [
  {
    id: "r1",
    contentType: "post",
    content: "Ce contenu contient des informations trompeuses sur la santé publique et pourrait induire en erreur les lecteurs. Il prétend que certains remèdes maison peuvent guérir des maladies graves sans preuves scientifiques.",
    reason: "misinformation",
    reportedAt: new Date(2025, 3, 15, 9, 30),
    reportedBy: "user123",
    author: {
      name: "Jean Dupont",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    status: "pending"
  },
  {
    id: "r2",
    contentType: "comment",
    content: "Ce commentaire contient des attaques personnelles et des insultes envers un autre membre de la communauté, créant un environnement toxique.",
    reason: "harassment",
    reportedAt: new Date(2025, 3, 14, 16, 45),
    reportedBy: "user456",
    author: {
      name: "Marie Lambert",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    status: "pending"
  },
  {
    id: "r3",
    contentType: "post",
    content: "Publication faisant la promotion d'un produit commercial sans divulgation appropriée, contenant plusieurs liens d'affiliation cachés.",
    reason: "spam",
    reportedAt: new Date(2025, 3, 13, 11, 20),
    reportedBy: "user789",
    author: {
      name: "Thomas Martin",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    status: "pending"
  }
];

// Statistiques de modération
const moderationStats = [
  { label: "En attente", value: 12, icon: <AlertTriangle className="h-4 w-4" /> },
  { label: "Approuvés aujourd'hui", value: 28, icon: <CheckCircle className="h-4 w-4" /> },
  { label: "Rejetés aujourd'hui", value: 7, icon: <XCircle className="h-4 w-4" /> }
];

const reasonLabels: Record<ReportReason, string> = {
  inappropriate: "Contenu inapproprié",
  spam: "Spam ou publicité",
  harassment: "Harcèlement",
  misinformation: "Désinformation",
  other: "Autre raison"
};

const Moderation = () => {
  const [selectedReport, setSelectedReport] = useState<ReportedContentProps | null>(null);
  const [actionReason, setActionReason] = useState("");
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-16 pb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Modération</h1>
          <p className="text-muted-foreground">
            Gérez les signalements et maintenez la qualité des discussions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {moderationStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="processed">Traités</TabsTrigger>
            <TabsTrigger value="my-actions">Mes actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="space-y-4">
              {reportedContent.map(report => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-red-500" />
                        <Badge variant="outline">
                          {report.contentType === "post" ? "Publication" : "Commentaire"}
                        </Badge>
                        <Badge>{reasonLabels[report.reason]}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Signalé le {report.reportedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={report.author.avatar} alt={report.author.name} />
                        <AvatarFallback>{report.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{report.author.name}</p>
                        <p className="text-sm text-muted-foreground">Auteur du contenu</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md mb-4">
                      <p className="text-sm">{report.content}</p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedReport(report)}>
                          Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Détails du signalement</DialogTitle>
                          <DialogDescription>
                            Informations complètes sur le contenu signalé
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 my-4">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage 
                                src={selectedReport?.author.avatar} 
                                alt={selectedReport?.author.name} 
                              />
                              <AvatarFallback>
                                {selectedReport?.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{selectedReport?.author.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Auteur du contenu
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Contenu signalé</h4>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="text-sm">{selectedReport?.content}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Raison du signalement</h4>
                            <p className="text-sm">
                              {selectedReport && reasonLabels[selectedReport.reason]}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              Commentaire de modération
                            </h4>
                            <Textarea
                              placeholder="Ajoutez un commentaire sur votre décision..."
                              value={actionReason}
                              onChange={(e) => setActionReason(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <DialogFooter className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setSelectedReport(null)}>
                            Annuler
                          </Button>
                          <Button variant="destructive">
                            Rejeter le contenu
                          </Button>
                          <Button>
                            Approuver le contenu
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="destructive">Rejeter</Button>
                    <Button>Approuver</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="processed">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Tous les signalements traités</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Il n'y a pas de signalements traités à afficher pour le moment.
                    Lorsque vous approuverez ou rejetterez du contenu, vous le verrez ici.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="my-actions">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Vos actions de modération</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Vous n'avez pas encore effectué d'actions de modération.
                    Un historique de vos décisions apparaîtra ici.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Moderation;
