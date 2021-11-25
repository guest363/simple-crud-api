/**
 * /persons                                                 false
 * /person                                                  true
 * /person/                                                 false
 * /person/fa772993-234b-42ad-b594-379c84dd4ed2             true
 * /person/ASSD/ssdad                                       false
 * /person/ASSD/person/2swad                                false
 */
export const personUrlReqExp = /^\/(person$)|((?<=^\/person\/)[\w-]+$)/;
