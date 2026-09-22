const secretPatterns = [
  /\b(?:sk|pk)_(?:test|live)_[A-Za-z0-9_-]{8,}\b/i,
  /\bBearer\s+[A-Za-z0-9._~-]{18,}\b/i,
  /\b(?:webhook|signing)[_-]?(?:secret|key)\s*[:=]\s*[A-Za-z0-9+/=_-]{12,}\b/i,
];
export const containsSecret = (value:string) => secretPatterns.some((pattern)=>pattern.test(value));
export const sanitizeQuestion = (value:string) => containsSecret(value) ? "[redacted: secret-like value]" : value.replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g,"[email redacted]").slice(0,1000);
