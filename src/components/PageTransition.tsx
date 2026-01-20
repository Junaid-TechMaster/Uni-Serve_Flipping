import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

export default function PageTransition({ children, pageKey }: PageTransitionProps) {
  const [displayed, setDisplayed] = useState(children);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    setFadeState('out');

    const timeout = setTimeout(() => {
      setDisplayed(children);
      setFadeState('in');
    }, 200);

    return () => clearTimeout(timeout);
  }, [pageKey, children]);

  return (
    <div
      className={`transition-all duration-300 ease-out
        ${fadeState === 'in'
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
        }
      `}
    >
      {displayed}
    </div>
  );
}
