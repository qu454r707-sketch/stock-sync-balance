import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePortfolioDialogProps {
  onCreatePortfolio: (id: string, name: string) => void;
}

export const CreatePortfolioDialog = ({ onCreatePortfolio }: CreatePortfolioDialogProps) => {
  const [open, setOpen] = useState(false);
  const [portfolioId, setPortfolioId] = useState("");
  const [portfolioName, setPortfolioName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!portfolioId.trim() || !portfolioName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onCreatePortfolio(portfolioId.trim(), portfolioName.trim());
    setPortfolioId("");
    setPortfolioName("");
    setOpen(false);
    
    toast({
      title: "Success",
      description: "Portfolio created successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Portfolio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Portfolio</DialogTitle>
          <DialogDescription>
            Create a new portfolio to track your stock investments.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="portfolio-id" className="text-right">
                ID
              </Label>
              <Input
                id="portfolio-id"
                value={portfolioId}
                onChange={(e) => setPortfolioId(e.target.value)}
                placeholder="e.g., PORTFOLIO_001"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="portfolio-name" className="text-right">
                Name
              </Label>
              <Input
                id="portfolio-name"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                placeholder="e.g., Growth Portfolio"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Portfolio</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};