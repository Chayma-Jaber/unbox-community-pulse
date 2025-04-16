
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  Heart, 
  Flag,
  MoreHorizontal,
  MessageSquare,
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface CommentProps {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
  liked?: boolean;
  replies?: CommentProps[];
  level?: number;
}

const Comment = ({
  id,
  content,
  author,
  createdAt,
  likes: initialLikes,
  liked: initialLiked = false,
  replies = [],
  level = 0
}: CommentProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(level === 0);

  const maxLevel = 2;
  const hasReplies = replies.length > 0;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      // Implement reply add logic (à remplacer par la vraie logique)
      setReplyText("");
      setShowReplyForm(false);
    }
  };

  const timeAgo = formatDistanceToNow(createdAt, { 
    addSuffix: true,
    locale: fr 
  });

  return (
    <div className={cn("comment animate-fade-in", level > 0 && "ml-8")}>
      <Card className={cn("mb-3 border", level > 0 && "bg-muted/30")}>
        <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">{author.name}</p>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                <span>Signaler</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        
        <CardContent className="p-3 pt-0">
          <p className="text-sm">{content}</p>
        </CardContent>
        
        <CardFooter className="p-3 pt-0 flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-1"
            onClick={handleLike}
          >
            <Heart 
              className={cn(
                "h-3 w-3 mr-1", 
                isLiked ? "fill-primary text-primary" : ""
              )} 
            />
            <span className="text-xs">{likes > 0 ? likes : ""}</span>
          </Button>
          
          {level < maxLevel && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-1"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              <span className="text-xs">Répondre</span>
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {showReplyForm && (
        <div className="ml-8 mb-3">
          <form onSubmit={handleAddReply} className="space-y-2">
            <Textarea
              placeholder="Écrivez une réponse..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[60px] text-sm"
            />
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => setShowReplyForm(false)}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                size="sm"
                disabled={!replyText.trim()}
              >
                Répondre
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {hasReplies && (
        <div className="mb-2">
          {!showReplies ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-3 text-xs"
              onClick={() => setShowReplies(true)}
            >
              Afficher {replies.length} réponse{replies.length > 1 ? 's' : ''}
            </Button>
          ) : (
            <>
              {replies.map(reply => (
                <Comment 
                  key={reply.id} 
                  {...reply} 
                  level={level + 1} 
                />
              ))}
              {replies.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-8 text-xs"
                  onClick={() => setShowReplies(false)}
                >
                  Masquer les réponses
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
