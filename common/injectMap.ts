export class InstanceMap {
  private readonly instanceMap: Map<string, any> = new Map();

  public setInstance(key: string, value: any): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }
  public getInstance(key: string): any {
    if (this.instanceMap.has(key)) return this.instanceMap.get(key);
    return null;
  }
}

export const instanceMap = new InstanceMap();
