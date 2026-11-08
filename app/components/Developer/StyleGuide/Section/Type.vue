<script setup>
	const typeSize = (mobile, desktop) => ({ mobile, desktop });

	const rows = [
		{
			label: 'H1',
			previewClass: 'type-heading type-heading--h1',
			selectors: ['h1', 'type-heading type-heading--h1'],
			font: 'Roboto Bold',
			size: typeSize('2.5rem', '3.5rem'),
			lineHeight: typeSize('1.5', '1.25'),
			letterSpacing: '',
		},
		{
			label: 'H2',
			previewClass: 'type-heading type-heading--h2',
			selectors: ['h2', 'type-heading type-heading--h2'],
			font: 'Roboto Bold',
			size: typeSize('2rem', '2.5rem'),
			lineHeight: typeSize('1.5', '1.25'),
			letterSpacing: '',
		},
		{
			label: 'H3',
			previewClass: 'type-heading type-heading--h3',
			selectors: ['h3–h6', 'type-heading type-heading--h3'],
			font: 'Roboto Bold',
			size: typeSize('1.5rem', '1.75rem'),
			lineHeight: '1.25',
			letterSpacing: '',
		},
		{
			label: 'Body',
			previewClass: 'type-body',
			selectors: ['p', 'type-body'],
			font: 'Nunito',
			size: '1rem',
			lineHeight: '1.65',
			letterSpacing: '',
		},
		{
			label: 'UI',
			previewClass: 'type-ui',
			selectors: ['type-ui'],
			font: 'Roboto',
			size: '1rem',
			lineHeight: '1.25',
			letterSpacing: '0.05em',
		},
	];
</script>

<template>
	<BlockContainer class="DeveloperStyleGuideSectionType">
		<p class="DeveloperStyleGuideSectionType__note">
			Base size
			<code>--font-size-base</code>
			is
			<code>13px</code>
			/
			<code>15px</code>
			desktop. Families:
			<code>--font-family-primary</code>,
			<code>--font-family-primary-bold</code>,
			<code>--font-family-secondary</code>.
		</p>

		<DeveloperStyleGuideTable>
			<thead>
				<tr>
					<th>Name</th>

					<th>Selectors</th>

					<th>Font</th>

					<th>Size</th>

					<th>Line height</th>

					<th>Letter spacing</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="row in rows"
					:key="row.label"
				>
					<td>
						<span :class="row.previewClass">{{ row.label }}</span>
					</td>

					<td class="DeveloperStyleGuideSectionType__selectors">
						<template
							v-for="(selector, index) in row.selectors"
							:key="selector"
						>
							<code>{{ selector }}</code>

							<template v-if="index < row.selectors.length - 1">, </template>
						</template>
					</td>

					<td>{{ row.font }}</td>

					<td>
						<template v-if="typeof row.size === 'string'">{{ row.size }}</template>

						<template v-else>
							<strong>Mobile:</strong>

							{{ row.size.mobile }}<br />

							<strong>Desktop:</strong>
							{{ row.size.desktop }}
						</template>
					</td>

					<td>
						<template v-if="typeof row.lineHeight === 'string'">{{ row.lineHeight }}</template>

						<template v-else>
							<strong>Mobile:</strong>

							{{ row.lineHeight.mobile }}<br />

							<strong>Desktop:</strong>
							{{ row.lineHeight.desktop }}
						</template>
					</td>

					<td>{{ row.letterSpacing }}</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>
	</BlockContainer>
</template>

<style>
	.DeveloperStyleGuideSectionType {
		&__note {
			margin-bottom: var(--space-md);

			code {
				margin-right: var(--space-xs);
			}
		}
	}
</style>
