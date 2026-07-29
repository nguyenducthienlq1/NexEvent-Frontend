import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from "react";

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Admin web runtime error", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="appError" role="alert">
          <section className="appErrorPanel">
            <p className="appErrorEyebrow">NexEvent Admin</p>
            <h1>Co loi xay ra</h1>
            <p>
              Vui long tai lai trang. Neu loi van tiep tuc, hay kiem tra token,
              backend va API.
            </p>
            <button type="button" onClick={() => window.location.reload()}>
              Tai lai
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
