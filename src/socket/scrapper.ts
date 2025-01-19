import * as cheerio from 'cheerio';
import axios, { AxiosInstance } from 'axios';

class StockScraper {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive',
            },
            timeout: 30000
        });
    }

    async scrapeStocks(): Promise<any[]> {
        try {
            const response = await this.client.get(process.env.URL);
            const $ = cheerio.load(response.data);

            const stocks: any[] = [];

            $('table tbody tr').each((index: number, element: any) => {
                if (index >= 50) return false;

                const $row = $(element);
                const $cells = $row.find('td');

                const symbol = $cells.eq(0).find('a').first().text().trim();
                const name = $cells.eq(0).find('sup').last().text().trim();
                const logo = $cells.eq(0).find('img').attr('src');
                const stock = {
                    symbol: symbol,
                    name: name,
                    logo: logo,
                    marketCap: $cells.eq(1).text().trim(),
                    price: $cells.eq(2).text().trim(),
                    changePercent: $cells.eq(3).text().trim(),
                    volume: $cells.eq(4).text().trim(),
                    timestamp: new Date().toISOString()
                };

                stocks.push(stock);
            });

            return stocks;

        } catch (error) {
            console.error('Error scraping stocks:', error);
            throw error;
        }
    }
}

export { StockScraper };
