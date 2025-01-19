
interface Session {
    sessionId: string;
    userId: string;
    createdAt?: Date;
    lastActive?: Date;
  }
  
  type UserId = string;
  type SessionId = string;
  
  class SessionManager {
    private sessionMap: Map<UserId, SessionId>;
  
    constructor() {
      this.sessionMap = new Map<UserId, SessionId>();
    }
  
    /**
     * Creates a new session for a user
     * @param userId - The unique identifier for the user
     * @param sessionId - The unique identifier for the session
     */
    public createSession(userId: UserId, sessionId: SessionId): void {
      this.sessionMap.set(userId, sessionId);
      console.log(
        `Created session for user ${userId} with sessionId ${sessionId}`
      );
      console.log("Session map in createSession:", this.getSessionMapState());
    }
  
    /**
     * Removes a session for a user
     * @param userId - The unique identifier for the user
     * @returns boolean indicating if session was successfully removed
     */
    public removeSession(userId: UserId): boolean {
      const removed = this.sessionMap.delete(userId);
      console.log(
        `Session ${removed ? "removed" : "not found"} for user ${userId}`
      );
      console.log("Session map in removeSession:", this.getSessionMapState());
      return removed;
    }
  
    /**
     * Finds a session for a user
     * @param userId - The unique identifier for the user
     * @returns SessionId or undefined if not found
     */
    public findSession(userId: UserId): SessionId | undefined {
      return this.sessionMap.get(userId);
    }
  
    /**
     * Gets all active sessions
     * @returns Array of active sessions
     */
    public getAllSessions(): Array<{ userId: UserId; sessionId: SessionId }> {
      return Array.from(this.sessionMap.entries()).map(([userId, sessionId]) => ({
        userId,
        sessionId,
      }));
    }
  
    /**
     * Checks if a user has an active session
     * @param userId - The unique identifier for the user
     * @returns boolean indicating if session exists
     */
    public hasActiveSession(userId: UserId): boolean {
      return this.sessionMap.has(userId);
    }
  
    /**
     * Gets the current size of the session map
     * @returns number of active sessions
     */
    public getSessionCount(): number {
      return this.sessionMap.size;
    }
  
    /**
     * Clears all sessions
     */
    public clearAllSessions(): void {
      this.sessionMap.clear();
      console.log("All sessions cleared");
    }
  
    /**
     * Gets a string representation of the current session map state
     * @returns string representation of the session map
     * @private
     */
    private getSessionMapState(): string {
      return JSON.stringify(Object.fromEntries(this.sessionMap), null, 2);
    }
  
  
  
  }
  
  const sessionManager = new SessionManager();
  
  Object.freeze(sessionManager);
  
  export default sessionManager;
  