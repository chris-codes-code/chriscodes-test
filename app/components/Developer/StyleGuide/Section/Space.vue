<script setup>
	const spaces = [
		{ token: '--space-xs', value: '5px' },
		{ token: '--space-sm', value: '10px' },
		{ token: '--space-md', value: '20px' },
		{ token: '--space-lg', value: '40px' },
		{ token: '--space-xl', value: '80px' },
		{ token: '--space-xxl', value: '160px' },
		{ token: '--space-xxxl', value: '320px' },
	];
</script>

<template>
	<BlockContainer class="DeveloperStyleGuideSectionSpace">
		<DeveloperStyleGuideTable>
			<thead>
				<tr>
					<th>CSS variable</th>

					<th>Value</th>

					<th>Preview</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="space in spaces"
					:key="space.token"
				>
					<td>
						<code>{{ space.token }}</code>
					</td>

					<td>{{ space.value }}</td>

					<td class="DeveloperStyleGuideSectionSpace__preview">
						<span
							class="DeveloperStyleGuideSectionSpace__bar"
							:style="{ width: `var(${space.token})` }"
						/>
					</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>
	</BlockContainer>
</template>

<style>
	.DeveloperStyleGuideSectionSpace {
		&__preview {
			vertical-align: middle;
		}

		&__bar {
			display: block;
			height: 3px;
			background: currentColor;
		}
	}
</style>
