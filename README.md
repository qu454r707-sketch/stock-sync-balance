# Portfolio Manager Frontend

A React-based portfolio management application for tracking and rebalancing stock portfolios.

## Features

- **Portfolio Management**: Create and view multiple portfolios
- **Holdings Tracking**: View detailed holdings with real-time performance metrics
- **Portfolio Analytics**: Visual charts showing portfolio allocation
- **Rebalancing**: Upload CSV files to rebalance portfolios
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM
- **State Management**: React hooks (useState, useEffect)
- **Icons**: Lucide React

## API Requirements

This frontend expects a backend API with the following endpoints:

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 1. Get All Portfolios
```http
GET /portfolios
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "PORTFOLIO_001",
      "name": "Growth Portfolio",
      "currentValue": 2446129.72,
      "totalInvestment": 2583275.59,
      "totalReturns": -137145.87,
      "returnPercentage": -5.31,
      "holdingsCount": 18,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T15:45:00Z"
    }
  ]
}
```

#### 2. Get Portfolio Details
```http
GET /portfolios/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "PORTFOLIO_001",
    "name": "Growth Portfolio",
    "currentValue": 2446129.72,
    "totalInvestment": 2583275.59,
    "totalReturns": -137145.87,
    "returnPercentage": -5.31,
    "holdings": [
      {
        "ticker": "AAPL",
        "stockName": "Apple Inc",
        "currentPrice": 150.25,
        "avgBuyPrice": 140.50,
        "returns": 6.94,
        "weightage": 12.5,
        "shares": 100,
        "currentValue": 15025.00
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T15:45:00Z"
  }
}
```

#### 3. Create Portfolio
```http
POST /portfolios
```

**Request Body:**
```json
{
  "id": "PORTFOLIO_001",
  "name": "Growth Portfolio"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Portfolio created successfully",
  "data": {
    "id": "PORTFOLIO_001",
    "name": "Growth Portfolio",
    "currentValue": 0,
    "totalInvestment": 0,
    "totalReturns": 0,
    "returnPercentage": 0,
    "holdingsCount": 0,
    "createdAt": "2024-01-20T16:00:00Z",
    "updatedAt": "2024-01-20T16:00:00Z"
  }
}
```

#### 4. Upload Holdings CSV
```http
POST /portfolios/:id/upload-csv
```

**Content-Type:** `multipart/form-data`

**Request Body:**
- `file`: CSV file with holdings data

**CSV Format:**
```csv
ticker,shares,avgBuyPrice
AAPL,100,140.50
GOOGL,50,2100.00
MSFT,75,300.25
```

**Response:**
```json
{
  "success": true,
  "message": "Holdings uploaded and portfolio updated",
  "data": {
    "holdingsProcessed": 3,
    "portfolio": {
      "id": "PORTFOLIO_001",
      "currentValue": 425037.50,
      "totalInvestment": 397512.50,
      "totalReturns": 27525.00,
      "returnPercentage": 6.92
    }
  }
}
```

#### 5. Rebalance Portfolio
```http
POST /portfolios/:id/rebalance
```

**Content-Type:** `multipart/form-data`

**Request Body:**
- `file`: CSV file with target allocations

**CSV Format:**
```csv
ticker,targetWeightage
AAPL,25.0
GOOGL,20.0
MSFT,30.0
TSLA,15.0
NVDA,10.0
```

**Response:**
```json
{
  "success": true,
  "message": "Portfolio rebalanced successfully",
  "data": {
    "rebalanceActions": [
      {
        "ticker": "AAPL",
        "action": "buy",
        "shares": 25,
        "amount": 3756.25
      },
      {
        "ticker": "GOOGL", 
        "action": "sell",
        "shares": 10,
        "amount": 21500.00
      }
    ],
    "portfolio": {
      "id": "PORTFOLIO_001",
      "currentValue": 450000.00,
      "updatedAt": "2024-01-20T16:30:00Z"
    }
  }
}
```

#### 6. Get Stock Prices
```http
GET /stocks/prices?tickers=AAPL,GOOGL,MSFT
```

**Response:**
```json
{
  "success": true,
  "data": {
    "AAPL": {
      "ticker": "AAPL",
      "price": 150.25,
      "change": 2.15,
      "changePercent": 1.45,
      "lastUpdated": "2024-01-20T16:00:00Z"
    },
    "GOOGL": {
      "ticker": "GOOGL", 
      "price": 2150.75,
      "change": -15.25,
      "changePercent": -0.70,
      "lastUpdated": "2024-01-20T16:00:00Z"
    }
  }
}
```

### Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `422`: Unprocessable Entity (file format errors)
- `500`: Internal Server Error

## Data Models

### Portfolio
```typescript
interface Portfolio {
  id: string;                // Unique identifier
  name: string;              // Portfolio name
  currentValue: number;      // Current market value
  totalInvestment: number;   // Total amount invested
  totalReturns: number;      // Total returns (currentValue - totalInvestment)
  returnPercentage: number;  // Return percentage
  holdingsCount: number;     // Number of holdings
  createdAt: string;         // ISO timestamp
  updatedAt: string;         // ISO timestamp
}
```

### Holding
```typescript
interface Holding {
  ticker: string;            // Stock ticker symbol
  stockName: string;         // Company name
  currentPrice: number;      // Current stock price
  avgBuyPrice: number;       // Average purchase price
  returns: number;           // Return percentage for this holding
  weightage: number;         // Portfolio weightage percentage
  shares: number;            // Number of shares owned
  currentValue: number;      // Current value (shares * currentPrice)
}
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production
```bash
npm run build
```

## API Integration Notes

1. **Price Updates**: The frontend expects real-time or frequently updated stock prices
2. **File Upload**: CSV file uploads should be validated on the backend
3. **Error Handling**: All API responses should follow the standard error format
4. **CORS**: Ensure CORS is configured to allow requests from the frontend domain
5. **Rate Limiting**: Consider implementing rate limiting for price API calls

## Recommended Backend Implementation

For the backend, we recommend:

- **Python with FastAPI** or **Node.js with Express**
- **Database**: PostgreSQL or MongoDB
- **Stock Data**: yfinance (Python) or Alpha Vantage API
- **File Processing**: pandas (Python) or similar CSV processing library
- **Background Jobs**: Celery (Python) or Bull Queue (Node.js) for price updates

## Environment Variables

The frontend doesn't require environment variables as it's designed to work with any backend that implements the above API specification.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License