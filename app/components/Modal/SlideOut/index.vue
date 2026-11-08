<script setup>
	defineOptions({
		inheritAttrs: false,
	});

	defineProps({
		direction: {
			default: 'ltr',
			type: String,
			validator: (value) => ['ltr', 'rtl'].includes(value),
		},
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
		modalAnimation = (await import('~/assets/animations/modal/slide-out/index.js')).animateModalSlideOut;
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

	const animateModalSlideOut = {
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
				@after-leave="animateModalSlideOut.afterLeave"
				@before-enter="animateModalSlideOut.beforeEnter"
				@enter="animateModalSlideOut.onEnter"
				@leave="animateModalSlideOut.onLeave"
			>
				<div
					v-if="isOpen"
					class="ModalSlideOut"
					:class="[attrs.class, `ModalSlideOut--direction-${direction}`]"
					:data-modal-direction="direction"
					role="dialog"
					aria-modal="true"
				>
					<PrimitiveButton
						label="Close Modal"
						class="ModalSlideOut__overlay"
						@click="emit('close-modal')"
					/>

					<div class="ModalSlideOut__container">
						<div class="ModalSlideOut__tray">
							<div class="ModalSlideOut__sections">
								<div class="ModalSlideOut__section ModalSlideOut__section--header">
									<PrimitiveButton
										label="Close Modal"
										class="ModalSlideOut__close-button"
										@click="emit('close-modal')"
									>
										<SVGIcon icon="close" />
									</PrimitiveButton>
								</div>

								<div class="ModalSlideOut__section ModalSlideOut__section--main">
									<div class="ModalSlideOut__main">
										<slot name="main" />
									</div>
								</div>

								<div class="ModalSlideOut__section ModalSlideOut__section--footer">
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
	.ModalSlideOut {
		--modal-tray-margin: 0;
		--modal-container-padding-left: 0;
		--modal-container-padding-right: var(--space-lg);
		--modal-scroll-bar-position: rtl;
		--modal-close-button-flex-direction: row;

		&--direction {
			&-ltr {
				--modal-tray-margin: 0;
				--modal-container-padding-left: 0;
				--modal-container-padding-right: var(--space-lg);
				--modal-close-button-flex-direction: row-reverse;
				--modal-scroll-bar-position: rtl;
			}

			&-rtl {
				--modal-tray-margin: auto;
				--modal-container-padding-left: var(--space-lg);
				--modal-container-padding-right: 0;
				--modal-close-button-flex-direction: row;
				--modal-scroll-bar-position: ltr;
			}
		}

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
		}

		&__container {
			width: 100%;
			height: 100%;
			padding-left: var(--modal-container-padding-left);
			padding-right: var(--modal-container-padding-right);
		}

		&__tray {
			position: relative;
			z-index: 20;
			width: 100%;
			height: 100%;
			max-width: 600px;
			margin-left: var(--modal-tray-margin);
			padding: 0;
			overflow-y: auto;
			background-color: var(--color-white);
			color: var(--color-black);
			direction: var(--modal-scroll-bar-position);
			-webkit-overflow-scrolling: touch;
			overscroll-behavior: none;
		}

		&__sections {
			position: relative;
			z-index: 0;
			display: flex;
			flex-direction: column;
			min-height: 100%;
			direction: ltr;
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
			flex-direction: var(--modal-close-button-flex-direction);
			align-items: center;
			justify-content: flex-end;
			gap: var(--space-sm);
			width: 100%;
			height: 100%;
			padding: var(--container-gutter);
		}
	}
</style>
