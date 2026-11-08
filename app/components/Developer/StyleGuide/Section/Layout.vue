<script setup>
	import layoutConfig from '~/assets/layout/config.json';

	const containerDefault = (mode) => (layoutConfig.containerMode === mode ? ' (default)' : '');

	const containerProps = [
		{
			name: 'mode',
			options: ['contain', 'fluid', 'fluid-infinite'],
			notes: [
				`<code>contain</code> - width follows the current breakpoint${containerDefault('contain')}`,
				`<code>fluid</code> - grows up to the max container width${containerDefault('fluid')}`,
				`<code>fluid-infinite</code> - no max width; gutters and gaps stay in <code>vw</code>${containerDefault('fluid-infinite')}`,
			],
		},
	];

	const columnsProps = [
		{
			name: 'gapX',
			defaultValue: 'var(--columns-gap-x)',
			notes: [
				'<code>gapX</code> and <code>gapY</code> accept any CSS length - <code>px</code>, <code>vw</code>, <code>rem</code> etc.',
			],
		},
		{ name: 'gapY', defaultValue: 'var(--columns-gap-y)' },
	];

	const columnsNotes = ['<code>BlockColumn</code> - set width in CSS on a <code>class</code> added to the column.'];
</script>

<template>
	<div class="DeveloperStyleGuideSectionLayout">
		<div class="DeveloperStyleGuideSectionLayout__entry">
			<BlockContainer>
				<DeveloperStyleGuidePropsTable
					name="BlockContainer"
					:rows="containerProps"
				/>
			</BlockContainer>

			<div class="DeveloperStyleGuideSectionLayout__examples">
				<BlockContainer mode="contain">
					<div class="DeveloperStyleGuideSectionLayout__swatch">contain</div>
				</BlockContainer>

				<BlockContainer mode="fluid">
					<div class="DeveloperStyleGuideSectionLayout__swatch">fluid</div>
				</BlockContainer>

				<BlockContainer mode="fluid-infinite">
					<div class="DeveloperStyleGuideSectionLayout__swatch">fluid-infinite</div>
				</BlockContainer>
			</div>
		</div>

		<div class="DeveloperStyleGuideSectionLayout__entry">
			<BlockContainer>
				<DeveloperStyleGuidePropsTable
					:children="['BlockColumn']"
					name="BlockColumns"
					:notes="columnsNotes"
					:rows="columnsProps"
				/>

				<div class="DeveloperStyleGuideSectionLayout__examples">
					<BlockColumns>
						<BlockColumn style="width: 100%">
							<div class="DeveloperStyleGuideSectionLayout__swatch">100%</div>
						</BlockColumn>

						<BlockColumn style="width: 50%">
							<div class="DeveloperStyleGuideSectionLayout__swatch">50%</div>
						</BlockColumn>

						<BlockColumn style="width: 50%">
							<div class="DeveloperStyleGuideSectionLayout__swatch">50%</div>
						</BlockColumn>

						<BlockColumn
							v-for="n in 4"
							:key="n"
							style="width: 25%"
						>
							<div class="DeveloperStyleGuideSectionLayout__swatch">25%</div>
						</BlockColumn>

						<BlockColumn style="width: 66.666%">
							<div class="DeveloperStyleGuideSectionLayout__swatch">66%</div>
						</BlockColumn>

						<BlockColumn style="width: 33.333%">
							<div class="DeveloperStyleGuideSectionLayout__swatch">33%</div>
						</BlockColumn>
					</BlockColumns>
				</div>
			</BlockContainer>
		</div>
	</div>
</template>

<style>
	.DeveloperStyleGuideSectionLayout {
		&__entry {
			+ .DeveloperStyleGuideSectionLayout__entry {
				margin-top: var(--space-xl);
			}
		}

		&__examples {
			margin-top: var(--space-lg);

			.BlockContainer + .BlockContainer {
				margin-top: var(--space-md);
			}
		}

		&__swatch {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: var(--space-xl);
			background: rgba(var(--color-black-rgb), 0.1);
		}
	}
</style>
