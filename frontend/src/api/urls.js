const urlBase = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/v1/`;

export const urlListItem = `${urlBase}items`;
export const urlCreateItem = `${urlBase}values`;
export const urlLogin = `${urlBase}auth/token`;
export const urlUserRegister = `${urlBase}users`;
