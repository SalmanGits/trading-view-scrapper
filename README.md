

# Live Market Feed Scraper for Large Cap NSE Stocks

This project is a backend system that scrapes live market feed data for large-cap NSE stocks from TradingView every minute. The data is then sent in real-time via WebSocket to any connected clients.

## Features
- Scrapes live market feed for large-cap NSE stocks every minute from TradingView.
- Sends the scraped data via WebSocket for real-time updates.
- Easy to integrate with other applications.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SalmanGits/trading-view-scrapper.git
   ```

2. Navigate to the project directory:
   ```bash
   cd live-market-feed-scraper
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   node index.js
   ```

## Usage

The backend will start scraping data and send real-time updates via WebSocket. You can connect to the WebSocket server to receive the market feed.



