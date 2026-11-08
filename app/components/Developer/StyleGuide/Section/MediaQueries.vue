<script setup>
	import layoutConfig from '~/assets/layout/config.json';

	const primary = layoutConfig.screens.map((screen) => {
		const key = screen.name.primary;
		const hasMax = screen.max !== null;

		return {
			name: key,
			token: `--screen-${key}`,
			min: `--screen-${key}-min`,
			max: hasMax ? `--screen-${key}-max` : null,
			value: hasMax ? `${screen.min}px > ${screen.max}px` : `${screen.min}px > max`,
		};
	});

	const secondary = layoutConfig.screens
		.reduce((groups, screen) => {
			const name = screen.name.secondary;
			if (!name) return groups;

			const current = groups[groups.length - 1];

			if (current?.name === name) {
				current.max = screen.max;
				return groups;
			}

			groups.push({
				name,
				token: `--screen-${name}`,
				min: screen.min,
				max: screen.max,
			});

			return groups;
		}, [])
		.map((group) => ({
			name: group.name,
			token: group.token,
			value: group.max !== undefined && group.max !== null ? `${group.min}px > ${group.max}px` : `${group.min}px > max`,
		}));
</script>

<template>
	<BlockContainer class="DeveloperStyleGuideSectionMediaQueries">
		<DeveloperStyleGuideTable>
			<thead>
				<tr>
					<th>Name</th>

					<th>CSS variable</th>

					<th>Viewport</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td colspan="3"><strong>Primary</strong></td>
				</tr>

				<tr
					v-for="screen in primary"
					:key="screen.token"
				>
					<td>{{ screen.name }}</td>

					<td class="DeveloperStyleGuideSectionMediaQueries__tokens">
						<code>{{ screen.token }}</code>

						<template v-if="screen.max">
							<br />

							<code>{{ screen.min }}</code>

							<br />

							<code>{{ screen.max }}</code>
						</template>
					</td>

					<td>{{ screen.value }}</td>
				</tr>

				<tr>
					<td colspan="3"><strong>Secondary</strong></td>
				</tr>

				<tr
					v-for="screen in secondary"
					:key="screen.token"
				>
					<td>{{ screen.name }}</td>

					<td>
						<code>{{ screen.token }}</code>
					</td>

					<td>{{ screen.value }}</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>
	</BlockContainer>
</template>
