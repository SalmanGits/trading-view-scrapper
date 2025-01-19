import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import sessionManager from "./session";
import { StockScraper } from "./scrapper";

interface SocketManagerInstance {
  io: SocketIOServer | null;
  init(httpServer: HTTPServer): SocketIOServer;
  getIO(): SocketIOServer;
}
interface CustomSocket extends Socket {
  userId?: string;
  sessionId?: string;
}


class SocketManager implements SocketManagerInstance {
  private static instance: SocketManager;
  public io: SocketIOServer | null = null;

  private constructor() {
    if (!SocketManager.instance) {
      SocketManager.instance = this;
    }
    return SocketManager.instance;
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  init(httpServer: HTTPServer): SocketIOServer {
    if (!this.io) {
      this.io = new SocketIOServer(httpServer, {
        cors: {
          origin: "*",
          credentials: true,
        },
      });

      this.io.on("connection", (socket: CustomSocket) => {
        console.log("A user connected", socket.id);
    

        socket.on("get-data", async () => {
          const scraper = new StockScraper();
          let isRunning = true;
          process.on('SIGINT', () => {
            console.log('Shutting down...');
            isRunning = false;
            process.exit(0);
          });


          const intervalId = setInterval(async () => {
            if (!isRunning) {
              clearInterval(intervalId);
              return;
            }

            try {
              console.log('Starting scrape at:', new Date().toISOString());
              const data = await scraper.scrapeStocks();
              console.log(`Successfully scraped ${data.length} stocks`);


              socket.emit('stock-data', data);

            } catch (error) {
              console.error('Error in scraping loop:', error);
            }
          }, 60000);

        })


      });
    }
    return this.io;
  }

  getIO(): SocketIOServer {
    if (!this.io) {
      throw new Error("Socket.io not initialized. Please call init first.");
    }
    return this.io;
  }
}

export default SocketManager;
