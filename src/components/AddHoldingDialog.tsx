import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddHoldingDialogProps {
  portfolioId: string;
  onAddHolding: (portfolioId: string, holdingData: { ticker: string; shares: number; avgBuyPrice: number }) => void;
}

export const AddHoldingDialog = ({ portfolioId, onAddHolding }: AddHoldingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [ticker, setTicker] = useState("");
  const [shares, setShares] = useState("");
  const [avgBuyPrice, setAvgBuyPrice] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticker || !shares || !avgBuyPrice) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddHolding(portfolioId, {
      ticker: ticker.toUpperCase(),
      shares: parseInt(shares),
      avgBuyPrice: parseFloat(avgBuyPrice),
    });

    // Reset form
    setTicker("");
    setShares("");
    setAvgBuyPrice("");
    setOpen(false);

    toast({
      title: "Holding Added",
      description: `Added ${shares} shares of ${ticker.toUpperCase()}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Holding
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Holding</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticker">Stock Ticker</Label>
            <Input
              id="ticker"
              placeholder="e.g., AAPL, RELIANCE"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="uppercase"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shares">Number of Shares</Label>
            <Input
              id="shares"
              type="number"
              placeholder="e.g., 100"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avgBuyPrice">Average Buy Price (₹)</Label>
            <Input
              id="avgBuyPrice"
              type="number"
              step="0.01"
              placeholder="e.g., 150.50"
              value={avgBuyPrice}
              onChange={(e) => setAvgBuyPrice(e.target.value)}
              min="0.01"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Holding</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};