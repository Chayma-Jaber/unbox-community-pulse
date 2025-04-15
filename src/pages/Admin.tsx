
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, BarChart3, Check, Clock, Lock, Search, 
  Shield, ShieldAlert, Users, UserCog, UserPlus 
} from "lucide-react";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

// Types
interface UserProps {
  id: string;
  name: string;
  email: string;
  role: "user" | "moderator" | "admin";
  avatar: string;
  status: "active" | "suspended" | "pending";
  joinedAt: Date;
  lastActive: Date;
}

// Données factices pour l'affichage
const usersData: UserProps[] = [
  {
    id: "u1",
    name: "Sophie Dubois",
    email: "sophie.dubois@example.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=29",
    status: "active",
    joinedAt: new Date(2024, 10, 5),
    lastActive: new Date(2025, 3, 15, 9, 30)
  },
  {
    id: "u2",
    name: "Thomas Martin",
    email: "thomas.martin@example.com",
    role: "moderator",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "active",
    joinedAt: new Date(2024, 11, 12),
    lastActive: new Date(2025, 3, 14, 18, 45)
  },
  {
    id: "u3",
    name: "Marie Lambert",
    email: "marie.lambert@example.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "active",
    joinedAt: new Date(2025, 0, 8),
    lastActive: new Date(2025, 3, 15, 10, 15)
  },
  {
    id: "u4",
    name: "Alexandre Chen",
    email: "alexandre.chen@example.com",
    role: "moderator",
    avatar: "https://i.pravatar.cc/150?img=15",
    status: "active",
    joinedAt: new Date(2025, 1, 20),
    lastActive: new Date(2025, 3, 14, 20, 30)
  },
  {
    id: "u5",
    name: "Lucie Moreau",
    email: "lucie.moreau@example.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=9",
    status: "suspended",
    joinedAt: new Date(2025, 2, 5),
    lastActive: new Date(2025, 3, 10, 14, 20)
  }
];

// Statistiques d'administration
const adminStats = [
  { label: "Utilisateurs actifs", value: 1283, icon: <Users className="h-4 w-4" /> },
  { label: "Modérateurs", value: 24, icon: <Shield className="h-4 w-4" /> },
  { label: "Demandes en attente", value: 17, icon: <Clock className="h-4 w-4" /> },
  { label: "Comptes suspendus", value: 9, icon: <Lock className="h-4 w-4" /> }
];

const roleLabels = {
  user: { label: "Utilisateur", color: "default" },
  moderator: { label: "Modérateur", color: "secondary" },
  admin: { label: "Administrateur", color: "destructive" }
};

