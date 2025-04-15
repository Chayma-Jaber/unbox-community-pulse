
import { useState } from "react";
import Header from "@/components/Header";
import Post, { PostProps } from "@/components/Post";
import TopicsSidebar from "@/components/TopicsSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Données factices pour l'affichage
const postsData: PostProps[] = [
  {
    id: "5",
    title: "Les meilleures pratiques en développement React",
    content: "Après plusieurs années d'expérience avec React, j'ai compilé une liste des meilleures pratiques que tout développeur devrait connaître. Ces conseils peuvent vous aider à éviter les pièges courants et à améliorer la qualité de votre code.",
    author: {
      name: "Alexandre Chen",
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    createdAt: new Date(2025, 3, 12, 9, 45),
    likes: 56,
    comments: 11,
    saved: true
  },
  {
    id: "6",
    title: "Comment j'ai amélioré ma productivité en travaillant à distance",
    content: "Le travail à distance peut être un défi, mais avec les bonnes stratégies, il est possible d'être encore plus productif qu'au bureau. J'ai expérimenté diverses méthodes et je partage ici celles qui ont eu le plus d'impact sur ma routine quotidienne.",
    author: {
      name: "Sophie Dubois",
      avatar: "https://i.pravatar.cc/150?img=29"
    },
    createdAt: new Date(2025, 3, 10, 14, 20),
    likes: 38,
    comments: 9,
    saved: true
  }
];

// Thèmes suivis par l'utilisateur
const followedTopics = [
  { id: "1", name: "Développement web", postCount: 127 },
  { id: "2", name: "Productivité", postCount: 86 },
  { id: "3", name: "Design UX/UI", postCount: 54 },
  { id: "4", name: "Intelligence artificielle", postCount: 211 }
];

const MesSujets = () => {
  const [activeView, setActiveView] = useState<"posts" | "topics">("posts");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Mes Sujets</h1>
              <p className="text-muted-foreground">
                Gérez vos sujets préférés et consultez vos publications sauvegardées
              </p>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <Button 
                variant={activeView === "posts" ? "default" : "outline"} 
                onClick={() => setActiveView("posts")}
              >
                Posts sauvegardés
              </Button>
              <Button 
                variant={activeView === "topics" ? "default" : "outline"} 
                onClick={() => setActiveView("topics")}
              >
                Sujets suivis
              </Button>
            </div>
            
            {activeView === "posts" && (
              <div className="space-y-4">
                {postsData.length > 0 ? (
                  postsData.map(post => <Post key={post.id} {...post} />)
                ) : (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <p className="text-muted-foreground mb-4">Vous n'avez pas encore sauvegardé de posts</p>
                      <Button>Explorer le contenu</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            {activeView === "topics" && (
              <div className="space-y-4">
                {followedTopics.map(topic => (
                  <Card key={topic.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>{topic.name}</CardTitle>
                        <Badge variant="secondary">{topic.postCount} posts</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex justify-between items-center">
                      <CardDescription>
                        Restez à jour sur les dernières discussions
                      </CardDescription>
                      <Button variant="outline" size="sm">Voir les posts</Button>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-dashed">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium mb-1">Découvrir de nouveaux sujets</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explorez notre catalogue de sujets et suivez ceux qui vous intéressent
                    </p>
                    <Button>Explorer les sujets</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          <div className="hidden md:block">
            <TopicsSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MesSujets;
