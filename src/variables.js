/**
 * /persons                  false
 * /person                   true
 * /person/                  false
 * /person/ASSD              true
 * /person/ASSD/ssdad        false
 * /person/ASSD/person/2swad false
 */
export const personUrlReqExp = /^\/(person$)|((?<=^\/person\/)\w+$)/;
