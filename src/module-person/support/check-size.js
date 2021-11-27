/**
 * Ограничивает размер body
 */
export const checkSize = (res, req, data) => {
  if (data.length > 1e6) {
    data.length = 0;
    res.writeHead(413, { "Content-Type": "text/plain" }).end('To big body size');
  }
};
