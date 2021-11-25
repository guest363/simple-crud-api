/**
 * /persons                                                 false
 * /person                                                  true
 * /person/                                                 false
 * /person/fa772993-234b-42ad-b594-379c84dd4ed2             true
 * /person/ASSD/ssdad                                       false
 * /person/ASSD/person/2swad                                false
 */
export const personUrlReqExp = /^\/(person$)|((?<=^\/person\/)[\w-]+$)/;

export const isUUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
