import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3, Upload } from "lucide-react";

interface PortfolioCardProps {
  id: string;
  name: string;
  currentValue: number;
  totalInvestment: number;
  totalReturns: number;
  returnPercentage: number;
  holdingsCount: number;
  onViewDetails: (id: string) => void;
  onRebalance: (id: string) => void;
}

export const PortfolioCard = ({
  id,
  name,
  currentValue,
  totalInvestment,
  totalReturns,
  returnPercentage,
  holdingsCount,
  onViewDetails,
  onRebalance,
}: PortfolioCardProps) => {
  const isPositive = totalReturns >= 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
        <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
          {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          {returnPercentage.toFixed(2)}%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-xl font-bold">₹{currentValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Returns</p>
              <p className={`text-xl font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                ₹{totalReturns.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Investment</p>
              <p className="text-lg">₹{totalInvestment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Holdings</p>
              <p className="text-lg">{holdingsCount} stocks</p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(id)}
              className="flex-1"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onRebalance(id)}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              Rebalance
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};