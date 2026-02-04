import { Response } from "express";

class NotificationHub {
  private clients: Map<number, Set<Response>> = new Map();

  addClient(userId: number, res: Response) {
    if (!this.clients.has(userId)) {
      this.clients.set(userId, new Set());
    }
    this.clients.get(userId)!.add(res);
  }

  removeClient(userId: number, res: Response) {
    this.clients.get(userId)?.delete(res);
  }

  push(userId: number, data: any) {
    const conns = this.clients.get(userId);
    if (!conns) return;

    for (const res of conns) {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  }
}

export const notificationHub = new NotificationHub();
