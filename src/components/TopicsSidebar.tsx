
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const topicsData = [
  { id: "1", name: "Technologie", count: 156, followed: true },
  { id: "2", name: "Design", count: 89, followed: false },
  { id: "3", name: "Musique", count: 132, followed: true },
  { id: "4", name: "Photographie", count: 75, followed: false },
  { id: "5", name: "Cuisine", count: 104, followed: false },
  { id: "6", name: "Sport", count: 118, followed: true },
  { id: "7", name: "Voyage", count: 93, followed: false },
  { id: "8", name: "Cinéma", count: 127, followed: false },
  { id: "9", name: "Art", count: 68, followed: true },
  { id: "10", name: "Livres", count: 82, followed: false },
];

const trendingTopics = [
  { id: "3", name: "Musique", change: "+28%" },
  { id: "8", name: "Cinéma", change: "+15%" },
  { id: "2", name: "Design", change: "+12%" },
];

const TopicsSidebar = () => {
  const [topics, setTopics] = useState(topicsData);

  const handleFollowTopic = (id: string) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, followed: !topic.followed } : topic
    ));
  };

  return (
    <div className="bg-card border rounded-lg overflow-hidden h-[calc(100vh-8rem)] sticky top-20">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium">Sujets d'intérêt</h3>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 border-b">
        <div className="flex items-center mb-3">
          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
          <h4 className="font-medium text-sm">Tendances</h4>
        </div>
        <div className="space-y-2">
          {trendingTopics.map(topic => (
            <div key={topic.id} className="flex items-center justify-between">
              <span className="text-sm">{topic.name}</span>
              <Badge variant="outline" className="text-primary text-xs">
                {topic.change}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100%-8rem)]">
        <div className="p-4">
          <h4 className="font-medium text-sm mb-3">Tous les sujets</h4>
          <div className="space-y-2">
            {topics.map(topic => (
              <div 
                key={topic.id} 
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="text-sm">{topic.name}</span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({topic.count})
                  </span>
                </div>
                <Button
                  variant={topic.followed ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleFollowTopic(topic.id)}
                >
                  {topic.followed ? "Suivi" : "Suivre"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TopicsSidebar;
