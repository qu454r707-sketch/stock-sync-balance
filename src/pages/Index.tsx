import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioCard } from "@/components/PortfolioCard";
import { CreatePortfolioDialog } from "@/components/CreatePortfolioDialog";
import { BarChart3, TrendingUp, Wallet, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - this will be replaced with API data
const mockPortfolios = [
  {
    id: "CANSLIM_QUANT",
    name: "Canslim Quant Portfolio",
    currentValue: 2446129.72,
    totalInvestment: 2583275.59,
    totalReturns: -40430.45,
    returnPercentage: -1.57,
    holdingsCount: 18,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [portfolios, setPortfolios] = useState(mockPortfolios);

  const totalValue = portfolios.reduce((sum, portfolio) => sum + portfolio.currentValue, 0);
  const totalInvestment = portfolios.reduce((sum, portfolio) => sum + portfolio.totalInvestment, 0);
  const totalReturns = totalValue - totalInvestment;
  const totalReturnPercentage = totalInvestment > 0 ? (totalReturns / totalInvestment) * 100 : 0;

  const handleViewDetails = (portfolioId: string) => {
    sessionStorage.setItem('selectedPortfolioId', portfolioId);
    navigate('/portfolio');
  };

  const handleRebalance = (portfolioId: string) => {
    sessionStorage.setItem('selectedPortfolioId', portfolioId);
    navigate('/portfolio');
  };

  const handleCreatePortfolio = (id: string, name: string) => {
    const newPortfolio = {
      id,
      name,
      currentValue: 0,
      totalInvestment: 0,
      totalReturns: 0,
      returnPercentage: 0,
      holdingsCount: 0,
    };
    setPortfolios([...portfolios, newPortfolio]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Portfolio Manager</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your stock portfolios with intelligent rebalancing
            </p>
          </div>
          <CreatePortfolioDialog onCreatePortfolio={handleCreatePortfolio} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalInvestment.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-success' : 'text-destructive'}`}>
                ₹{totalReturns.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolios</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolios.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolios Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Your Portfolios</h2>
          {portfolios.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">No portfolios yet</h3>
                  <p className="text-muted-foreground">Create your first portfolio to get started</p>
                </div>
                <CreatePortfolioDialog onCreatePortfolio={handleCreatePortfolio} />
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
                  {...portfolio}
                  onViewDetails={handleViewDetails}
                  onRebalance={handleRebalance}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
