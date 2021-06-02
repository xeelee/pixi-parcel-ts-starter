export class Key {
  private static instances: { [index: string]: Key} = {};

  private constructor(
    private key: string
  ) {}

  static get(key: string): Key {
    if (!Key.instances[key]) {
      Key.instances[key] = new Key(key);
    }
    return Key.instances[key];
  }

  press(cb: () => any): () => void {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === this.key) { event.preventDefault(); cb(); }
    })
    return () => { window.removeEventListener("keydown", cb); }
  }
}
