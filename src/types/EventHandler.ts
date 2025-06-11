interface IEventHandler<T> {
  addListener(listener : (event :T) => any) : void;

  removeListener(listener : (event : T) => any) : void;
}

class EventHandler<T> implements IEventHandler<T> {
  private listeners : Array<Function> = [];

  public addListener(listener : (event :T) => any) {
    this.removeListener(listener);
    this.listeners.push(listener);
  }

  public removeListener(listener : (event : T) => any) {
    if (!this.listeners.includes(listener)) return;
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  public dispatch(event :T) {
    this.listeners.forEach(l => l(event));
  }
}

export { EventHandler };
export default IEventHandler;