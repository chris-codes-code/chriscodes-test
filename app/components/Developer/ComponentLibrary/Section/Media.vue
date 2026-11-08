<script setup>
	const primitiveImageProps = [
		{ name: 'src', required: true },
		{ name: 'width', required: true },
		{ name: 'height', required: true },
		{ name: 'alt', required: true },
		{ name: 'fit', defaultValue: 'cover', options: ['cover', 'contain'] },
		{ name: 'sizes' },
		{ name: 'loading', defaultValue: 'lazy', options: ['lazy', 'eager'] },
		{ name: 'decoding', defaultValue: 'auto', options: ['async', 'auto', 'sync'] },
		{
			name: 'fetchpriority',
			defaultValue: 'auto',
			options: ['auto', 'high', 'low'],
		},
		{ name: 'objectPosition', defaultValue: '50% 50%' },
		{ name: 'preload', defaultValue: 'false', options: ['true', 'false'] },
	];

	const mediaImageLazyProps = [
		{ name: 'fit', defaultValue: 'cover', options: ['cover', 'contain'] },
		{ name: 'width', required: true },
		{ name: 'height', required: true },
		{ name: 'rootMargin', defaultValue: '100px' },
	];

	const primitiveVideoProps = [
		{ name: 'src', required: true },
		{ name: 'autoplay', defaultValue: 'true', options: ['true', 'false'] },
		{ name: 'muted', defaultValue: 'true', options: ['true', 'false'] },
		{ name: 'loop', defaultValue: 'true', options: ['true', 'false'] },
		{ name: 'playsinline', defaultValue: 'true', options: ['true', 'false'] },
		{ name: 'poster' },
		{ name: 'preload', defaultValue: 'none', options: ['auto', 'metadata', 'none'] },
	];

	const mediaVideoLazyProps = [
		{ name: 'eager', defaultValue: 'false', options: ['true', 'false'] },
		{ name: 'width', required: true },
		{ name: 'height', required: true },
		{ name: 'rootMargin', defaultValue: '100px' },
	];

	const demoImage = {
		alt: 'Component Library Demo Image',
		height: 1350,
		sizes: '400px sm:800px md:1200px',
		src: 'https://placehold.co/2400x1350/jpg',
		width: 2400,
	};

	const demoVideoSrc = 'https://placeholdervideo.dev/1600x900';
</script>

<template>
	<BlockContainer class="DeveloperComponentLibrarySectionMedia">
		<div class="DeveloperComponentLibrarySectionMedia__entry">
			<DeveloperStyleGuideColumns>
				<BlockColumn>
					<DeveloperStyleGuidePropsTable
						name="PrimitiveImage"
						:rows="primitiveImageProps"
					/>

					<div class="DeveloperComponentLibrarySectionMedia__example">
						<PrimitiveImage
							class="DeveloperComponentLibrarySectionMedia__frame"
							v-bind="demoImage"
						/>
					</div>
				</BlockColumn>

				<BlockColumn>
					<DeveloperStyleGuidePropsTable
						also-accepts="PrimitiveImage"
						name="MediaImageLazy"
						:rows="mediaImageLazyProps"
					/>

					<div class="DeveloperComponentLibrarySectionMedia__example">
						<MediaImageLazy v-bind="demoImage" />
					</div>
				</BlockColumn>
			</DeveloperStyleGuideColumns>
		</div>

		<div class="DeveloperComponentLibrarySectionMedia__entry">
			<DeveloperStyleGuideColumns>
				<BlockColumn>
					<DeveloperStyleGuidePropsTable
						name="PrimitiveVideo"
						:rows="primitiveVideoProps"
					/>

					<div class="DeveloperComponentLibrarySectionMedia__example">
						<div
							class="DeveloperComponentLibrarySectionMedia__frame"
							:style="{ aspectRatio: '16 / 9' }"
						>
							<PrimitiveVideo :src="demoVideoSrc" />
						</div>
					</div>
				</BlockColumn>

				<BlockColumn>
					<DeveloperStyleGuidePropsTable
						also-accepts="PrimitiveVideo"
						name="MediaVideoLazy"
						:rows="mediaVideoLazyProps"
					/>

					<div class="DeveloperComponentLibrarySectionMedia__example">
						<MediaVideoLazy
							:height="demoImage.height"
							:src="demoVideoSrc"
							:width="demoImage.width"
						/>
					</div>
				</BlockColumn>
			</DeveloperStyleGuideColumns>
		</div>
	</BlockContainer>
</template>

<style>
	.DeveloperComponentLibrarySectionMedia {
		&__entry {
			+ .DeveloperComponentLibrarySectionMedia__entry {
				margin-top: var(--space-xl);
			}
		}

		&__example {
			margin-top: var(--space-lg);
		}

		&__frame {
			position: relative;
			width: 100%;
			height: auto;
		}
	}
</style>
