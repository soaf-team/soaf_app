import {
  Component,
  ComponentPropsWithoutRef,
  ErrorInfo,
  forwardRef,
  PropsWithChildren,
  PropsWithRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { isDifferentArray } from "utils";

export type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: () => void;
};

export type RenderFallbackType = <ErrorType extends Error>(
  props: RenderFallbackProps<ErrorType>
) => ReactNode;
type IgnoreErrorType = <ErrorType extends Error = Error>(
  error: ErrorType
) => boolean;

export type Props<ErrorType extends Error = Error> = {
  resetKeys?: unknown[];
  onReset?(): void;
  renderFallback: RenderFallbackType;
  onError?(error: ErrorType, info: ErrorInfo): void;
  ignoreError?: IgnoreErrorType;
};

export interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState: State = {
  error: null,
};

class BaseErrorBoundary extends Component<
  PropsWithRef<PropsWithChildren<Props>>,
  State
> {
  state = initialState;
  updatedWithError = false;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError, ignoreError } = this.props;

    if (ignoreError?.(error)) {
      throw error;
    }

    onError?.(error, info);
  }

  resetState() {
    this.updatedWithError = false;
    this.setState(initialState);
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.resetState();
  };

  componentDidUpdate(prevProps: Props) {
    const { error } = this.state;

    if (error == null) {
      return;
    }

    const { resetKeys } = this.props;

    if (!this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }

    if (isDifferentArray(prevProps.resetKeys, resetKeys)) {
      this.resetErrorBoundary();
    }
  }

  render() {
    const { children, renderFallback } = this.props;
    const { error } = this.state;

    if (error != null) {
      return renderFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}

export const ErrorBoundary = forwardRef<
  { reset(): void },
  ComponentPropsWithoutRef<typeof BaseErrorBoundary>
>((props, resetRef) => {
  const resetKeys = [...(props.resetKeys || [])];

  const ref = useRef<BaseErrorBoundary>(null);
  useImperativeHandle(resetRef, () => ({
    reset: () => ref.current?.resetErrorBoundary(),
  }));

  return <BaseErrorBoundary {...props} resetKeys={resetKeys} ref={ref} />;
});
if (process.env.NODE_ENV !== "production") {
  ErrorBoundary.displayName = "ErrorBoundary";
}

export const useErrorBoundary = <ErrorType extends Error>() => {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error != null) {
    throw error;
  }

  return setError;
};
