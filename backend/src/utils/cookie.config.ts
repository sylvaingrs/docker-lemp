export const REFRESH_TOKEN_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
