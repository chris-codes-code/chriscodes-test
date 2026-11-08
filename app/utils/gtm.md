# GTM

Set `GTM_ID` and accept cookies — then the client plugin loads the container. Push events with `useGtm()`. Nothing loads if the ID is empty, or if the visitor has not accepted cookies.

Clicks go through the `gtm` prop on `PrimitiveButton` and `PrimitiveLink`. Page views fire from `[...page].vue` (and again right after Accept). Form results fire from `FormHandler`.

## Summary

- **`GTM_ID`** — public env; omit locally to skip GTM
- **Cookie consent** — GTM only loads after Accept (`cookie_consent=accepted`)
- **`useGtm()`** — `trackPageView`, `trackClick`, `trackSubmission`, `trackEvent` (gated on consent)
- **`gtm` prop** — click payload on Button and Link
- **`click_id`** — optional conversion tag from label / URL

## Consent

`useCookieConsent()` stores `accepted` or `essential` for a year. The banner is `CoreCookies` in the default layout (teleported into `#layout-overlay`).

| Choice   | Cookie value | GTM                          |
| -------- | ------------ | ---------------------------- |
| Accept   | `accepted`   | Loads (when `GTM_ID` is set) |
| Decline  | `essential`  | Does not load                |
| No choice yet | *(none)* | Banner shows after a short delay |

Clear `cookie_consent` in DevTools to test the banner again.

## How to use

`type` is `link` or `button`. `category` is `internal` / `external` for links, or something like `open_form` for a button. No `gtm` prop means no click event.

```vue
<PrimitiveLink
	url="/contact"
	:gtm="{
		type: 'link',
		category: 'internal',
		label: 'Contact',
		clicked_from: 'site-navigation',
		url: '/contact',
	}"
>
	Contact
</PrimitiveLink>

<PrimitiveLink
	type="external"
	url="https://example.com"
	:gtm="{
		type: 'link',
		category: 'external',
		label: 'Example',
		clicked_from: 'footer',
		url: 'https://example.com',
	}"
>
	Example
</PrimitiveLink>

<PrimitiveButton
	:gtm="{
		type: 'button',
		category: 'open_form',
		label: 'contact',
		clicked_from: 'hero',
	}"
	@click="openForm"
>
	Enquire
</PrimitiveButton>
```

For a form:

```vue
<FormHandler
	:form="form"
	form-location="footer"
/>
```

Submit always fires `trackSubmission` (when consented). `form_name` comes from `form.name`. Status is `success` or `error`. `form_location` is optional.

Phone and email links from content can use `telLinkModel` / `mailtoLinkModel` in `modules/content/models/snippets/` — they produce normal link objects (including GTM), and `click_id` maps `tel:` / `mailto:` to `phone` / `email`.

## Events

Pushes go to `window.dataLayer`. They no-op on the server, when consent is missing, and when GTM has not loaded.

### `page_view`

```js
trackPageView(path, title);
```

| Field        | Source      |
| ------------ | ----------- |
| `event`      | `page_view` |
| `page_path`  | route path  |
| `page_title` | SEO title   |

### `click`

```js
trackClick({ clicked_from, type, category, label, url });
```

| Field            | Notes                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| `event`          | `click`                                                                |
| `click_type`     | e.g. `link`, `button`                                                  |
| `click_category` | `internal` / `external` (links), `open_form` (and similar) for buttons |
| `click_label`    | Name for the click                                                     |
| `clicked_from`   | Where it was (nav, card, form)                                         |
| `click_url`      | URL if there is one                                                    |
| `click_id`       | Only for conversion-style clicks — see below                           |

### `form_submit`

```js
trackSubmission({ form_name, form_location, status });
```

| Field                    | Notes                                  |
| ------------------------ | -------------------------------------- |
| `event`                  | `form_submit`                          |
| `form_name`              | From `form.name`                       |
| `form_location`          | Optional, from the `formLocation` prop |
| `form_submission_status` | `success` or `error`                   |

`trackEvent(payload)` pushes any object if you need something else.

### `click_id`

`getClickId` in `gtm-click-id.js` adds a stable id for GTM / GA4 triggers. Ordinary nav clicks get no `click_id`.

| Rule                      | `click_id`          |
| ------------------------- | ------------------- |
| `category` is `open_form` | `open_enquiry_form` |
| `mailto:` URL             | `email`             |
| `tel:` URL                | `phone`             |
| URL path ends in `.pdf`   | `download_pdf`      |

Add project rules in that file.

## What’s here

- `app/composables/useCookieConsent.js` — consent cookie + banner state
- `app/components/Core/Cookies.vue` — banner UI
- `app/plugins/gtm.client.js` — loads the container after accept
- `app/utils/gtm.js` — script + noscript inject
- `app/composables/useGtm.js` — event helpers (consent-gated)
- `app/utils/gtm-click-id.js` — conversion `click_id` map
- `modules/content/models/snippets/gtm.js` — click payload from CMS links
- `modules/content/models/snippets/tel-link.js` / `mailto-link.js` — phone / email → link objects
