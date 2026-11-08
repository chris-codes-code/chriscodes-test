# Forms

Pass a `form` object into `FormHandler`. It renders fieldsets, validates on submit, optionally runs Turnstile, then POSTs. Helpers live in `app/utils/form/` — keep validation out of the Vue files.

`UIFormExample` is a working example.

## Summary

- **`form` object** — id, name, fieldsets, submit copy (and optional footnote)
- **`FormHandler`** — owns submit, status, and the API call
- **`Form`** — fieldsets, honeypot, Turnstile, submit button
- **`utils/form`** — clone fieldsets, validate, format values

## How to use

```vue
<template>
	<FormHandler :form="form" />
</template>

<script setup>
	const form = {
		id: 'contact',
		name: 'Contact',
		fieldsets: [
			{
				legend: null,
				inputs: [{ label: 'Email', name: 'email', required: true, type: 'email' }],
			},
		],
		submit: {
			cta: 'Submit',
			success: { message: 'Sent.', resetText: 'Send another' },
			error: { message: 'Try again.', resetText: 'Retry' },
		},
	};
</script>
```

`isFormConfigValid` checks `id`, `name`, `fieldsets`, and the submit strings. `FormHandler` warns in the console if the object is wrong.

## The `form` object

| Field            | Required | Notes                         |
| ---------------- | -------- | ----------------------------- |
| `id`             | yes      | Sent as `form_id` on POST     |
| `name`           | yes      | Used for GTM and labels       |
| `fieldsets`      | yes      | Array of `{ legend, inputs }` |
| `footnote`       | no       | HTML/text under the fields    |
| `submit.cta`     | yes      | Button label                  |
| `submit.success` | yes      | `message` and `resetText`     |
| `submit.error`   | yes      | `message` and `resetText`     |

### Inputs

Each input needs `name`, `type`, and `label`. Common extras: `required`, `placeholder`, `width` (`full` or `half`), `options` (select / checkbox group), `text` and `description` (consent).

Types:

- `text`, `email`, `tel` — text field (`email` / `tel` are validated)
- `date` — date field (`YYYY-MM-DD`)
- `textarea`
- `select` — needs `options: [{ label, value, disabled? }]`
- `checkbox` — one box, or a group if `options` is set
- `consent` — checkbox plus optional HTML `description`

A honeypot field named `extension` is added automatically. It must stay empty.

## Validation

Nothing is validated until the first submit. After that, each change re-validates that field.

- **Required** — empty string, empty checkbox group, or unchecked consent
- **email** / **tel** / **date** — `validator` when the field has a value
- **Honeypot** — error if `extension` has a value

`validateForm` writes `errorMessage` onto each input. `isFormValid` is true when none have an error. Submit is blocked until then.

## Submit

1. First click runs validation. Invalid fields show errors; submit stops.
2. If Turnstile is on, `getToken()` runs. No token means submit stops.
3. `FormHandler` POSTs to `${API_URL}/${DEFAULT_LOCALE}/api/form` with `{ form: { data, form_id }, turnstileToken? }`.
4. `status` is `success` or `error`. Reset copy on those notices clears the form after success.

Swap the `mockFetch` in `FormHandler` for a real `$fetch` when the API route exists.

Submit always fires `trackSubmission` with the form name and status. Pass `formLocation` when you want that on the event too.

## Turnstile

Optional. Set `CLOUDFLARE_TURNSTILE_SITE_KEY` and restart `yarn dev`. Allowlist the hostname in Cloudflare (including `localhost`).

The widget is interaction-only. On submit it executes and returns `turnstileToken`. The **API** must verify that token with `CLOUDFLARE_TURNSTILE_SECRET_KEY`. The widget alone is not enough.

With no site key, the widget is not rendered and only the honeypot runs.

## What’s here

- `Handler.vue` — submit, status, API call
- `index.vue` — fieldsets, validation, Turnstile, submit emit
- `Input/` — one component per input type
- `Submit.vue` — button plus success / error notices
- `Turnstile.vue` — widget; `getToken` / `reset`
- `~/utils/form/` — config, validation, format, honeypot name
