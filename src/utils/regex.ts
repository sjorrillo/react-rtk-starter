
const IS_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/; // eslint-disable-line no-useless-escape

export const isUrl = (url) => IS_URL.test(url);
