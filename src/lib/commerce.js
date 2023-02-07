import Commerce from "@chec/commerce.js";

// Create new Commerce Store, with public key and 'true'(indicates we're creating new store)
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true); 