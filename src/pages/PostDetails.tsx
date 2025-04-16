
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Post, { PostProps } from "@/components/Post";
import Comment, { CommentProps } from "@/components/Comment";
import TopicsSidebar from "@/components/TopicsSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Données factices pour l'affichage d'un post
const postData: PostProps = {
  id: "1",
  title: "Comment améliorer vos compétences en photographie",
  content: "La photographie est un art qui demande de la patience et de la pratique. Voici quelques conseils qui m'ont aidé à progresser : prenez le temps d'étudier votre sujet, jouez avec la lumière naturelle, et n'ayez pas peur d'expérimenter avec différents angles.\n\nCommencez par maîtriser les bases de l'exposition : ouverture, vitesse d'obturation et ISO. Ces trois éléments sont fondamentaux et leur compréhension vous permettra de prendre des décisions éclairées lors de vos prises de vue.\n\nEnsuite, apprenez à composer vos images. La règle des tiers est un bon point de départ, mais n'hésitez pas à l'enfreindre lorsque la situation s'y prête. La photographie est avant tout une expression artistique.\n\nEnfin, pratiquez régulièrement. Comme tout art, la photographie s'améliore avec la pratique. N'hésitez pas à partager votre travail pour recevoir des critiques constructives qui vous aideront à progresser.",
  author: {
    name: "Sophie Dubois",
    avatar: "https://i.pravatar.cc/150?img=29"
  },
  createdAt: new Date(2025, 3, 14, 10, 30),
  likes: 42,
  comments: 7,
  liked: false,
  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
};

// Données factices pour les commentaires
const commentsData: CommentProps[] = [
  {
    id: "1",
    content: "Merci pour ces conseils ! J'ai commencé la photographie récemment et ça m'aide beaucoup.",
    author: {
      name: "Alexandre Chen",
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    createdAt: new Date(2025, 3, 14, 14, 30),
    likes: 8,
    replies: [
      {
        id: "1-1",
        content: "Ravi que ça t'aide ! N'hésite pas si tu as des questions spécifiques.",
        author: {
          name: "Sophie Dubois",
          avatar: "https://i.pravatar.cc/150?img=29"
        },
        createdAt: new Date(2025, 3, 14, 15, 10),
        likes: 3,
        replies: [
          {
            id: "1-1-1",
            content: "En fait, j'aimerais en savoir plus sur les réglages pour photographier en faible luminosité.",
            author: {
              name: "Alexandre Chen",
              avatar: "https://i.pravatar.cc/150?img=15"
            },
            createdAt: new Date(2025, 3, 14, 16, 05),
            likes: 1
          }
        ]
      }
    ]
  },
  {
    id: "2",
    content: "J'utilise la règle des tiers depuis longtemps, mais j'essaie maintenant d'explorer d'autres approches de composition. Avez-vous des suggestions ?",
    author: {
      name: "Marie Lambert",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    createdAt: new Date(2025, 3, 14, 12, 45),
    likes: 5
  },
  {
    id: "3",
    content: "Quelle est votre marque d'appareil photo préférée ?",
    author: {
      name: "Thomas Martin",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    createdAt: new Date(2025, 3, 14, 11, 20),
    likes: 2,
    liked: true
  }
];

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(commentsData);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // Simulons l'ajout d'un commentaire
      const newComment: CommentProps = {
        id: `new-${Date.now()}`,
        content: commentText,
        author: {
          name: "Utilisateur Connecté",
          avatar: "https://i.pravatar.cc/150?img=32"
        },
        createdAt: new Date(),
        likes: 0
      };
      
      setComments([newComment, ...comments]);
      setCommentText("");
      
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié avec succès"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            
            <Post {...postData} expanded={true} />
            
            <Card className="mt-6 border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Commentaires ({comments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddComment} className="mb-6 space-y-3">
                  <Textarea
                    placeholder="Ajouter un commentaire..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[100px] focus-visible:ring-primary"
                  />
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={!commentText.trim()}
                    >
                      Commenter
                    </Button>
                  </div>
                </form>
                
                <div className="space-y-2">
                  {comments.map(comment => (
                    <Comment key={comment.id} {...comment} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="hidden md:block">
            <TopicsSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
