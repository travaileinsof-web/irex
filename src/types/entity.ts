/**
 * Shared base type for generic admin CRUD pages.
 *
 * Why this exists: admin pages use `useCrud<T>` with a loose record type so the
 * same table/form scaffolding works for every entity (products, blog, faq, ...).
 * Previously this was typed as `{ [key: string]: unknown }`, which made every
 * field access `unknown` and broke rendering (`unknown` is not a `ReactNode`)
 * as well as input `value` props (`unknown` is not `string | number`).
 *
 * The index signature covers the scalar shapes actually stored in the DB
 * (text, numbers, booleans for flags like `published`). Form `<input value>`
 * reads use the `inputValue()` helper to coerce to `string`; `checked` reads
 * use `as boolean`. This keeps the generic pages type-checking cleanly.
 */
export interface Entity {
  id: string;
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Coerce an entity field value into a valid string for a controlled
 * `<input value={...}>`. Handles null/undefined/boolean safely.
 */
export function inputValue(v: string | number | boolean | null | undefined): string {
  if (v === null || v === undefined || v === false) return "";
  if (v === true) return "true";
  return String(v);
}
