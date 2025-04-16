
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, X, User, Settings, Bell, Shield, LogOut } from "lucide-react";
import Post, { PostProps } from "@/components/Post";

// Données factices pour l'affichage
const userData = {
  name: "Sophie Dubois",
  username: "sophie.dubois",
  email: "sophie.dubois@example.com",
  bio: "Passionnée de photographie et de nouvelles technologies. J'aime partager mes découvertes et échanger avec la communauté.",
  avatar: "https://i.pravatar.cc/150?img=29",
  joinDate: "Avril 2025",
  postsCount: 34,
  followersCount: 156,
  followingCount: 89
};

// Données factices pour les posts de l'utilisateur
const userPosts: PostProps[] = [
  {
    id: "1",
    title: "Comment améliorer vos compétences en photographie",
    content: "La photographie est un art qui demande de la patience et de la pratique. Voici quelques conseils qui m'ont aidé à progresser : prenez le temps d'étudier votre sujet, jouez avec la lumière naturelle, et n'ayez pas peur d'expérimenter avec différents angles.",
    author: {
      name: userData.name,
      avatar: userData.avatar
    },
    createdAt: new Date(2025, 3, 14, 10, 30),
    likes: 42,
    comments: 7,
    liked: false,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: "2",
    title: "Découverte musicale du mois",
    content: "Ce mois-ci, j'ai découvert plusieurs artistes indépendants qui méritent vraiment d'être connus. Leurs compositions sont originales et rafraîchissantes. Je vous conseille particulièrement d'écouter le dernier album de Luna Frost, une révélation dans le genre indie-folk.",
    author: {
      name: userData.name,
      avatar: userData.avatar
    },
    createdAt: new Date(2025, 3, 14, 9, 15),
    likes: 29,
    comments: 4,
    liked: true
  }
];

// Liste des intérêts
const interests = [
  "Photographie", "Technologie", "Musique", "Voyage", "Art", "Littérature", "Cinéma", "Gastronomie"
];

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userForm, setUserForm] = useState({
    name: userData.name,
    username: userData.username,
    email: userData.email,
    bio: userData.bio
  });
  const [userInterests, setUserInterests] = useState(interests.slice(0, 5));
  const [newInterest, setNewInterest] = useState("");

  const handleSaveProfile = () => {
    // Simulons une mise à jour du profil (à remplacer par une vraie API)
    setTimeout(() => {
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées"
      });
      setIsEditing(false);
    }, 1000);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !userInterests.includes(newInterest.trim())) {
      setUserInterests([...userInterests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setUserInterests(userInterests.filter(item => item !== interest));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card className="border shadow-sm sticky top-20">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                  <Button 
                    variant={activeTab === "notifications" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button 
                    variant={activeTab === "security" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Sécurité
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="profile" className="mt-0">
                <Card className="border shadow-sm mb-6">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={userData.avatar} alt={userData.name} />
                        <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      
                      <div className="text-center sm:text-left">
                        <CardTitle className="text-2xl">{userData.name}</CardTitle>
                        <CardDescription>@{userData.username}</CardDescription>
                        <div className="flex justify-center sm:justify-start mt-2 gap-4">
                          <div className="text-center">
                            <p className="font-bold">{userData.postsCount}</p>
                            <p className="text-xs text-muted-foreground">Posts</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold">{userData.followersCount}</p>
                            <p className="text-xs text-muted-foreground">Abonnés</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold">{userData.followingCount}</p>
                            <p className="text-xs text-muted-foreground">Abonnements</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-auto">
                        <Button onClick={() => setIsEditing(!isEditing)}>
                          {isEditing ? "Annuler" : "Modifier"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {isEditing ? (
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Nom complet</label>
                            <Input 
                              value={userForm.name} 
                              onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Nom d'utilisateur</label>
                            <Input 
                              value={userForm.username} 
                              onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Email</label>
                          <Input 
                            type="email"
                            value={userForm.email} 
                            onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Bio</label>
                          <Textarea 
                            value={userForm.bio} 
                            onChange={(e) => setUserForm({...userForm, bio: e.target.value})}
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Centres d'intérêt</label>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {userInterests.map(interest => (
                              <Badge key={interest} variant="secondary" className="p-1 pr-2">
                                {interest}
                                <button 
                                  className="ml-1"
                                  onClick={() => handleRemoveInterest(interest)}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="Nouvel intérêt" 
                              value={newInterest}
                              onChange={(e) => setNewInterest(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                            />
                            <Button type="button" onClick={handleAddInterest}>Ajouter</Button>
                          </div>
                        </div>
                        
                        <Button onClick={handleSaveProfile} className="mt-2">
                          Sauvegarder
                        </Button>
                      </div>
                    </CardContent>
                  ) : (
                    <CardContent>
                      <p className="mb-4">{userData.bio}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Membre depuis {userData.joinDate}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <h4 className="text-sm font-medium w-full mb-1">Centres d'intérêt</h4>
                        {userInterests.map(interest => (
                          <Badge key={interest} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
                
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Publications</h2>
                  <Tabs defaultValue="posts">
                    <TabsList className="mb-4">
                      <TabsTrigger value="posts">Posts</TabsTrigger>
                      <TabsTrigger value="comments">Commentaires</TabsTrigger>
                      <TabsTrigger value="likes">J'aime</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="posts" className="space-y-4">
                      {userPosts.map(post => (
                        <Post key={post.id} {...post} />
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="comments">
                      <Card className="border-dashed">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                          <p className="text-muted-foreground mb-2">
                            Vous n'avez pas encore commenté de posts
                          </p>
                          <Button variant="outline">Explorer le contenu</Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="likes">
                      <Card className="border-dashed">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                          <p className="text-muted-foreground mb-2">
                            Vous n'avez pas encore aimé de posts
                          </p>
                          <Button variant="outline">Explorer le contenu</Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Paramètres du compte</CardTitle>
                    <CardDescription>
                      Gérez les paramètres de votre compte
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-10">
                      Paramètres en cours de développement
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Gérez vos préférences de notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-10">
                      Paramètres de notifications en cours de développement
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Sécurité</CardTitle>
                    <CardDescription>
                      Gérez la sécurité de votre compte
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-10">
                      Paramètres de sécurité en cours de développement
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
