import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, TrendingDown, Upload, BarChart3, RefreshCw } from "lucide-react";
import { HoldingTable } from "@/components/HoldingTable";
import { PortfolioChart } from "@/components/PortfolioChart";
import { RebalanceDialog } from "@/components/RebalanceDialog";
import { AddHoldingDialog } from "@/components/AddHoldingDialog";
import { useToast } from "@/hooks/use-toast";

// Mock data - this will be replaced with Supabase data
const mockPortfolios = {
  "CANSLIM_QUANT": {
    id: "CANSLIM_QUANT",
    name: "Canslim Quant Portfolio",
    currentValue: 2446129.72,
    totalInvestment: 2583275.59,
    totalReturns: -40430.45,
    returnPercentage: -1.57,
    holdings: [
      {
        ticker: "FORTIS",
        stockName: "Fortis Healthcare Ltd",
        currentPrice: 929.75,
        avgBuyPrice: 750.45,
        returns: 23.89,
        weightage: 4.02,
        shares: 106,
        currentValue: 98553.5
      },
      {
        ticker: "KIMS",
        stockName: "Krishna Institute of Medical Sciences Ltd", 
        currentPrice: 736.95,
        avgBuyPrice: 649.03,
        returns: 13.54,
        weightage: 5.00,
        shares: 166,
        currentValue: 122333.7
      },
      {
        ticker: "RADICO",
        stockName: "Radico Khaitan Ltd",
        currentPrice: 2896.70,
        avgBuyPrice: 2522.05,
        returns: 14.85,
        weightage: 2.48,
        shares: 21,
        currentValue: 60830.7
      },
      {
        ticker: "NH",
        stockName: "Narayana Hrudayalaya Ltd",
        currentPrice: 1766.30,
        avgBuyPrice: 1854.35,
        returns: -4.74,
        weightage: 6.06,
        shares: 84,
        currentValue: 148369.2
      },
      {
        ticker: "ICICIBANK",
        stockName: "ICICI Bank Ltd",
        currentPrice: 1394.20,
        avgBuyPrice: 1432.86,
        returns: -2.69,
        weightage: 14.30,
        shares: 251,
        currentValue: 349943.2
      }
    ]
  }
};

const PortfolioDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rebalanceDialogOpen, setRebalanceDialogOpen] = useState(false);

  const id = sessionStorage.getItem('selectedPortfolioId');
  const portfolio = id ? mockPortfolios[id as keyof typeof mockPortfolios] : null;

  if (!portfolio) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const isPositive = portfolio.totalReturns >= 0;

  const chartData = portfolio.holdings.map(holding => ({
    name: holding.ticker,
    value: holding.currentValue,
    ticker: holding.ticker
  })).sort((a, b) => b.value - a.value);

  const handleRebalance = (portfolioId: string, file: File) => {
    // This will be implemented with API call
    toast({
      title: "Rebalancing Started",
      description: `Processing rebalancing for ${portfolio.name}`,
    });
  };

  const handleAddHolding = (portfolioId: string, holdingData: { ticker: string; shares: number; avgBuyPrice: number }) => {
    // This will be implemented with API call
    console.log("Adding holding to portfolio:", portfolioId, holdingData);
    toast({
      title: "Adding Holding",
      description: `Adding ${holdingData.shares} shares of ${holdingData.ticker}`,
    });
  };

  const handleRemoveHolding = (ticker: string) => {
    // This will be implemented with API call
    console.log("Removing holding:", ticker);
    toast({
      title: "Removing Holding",
      description: `Removing ${ticker} from portfolio`,
    });
  };

  const handleRefreshPrices = () => {
    // This will be implemented with API call
    console.log("Refreshing prices for portfolio:", portfolio?.id);
    toast({
      title: "Refreshing Prices",
      description: "Updating latest stock prices for all holdings",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{portfolio.name}</h1>
            <p className="text-muted-foreground">Portfolio ID: {portfolio.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshPrices}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Prices
          </Button>
          <Button onClick={() => setRebalanceDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Rebalance Portfolio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{portfolio.currentValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{portfolio.totalInvestment.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
              ₹{portfolio.totalReturns.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Return %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={isPositive ? "default" : "destructive"}>
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {portfolio.returnPercentage.toFixed(2)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="allocation">
            <BarChart3 className="h-4 w-4 mr-2" />
            Allocation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="holdings" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Holdings ({portfolio.holdings.length} stocks)</CardTitle>
              <AddHoldingDialog 
                portfolioId={portfolio.id} 
                onAddHolding={handleAddHolding}
              />
            </CardHeader>
            <CardContent>
              <HoldingTable 
                holdings={portfolio.holdings} 
                onRemoveHolding={handleRemoveHolding}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="allocation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioChart data={chartData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <RebalanceDialog
        open={rebalanceDialogOpen}
        onOpenChange={setRebalanceDialogOpen}
        portfolioId={portfolio.id}
        portfolioName={portfolio.name}
        onRebalance={handleRebalance}
      />
    </div>
  );
};

export default PortfolioDetails;