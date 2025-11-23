const isDev = process.env.NODE_ENV === 'development';

export const REFRESH_TOKEN_OPTIONS = {
  httpOnly: true,
  secure: !isDev,
  sameSite: isDev ? ('lax' as const) : ('none' as const),
  path: '/',
  domain: isDev ? undefined : '.sylvain-nas.ovh',
};

export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
