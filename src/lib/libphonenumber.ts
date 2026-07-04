import type { MetadataJson } from "libphonenumber-js/core";
import { formatIncompletePhoneNumber as _formatIncompletePhoneNumber } from "libphonenumber-js/core";

import metadataJson from "@/assets/libphonenumber.metadata.json";

const metadata = metadataJson as MetadataJson;

/**
 * Formats an incomplete phone number string according to the metadata provided.
 *
 * Uses `libphonenumber-js`'s `formatIncompletePhoneNumber` function with custom metadata.
 * Falls back to manual formatting for country codes not in the metadata (e.g. India +91).
 *
 * @param phone - The phone number string to format (may be incomplete).
 * @returns The formatted phone number string.
 *
 * @remarks
 * - Only Viet Nam (VN) metadata is included by default. To add more countries, update and run the `generate-libphonenumber-metadata` script in `package.json`.
 * - This function is useful for formatting user input as they type a phone number.
 *
 * @see https://www.npmjs.com/package/libphonenumber-js#customizing-metadata
 */
export function formatIncompletePhoneNumber(phone: string) {
  // Fallback: manually format Indian numbers (+91 XXXXX XXXXX)
  if (phone.startsWith("+91")) {
    const digits = phone.slice(3).replace(/\D/g, "");
    if (digits.length <= 5) return `+91 ${digits}`;
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5, 10)}`.trim();
  }

  return _formatIncompletePhoneNumber(phone, metadata);
}

