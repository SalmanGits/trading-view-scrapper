import cors from "cors";
import express, { Application } from "express";
import { createServer, Server as HTTPServer } from "http";
import SocketManager from "../socket/index";

class App {
  public app: Application;
  private httpServer: HTTPServer;
  private socketManager: SocketManager;

  constructor() {
    // Initializing the express application
    this.app = express();
    this.initializeMiddlewares();

    // Creating the HTTP server
    this.httpServer = createServer(this.app);

    // Initialize SocketManager
    this.socketManager = SocketManager.getInstance();
    this.socketManager.init(this.httpServer);

    this.initializeSocket();
  }

  private initializeMiddlewares() {
    // Applying middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeSocket() {
    const io = this.socketManager.getIO();
    // socketModule(io);
  }



  public init() {
  
    return this.httpServer;
  }
}

export default App;
