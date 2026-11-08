<script setup>
	defineOptions({
		inheritAttrs: false,
	});

	defineProps({
		isOpen: {
			default: false,
			type: Boolean,
		},
	});

	const attrs = useAttrs();
	const emit = defineEmits(['close-modal', 'modal-opening', 'modal-opened', 'modal-closing', 'modal-closed']);

	let modalAnimation = null;
	let modalElement = null;

	onMounted(async () => {
		modalAnimation = (await import('~/assets/animations/modal/overlay/index.js')).animateModalOverlay;
	});

	onUnmounted(() => {
		if (modalAnimation && modalElement) modalAnimation.cleanup(modalElement);
	});

	const modalAnimationCallbacks = {
		afterEnter: () => emit('modal-opened'),
		afterLeave: () => emit('modal-closed'),
		onEnter: () => emit('modal-opening'),
		onLeave: () => emit('modal-closing'),
	};

	const animateModalOverlay = {
		afterLeave: (el) => {
			modalElement = el;
			modalAnimation?.cleanup(el);
		},
		beforeEnter: (el) => {
			modalElement = el;
			modalAnimation?.beforeEnter(el);
		},
		onEnter: (el, done) => {
			modalElement = el;

			if (!modalAnimation) {
				modalAnimationCallbacks.onEnter();
				modalAnimationCallbacks.afterEnter();
				return done();
			}

			modalAnimation.onEnter(el, done, modalAnimationCallbacks);
		},
		onLeave: (el, done) => {
			modalElement = el;

			if (!modalAnimation) {
				modalAnimationCallbacks.onLeave();
				modalAnimationCallbacks.afterLeave();
				return done();
			}

			modalAnimation.onLeave(el, done, modalAnimationCallbacks);
		},
	};
</script>

<template>
	<ClientOnly>
		<Teleport to="#layout-overlay">
			<Transition
				:css="false"
				@after-leave="animateModalOverlay.afterLeave"
				@before-enter="animateModalOverlay.beforeEnter"
				@enter="animateModalOverlay.onEnter"
				@leave="animateModalOverlay.onLeave"
			>
				<div
					v-if="isOpen"
					class="ModalOverlay"
					:class="attrs.class"
					role="dialog"
					aria-modal="true"
				>
					<PrimitiveButton
						label="Close Modal"
						class="ModalOverlay__overlay"
						@click="emit('close-modal')"
					/>

					<div class="ModalOverlay__container">
						<div class="ModalOverlay__tray">
							<div class="ModalOverlay__sections">
								<div class="ModalOverlay__section ModalOverlay__section--header">
									<PrimitiveButton
										label="Close Modal"
										class="ModalOverlay__close-button"
										@click="emit('close-modal')"
									>
										<SVGIcon icon="close" />
									</PrimitiveButton>
								</div>

								<div class="ModalOverlay__section ModalOverlay__section--main">
									<div class="ModalOverlay__main">
										<slot name="main" />
									</div>
								</div>

								<div class="ModalOverlay__section ModalOverlay__section--footer">
									<slot name="footer" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</Teleport>
	</ClientOnly>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.ModalOverlay {
		position: fixed;
		z-index: 0;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		height: 100dvh;

		&__overlay {
			position: absolute;
			z-index: 10;
			inset: 0;
			background-color: rgba(var(--color-black-rgb), 0.5);
			backdrop-filter: blur(5px);
			transform: translate3d(0, 0, 0);
			backface-visibility: hidden;
			transform-style: preserve-3d;
			will-change: opacity;
		}

		&__container {
			position: relative;
			z-index: 20;
			width: calc(100% - var(--container-gutter) * 2);
			max-width: var(--content-width-max);
			height: 100%;
			padding: var(--container-gutter) 0;
		}

		&__tray {
			position: relative;
			width: 100%;
			height: 100%;
			overflow-y: auto;
			background-color: var(--color-white);
			color: var(--color-black);
			-webkit-overflow-scrolling: touch;
			overscroll-behavior: none;
			transform: translate3d(0, 0, 0);
			backface-visibility: hidden;
			transform-style: preserve-3d;
			will-change: transform;
		}

		&__sections {
			position: relative;
			z-index: 0;
			display: flex;
			flex-direction: column;
			min-height: 100%;
		}

		&__section {
			&--header,
			&--footer {
				position: sticky;
				z-index: 20;
				display: flex;
				align-items: center;
				width: 100%;
			}

			&--header {
				top: 0;
				height: var(--core-header-height);
			}

			&--main {
				position: relative;
				z-index: 10;
				display: flex;
				flex-grow: 1;
				width: 100%;
			}

			&--footer {
				bottom: 0;
				height: var(--core-header-height);
			}
		}

		&__main {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			width: 100%;
		}

		&__close-button {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: var(--space-sm);
			width: 100%;
			height: 100%;
			padding: var(--container-gutter);
		}
	}
</style>
