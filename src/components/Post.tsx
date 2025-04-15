
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  Heart, 
  MessageSquare, 
  MoreHorizontal, 
  Share2, 
  Flag,
  Bookmark
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface PostProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
  comments: number;
  liked?: boolean;
  saved?: boolean;
  image?: string;
}

const Post = ({
  id,
  title,
  content,
  author,
  createdAt,
  likes: initialLikes,
  comments: initialComments,
  liked: initialLiked = false,
  saved: initialSaved = false,
  image
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // Implement comment add logic
      setComments(comments + 1);
      setCommentText("");
      setShowCommentForm(false);
    }
  };

  const timeAgo = formatDistanceToNow(createdAt, { 
    addSuffix: true,
    locale: fr 
  });

  return (
    <Card className="post-card mb-4 overflow-hidden animate-fade-in">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{author.name}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              <span>{isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Flag className="mr-2 h-4 w-4" />
              <span>Signaler</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="pb-3">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-foreground/90">{content}</p>
        {image && (
          <div className="mt-3 rounded-md overflow-hidden">
            <img
              src={image}
              alt="Post"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex flex-col items-start">
        <div className="flex items-center space-x-4 w-full mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1 px-2"
            onClick={handleLike}
          >
            <Heart 
              className={cn(
                "h-4 w-4", 
                isLiked ? "fill-primary text-primary" : ""
              )} 
            />
            <span>{likes > 0 ? likes : ""}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1 px-2"
            onClick={() => setShowCommentForm(!showCommentForm)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{comments > 0 ? comments : ""}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-1 px-2"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          <div className="ml-auto">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(isSaved && "text-primary")}
              onClick={handleSave}
            >
              <Bookmark 
                className={cn(
                  "h-4 w-4", 
                  isSaved ? "fill-primary text-primary" : ""
                )} 
              />
            </Button>
          </div>
        </div>
        
        {showCommentForm && (
          <form 
            onSubmit={handleAddComment}
            className="w-full mt-2 space-y-2"
          >
            <Textarea
              placeholder="Écrivez un commentaire..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[80px] focus-visible:ring-primary text-sm"
            />
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setShowCommentForm(false)}
                size="sm"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                size="sm"
                disabled={!commentText.trim()}
              >
                Commenter
              </Button>
            </div>
          </form>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
