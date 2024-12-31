// Simplified hook that always allows content generation
export function useTokenCheck() {
  return {
    hasTokens: () => true,
    canGenerateContent: () => true,
    tokensRemaining: Infinity
  };
}