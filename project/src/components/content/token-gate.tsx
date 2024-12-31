import React from 'react';

interface TokenGateProps {
  children: React.ReactNode;
}

// Simplified TokenGate that just renders children without restrictions
export function TokenGate({ children }: TokenGateProps) {
  return <>{children}</>;
}