const statusLabels = {
  active: { label: "Actif", color: "default" },
  suspended: { label: "Suspendu", color: "destructive" },
  pending: { label: "En attente", color: "secondary" }
};

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  
  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-16 pb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Administration</h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs et supervisez la plateforme
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
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
        
        <Tabs defaultValue="users">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="moderators">Modérateurs</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Rechercher un utilisateur..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button><UserPlus className="mr-2 h-4 w-4" /> Ajouter</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter un utilisateur</DialogTitle>
                          <DialogDescription>
                            Créez un nouveau compte utilisateur avec des rôles spécifiques.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Nom complet</Label>
                            <Input id="name" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="role">Rôle</Label>
                            <select 
                              id="role" 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                              <option value="user">Utilisateur</option>
                              <option value="moderator">Modérateur</option>
                              <option value="admin">Administrateur</option>
                            </select>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button type="submit">Créer l'utilisateur</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CardDescription>
                  Gérez les comptes utilisateurs, leurs rôles et leurs permissions.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
                    <div className="col-span-4">Utilisateur</div>
                    <div className="col-span-3 hidden md:block">Statut</div>
                    <div className="col-span-3 hidden md:block">Inscription</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  
                  {filteredUsers.map(user => (
                    <div key={user.id} className="grid grid-cols-12 p-4 border-t items-center">
                      <div className="col-span-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                            <div className="md:hidden mt-1">
                              <Badge 
                                variant={(roleLabels[user.role].color as "default" | "secondary" | "destructive")}
                              >
                                {roleLabels[user.role].label}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-3 hidden md:flex items-center gap-2">
                        <Badge 
                          variant={(statusLabels[user.status].color as "default" | "secondary" | "destructive")}
                        >
                          {statusLabels[user.status].label}
                        </Badge>
                        <Badge 
                          variant={(roleLabels[user.role].color as "default" | "secondary" | "destructive")}
                        >
                          {roleLabels[user.role].label}
                        </Badge>
                      </div>
                      
                      <div className="col-span-3 hidden md:block text-sm text-muted-foreground">
                        <p>Inscrit le {user.joinedAt.toLocaleDateString()}</p>
                        <p className="text-xs">
                          Dernière activité: {user.lastActive.toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="col-span-2 text-right">
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              Détails
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <div className="mx-auto w-full max-w-lg">
                              <DrawerHeader>
                                <DrawerTitle>Profil de l'utilisateur</DrawerTitle>
                                <DrawerDescription>
                                  Détails et gestion du compte
                                </DrawerDescription>
                              </DrawerHeader>
                              
                              {selectedUser && (
                                <div className="p-4 pb-8">
                                  <div className="flex flex-col items-center mb-6">
                                    <Avatar className="h-24 w-24 mb-4">
                                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                      <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                                    <p className="text-muted-foreground">{selectedUser.email}</p>
                                    <div className="flex gap-2 mt-2">
                                      <Badge 
                                        variant={(statusLabels[selectedUser.status].color as "default" | "secondary" | "destructive")}
                                      >
                                        {statusLabels[selectedUser.status].label}
                                      </Badge>
                                      <Badge 
                                        variant={(roleLabels[selectedUser.role].color as "default" | "secondary" | "destructive")}
                                      >
                                        {roleLabels[selectedUser.role].label}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Informations</h4>
                                      <Card>
                                        <CardContent className="p-4">
                                          <dl className="space-y-2">
                                            <div className="flex justify-between">
                                              <dt className="text-sm text-muted-foreground">Inscrit le</dt>
                                              <dd className="text-sm font-medium">
                                                {selectedUser.joinedAt.toLocaleDateString()}
                                              </dd>
                                            </div>
                                            <div className="flex justify-between">
                                              <dt className="text-sm text-muted-foreground">Dernière activité</dt>
                                              <dd className="text-sm font-medium">
                                                {selectedUser.lastActive.toLocaleDateString()}
                                              </dd>
                                            </div>
                                            <div className="flex justify-between">
                                              <dt className="text-sm text-muted-foreground">ID</dt>
                                              <dd className="text-sm font-medium">{selectedUser.id}</dd>
                                            </div>
                                          </dl>
                                        </CardContent>
                                      </Card>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Activité</h4>
                                      <Card>
                                        <CardContent className="p-4 text-center py-8">
                                          <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                          <p className="text-sm text-muted-foreground">
                                            Statistiques détaillées disponibles dans la section Activité
                                          </p>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-col gap-3">
                                    <h4 className="text-sm font-medium">Actions</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedUser.role !== "admin" && (
                                        <Button variant="outline" size="sm">
                                          <UserCog className="mr-2 h-4 w-4" />
                                          Modifier le rôle
                                        </Button>
                                      )}
                                      
                                      {selectedUser.status === "active" ? (
                                        <Button variant="outline" size="sm">
                                          <Lock className="mr-2 h-4 w-4" />
                                          Suspendre
                                        </Button>
                                      ) : (
                                        <Button variant="outline" size="sm">
                                          <Check className="mr-2 h-4 w-4" />
                                          Réactiver
                                        </Button>
                                      )}
                                      
                                      <Button variant="destructive" size="sm">
                                        Supprimer le compte
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DrawerContent>
                        </Drawer>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <UserCog className="mr-2 h-4 w-4" />
                              Modifier le rôle
                            </DropdownMenuItem>
                            
                            {user.status === "active" ? (
                              <DropdownMenuItem>
                                <Lock className="mr-2 h-4 w-4" />
                                Suspendre
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                Réactiver
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <div className="p-8 text-center">
                      <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Aucun utilisateur trouvé</h3>
                      <p className="text-muted-foreground">
                        Aucun utilisateur ne correspond à votre recherche
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Affichage de {filteredUsers.length} utilisateur(s)
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>Précédent</Button>
                  <Button variant="outline" size="sm" disabled>Suivant</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="moderators">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des modérateurs</CardTitle>
                <CardDescription>
                  Supervisez les activités des modérateurs et gérez leurs permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
                    <div className="col-span-4">Modérateur</div>
                    <div className="col-span-3">Domaine</div>
                    <div className="col-span-3">Statistiques</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  
                  {usersData
                    .filter(user => user.role === "moderator")
                    .map(moderator => (
                      <div key={moderator.id} className="grid grid-cols-12 p-4 border-t items-center">
                        <div className="col-span-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={moderator.avatar} alt={moderator.name} />
                              <AvatarFallback>{moderator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{moderator.name}</p>
                              <p className="text-xs text-muted-foreground">{moderator.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-3">
                          <Badge>Développement</Badge>
                          <Badge className="ml-1">Technologie</Badge>
                        </div>
                        
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">28 actions cette semaine</span>
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <Button variant="outline" size="sm">Gérer</Button>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="19" cy="12" r="1" />
                              <circle cx="5" cy="12" r="1" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activité de la plateforme</CardTitle>
                <CardDescription>
                  Suivez l'activité globale et les métriques importantes
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Statistiques et graphiques</h3>
                  <p className="text-muted-foreground max-w-md">
                    Cette section afficherait des graphiques détaillés sur l'activité 
                    des utilisateurs, la croissance et les métriques d'engagement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de la plateforme</CardTitle>
                <CardDescription>
                  Configurez les options générales du système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Paramètres de modération</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="automod">Modération automatique</Label>
                          <p className="text-sm text-muted-foreground">
                            Activer la modération automatique basée sur l'IA
                          </p>
                        </div>
                        <div className="flex h-5 items-center space-x-2">
                          <input 
                            id="automod" 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <Label htmlFor="approval">Approbation des publications</Label>
                          <p className="text-sm text-muted-foreground">
                            Exiger l'approbation des modérateurs pour les nouvelles publications
                          </p>
                        </div>
                        <div className="flex h-5 items-center space-x-2">
                          <input 
                            id="approval" 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Paramètres généraux</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="site-name">Nom du site</Label>
                        <Input id="site-name" defaultValue="Community Pulse" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input 
                          id="description" 
                          defaultValue="Partagez et découvrez des idées avec une communauté passionnée" 
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="ml-auto">Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
