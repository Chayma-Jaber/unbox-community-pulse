
import { useEffect, useState } from "react";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Menu</h2>
                <nav className="flex flex-col space-y-2">
                  <Link to="/" className="p-2 hover:bg-accent rounded-md">Accueil</Link>
                  <Link to="/explorer" className="p-2 hover:bg-accent rounded-md">Explorer</Link>
                  <Link to="/tendances" className="p-2 hover:bg-accent rounded-md">Tendances</Link>
                  <Link to="/mes-sujets" className="p-2 hover:bg-accent rounded-md">Mes sujets</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-community-primary to-community-secondary bg-clip-text text-transparent">
              Community Pulse
            </span>
          </Link>

          <nav className="hidden md:flex ml-8 space-x-1">
            <Button variant="ghost" asChild>
              <Link to="/">Accueil</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/explorer">Explorer</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/tendances">Tendances</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/mes-sujets">Mes sujets</Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <div className={cn(
            "hidden md:flex relative w-64",
            mobileSearchVisible && "!flex absolute top-full left-0 right-0 p-2 bg-background border-b z-50"
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher..." 
              className="pl-9 pr-4"
            />
            {mobileSearchVisible && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setMobileSearchVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
