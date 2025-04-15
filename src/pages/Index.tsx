
import { useEffect } from "react";
import Header from "@/components/Header";
import Post, { PostProps } from "@/components/Post";
import CreatePostForm from "@/components/CreatePostForm";
import TopicsSidebar from "@/components/TopicsSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Données factices pour l'affichage
const postsData: PostProps[] = [
  {
    id: "1",
    title: "Comment améliorer vos compétences en photographie",
    content: "La photographie est un art qui demande de la patience et de la pratique. Voici quelques conseils qui m'ont aidé à progresser : prenez le temps d'étudier votre sujet, jouez avec la lumière naturelle, et n'ayez pas peur d'expérimenter avec différents angles.",
    author: {
      name: "Sophie Dubois",
      avatar: "https://i.pravatar.cc/150?img=29"
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
      name: "Thomas Martin",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    createdAt: new Date(2025, 3, 14, 9, 15),
    likes: 29,
    comments: 4,
    liked: true
  },
  {
    id: "3",
    title: "Les tendances culinaires à suivre cette année",
    content: "La cuisine évolue constamment et de nouvelles tendances émergent chaque année. En 2025, on observe un retour aux techniques traditionnelles combinées à des ingrédients modernes. La fermentation gagne en popularité et les alternatives végétales continuent leur progression.",
    author: {
      name: "Marie Lambert",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    createdAt: new Date(2025, 3, 13, 18, 45),
    likes: 67,
    comments: 13,
    saved: true
  },
  {
    id: "4",
    title: "Astuces pour un code plus propre et maintenable",
    content: "Après plusieurs années de développement, j'ai appris que la clarté du code est souvent plus importante que sa concision. Nommez vos variables de manière descriptive, commentez les parties complexes, et n'hésitez pas à refactoriser régulièrement. Votre futur vous (et vos collègues) vous remerciera.",
    author: {
      name: "Alexandre Chen",
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    createdAt: new Date(2025, 3, 13, 14, 20),
    likes: 93,
    comments: 21
  }
];

const Index = () => {
  useEffect(() => {
    // Ajuster le padding pour l'en-tête fixe
    document.body.style.paddingTop = "4rem";
    return () => {
      document.body.style.paddingTop = "0";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Community Pulse</h1>
              <p className="text-muted-foreground">
                Partagez et découvrez des idées avec une communauté passionnée
              </p>
            </div>
            
            <CreatePostForm />
            
            <Tabs defaultValue="recent" className="mb-6">
              <TabsList>
                <TabsTrigger value="recent">Récents</TabsTrigger>
                <TabsTrigger value="popular">Populaires</TabsTrigger>
                <TabsTrigger value="following">Mes sujets</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="mt-4">
                {postsData.map(post => (
                  <Post key={post.id} {...post} />
                ))}
              </TabsContent>
              
              <TabsContent value="popular" className="mt-4">
                {postsData
                  .sort((a, b) => b.likes - a.likes)
                  .map(post => (
                    <Post key={post.id} {...post} />
                  ))}
              </TabsContent>
              
              <TabsContent value="following" className="mt-4">
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <h3 className="text-xl font-medium mb-2">
                    Suivez des sujets pour personnaliser votre fil
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Découvrez des sujets qui vous intéressent et suivez-les pour voir plus de contenu pertinent
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="hidden md:block">
            <TopicsSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
