import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Trash2 } from "lucide-react";

interface Holding {
  ticker: string;
  stockName: string;
  currentPrice: number;
  avgBuyPrice: number;
  returns: number;
  weightage: number;
  shares: number;
  currentValue: number;
}

interface HoldingTableProps {
  holdings: Holding[];
  onRemoveHolding?: (ticker: string) => void;
}

export const HoldingTable = ({ holdings, onRemoveHolding }: HoldingTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ticker</TableHead>
            <TableHead>Stock Name</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">Avg Buy Price</TableHead>
            <TableHead className="text-right">Returns</TableHead>
            <TableHead className="text-right">Weightage</TableHead>
            <TableHead className="text-right">Shares</TableHead>
            <TableHead className="text-right">Current Value</TableHead>
            {onRemoveHolding && <TableHead className="w-[50px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((holding) => {
            const isPositive = holding.returns >= 0;
            return (
              <TableRow key={holding.ticker}>
                <TableCell className="font-medium">{holding.ticker}</TableCell>
                <TableCell>{holding.stockName}</TableCell>
                <TableCell className="text-right">₹{holding.currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{holding.avgBuyPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
                    {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {holding.returns.toFixed(2)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{holding.weightage.toFixed(2)}%</TableCell>
                <TableCell className="text-right">{holding.shares}</TableCell>
                <TableCell className="text-right font-semibold">₹{holding.currentValue.toLocaleString()}</TableCell>
                {onRemoveHolding && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveHolding(holding.ticker)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};