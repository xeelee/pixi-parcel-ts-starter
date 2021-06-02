export class Adaptive {
  constructor(
    private view: HTMLCanvasElement
  ) {}

  resizeTo(target: Window): () => void {
    const resizeAuto = () => {
      if (target.innerWidth > target.innerHeight) {
        this.view.style.width = "auto";
        this.view.style.height = "100%";
      } else {
        this.view.style.width = "100%";
        this.view.style.height = "auto";
      }
    }

    resizeAuto();
    target.addEventListener("resize", resizeAuto);

    return () => {
      target.removeEventListener("reisze", resizeAuto);
    }
  }

  static window(view: HTMLCanvasElement): () => void {
    return new Adaptive(view).resizeTo(window);
  }
}
