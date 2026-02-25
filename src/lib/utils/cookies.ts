import Cookies from 'js-cookie';

export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  Cookies.set(name, value, {
    secure: true,
    sameSite: 'strict',
    expires: 1, // Default to 24 hours (1 day)
    ...options,
  });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
