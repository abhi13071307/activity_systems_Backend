type Bucket = Map<string, number>;

class AnalyticsWindow {
  private windowSizeSec: number;
  private buckets: Bucket[];
  private currentIndex = 0;

  constructor(windowSizeSec: number) {
    this.windowSizeSec = windowSizeSec;
    this.buckets = Array.from(
      { length: windowSizeSec },
      () => new Map()
    );

    setInterval(() => this.rotate(), 1000);
  }

  private rotate() {
    this.currentIndex = (this.currentIndex + 1) % this.windowSizeSec;
    this.buckets[this.currentIndex].clear();
  }

  increment(key: string) {
    const bucket = this.buckets[this.currentIndex];
    bucket.set(key, (bucket.get(key) || 0) + 1);
  }

  top(n = 100): { key: string; count: number }[] {
    const merged = new Map<string, number>();

    for (const b of this.buckets) {
      for (const [k, v] of b) {
        merged.set(k, (merged.get(k) || 0) + v);
      }
    }

    return [...merged.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([key, count]) => ({ key, count }));
  }
}

export const analytics1m = new AnalyticsWindow(60);
export const analytics5m = new AnalyticsWindow(300);
export const analytics1h = new AnalyticsWindow(3600);
