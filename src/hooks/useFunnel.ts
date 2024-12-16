import { useCallback, useRef, ReactElement, ReactNode, useState } from 'react';

type FunnelComponent<T> = (props: {
  name: T;
  children: ReactElement | null;
}) => ReactElement | null;

type FunnelProps = {
  children: ReactNode;
};

type FunnelComponentType = {
  (props: FunnelProps): ReactElement | null;
  Step: FunnelComponent<any>;
};

type StepHistory<T> = {
  step: T;
  index: number;
};

type FunnelState<T> = {
  currentStep: T;
  history: StepHistory<T>[];
  currentIndex: number;
};

export function useFunnel<T extends string>(steps: readonly T[]) {
  const stepsRef = useRef(steps);
  const [state, setState] = useState<FunnelState<T>>({
    currentStep: steps[0],
    history: [{ step: steps[0], index: 0 }],
    currentIndex: 0,
  });

  const internalStateRef = useRef(state);
  internalStateRef.current = state;

  const setStep = useCallback((step: T) => {
    setState((prev) => {
      const newState = {
        currentStep: step,
        history: [...prev.history, { step, index: prev.history.length }],
        currentIndex: prev.currentIndex + 1,
      };
      return newState;
    });
  }, []);

  const nextStep = useCallback(() => {
    const currentIndex = stepsRef.current.indexOf(state.currentStep);
    if (currentIndex < stepsRef.current.length - 1) {
      const nextStep = stepsRef.current[currentIndex + 1];
      setStep(nextStep);
    }
  }, [state.currentStep, setStep]);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex > 0) {
        const newHistory = prev.history.slice(0, prev.currentIndex);
        const prevState = newHistory[newHistory.length - 1];

        return {
          currentStep: prevState.step,
          history: newHistory,
          currentIndex: newHistory.length - 1,
        };
      }
      return prev;
    });
  }, []);

  const goToStep = useCallback(
    (step: T) => {
      if (stepsRef.current.includes(step)) {
        setStep(step);
      }
    },
    [setStep]
  );

  const Funnel = useCallback(({ children }: FunnelProps) => {
    return children;
  }, []) as FunnelComponentType;

  Funnel.Step = useCallback(
    ({ name, children }: { name: T; children: ReactElement | null }) => {
      return internalStateRef.current.currentStep === name ? children : null;
    },
    []
  );

  return {
    Funnel,
    currentStep: state.currentStep,
    setStep: goToStep,
    nextStep,
    prevStep,
    isFirst: stepsRef.current.indexOf(state.currentStep) === 0,
    isLast:
      stepsRef.current.indexOf(state.currentStep) ===
      stepsRef.current.length - 1,
  };
}
