
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader 
} from "@/components/ui/card";
import { Image, Link, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Post publié !",
        description: "Votre message a été partagé avec la communauté.",
      });
      setTitle("");
      setContent("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de votre publication"
            className="font-medium text-base focus-visible:ring-primary"
          />
        </CardHeader>
        <CardContent className="pb-2">
          <Tabs defaultValue="text">
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="text">Texte</TabsTrigger>
              <TabsTrigger value="media">Média</TabsTrigger>
              <TabsTrigger value="link">Lien</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="mt-0">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Partagez vos idées avec la communauté..."
                className="min-h-[120px] focus-visible:ring-primary"
              />
            </TabsContent>
            
            <TabsContent value="media" className="mt-0">
              <div className="border-2 border-dashed rounded-md p-8 text-center space-y-3">
                <div className="flex justify-center">
                  <Image className="h-10 w-10 text-muted-foreground" />
                  <Video className="h-10 w-10 text-muted-foreground ml-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Glissez une image ou une vidéo ici, ou cliquez pour parcourir
                </p>
                <Button variant="outline">Choisir un fichier</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="link" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Link className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input placeholder="Collez l'URL du site à partager" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Partagez un lien intéressant avec la communauté. 
                  Nous récupérerons automatiquement le titre et l'aperçu.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="justify-end">
          <Button 
            type="submit" 
            disabled={(!title && !content) || isSubmitting}
          >
            {isSubmitting ? "Publication en cours..." : "Publier"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostForm;
