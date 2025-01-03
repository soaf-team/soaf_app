import React, { ErrorInfo, Suspense } from "react";
import { ErrorBoundary, RenderFallbackType } from "./ErrorBoundary";

type AsyncBoundaryProps = {
  errorFallback: RenderFallbackType;
  loadingFallback: React.ReactNode;
  children: React.ReactNode;
  resetKeys?: unknown[];
  onReset?(): void;
  onError?(error: Error, info: ErrorInfo): void;
  ignoreError?: (error: Error) => boolean;
};

export const AsyncBoundary = ({
  errorFallback,
  loadingFallback,
  children,
  resetKeys,
  onReset,
  onError,
  ignoreError,
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary
      renderFallback={errorFallback}
      resetKeys={resetKeys}
      onReset={onReset}
      onError={onError}
      ignoreError={ignoreError}
    >
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
