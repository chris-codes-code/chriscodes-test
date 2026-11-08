<script setup>
	const props = defineProps({
		alsoAccepts: {
			default: null,
			type: String,
		},
		children: {
			default: null,
			type: Array,
		},
		name: {
			required: true,
			type: String,
		},
		notes: {
			default: () => [],
			type: Array,
		},
		rows: {
			default: () => [],
			type: Array,
		},
	});

	const heading = computed(() => (props.children?.length ? `${props.name} / ${props.children[0]}` : props.name));

	const hasExamples = computed(() => props.rows.some((row) => row.example));
	const hasRowNotes = computed(() => props.rows.some((row) => row.notes?.length));
	const hasFooterNotes = computed(() => props.alsoAccepts || props.notes.length);

	const propNotes = (prop) => {
		if (!prop.notes?.length) return [];
		return Array.isArray(prop.notes) ? prop.notes : [prop.notes];
	};
</script>

<template>
	<div class="DeveloperStyleGuidePropsTable">
		<h3 class="DeveloperStyleGuidePropsTable__heading">{{ heading }}</h3>

		<DeveloperStyleGuideComponentName
			class="DeveloperStyleGuidePropsTable__code"
			:children="children"
			:name="name"
		/>

		<DeveloperStyleGuideTable v-if="rows.length">
			<thead>
				<tr>
					<th>Prop</th>

					<th>Required</th>

					<th>Default</th>

					<th>Options</th>

					<th v-if="hasExamples">Example</th>

					<th v-if="hasRowNotes">Notes</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="prop in rows"
					:key="prop.name"
				>
					<td>
						<code>{{ prop.name }}</code>
					</td>

					<td>{{ prop.required ? 'Yes' : '' }}</td>

					<td>
						<code v-if="prop.defaultValue !== undefined && prop.defaultValue !== null">
							{{ prop.defaultValue }}
						</code>
					</td>

					<td>
						<template
							v-for="(option, index) in prop.options"
							:key="option"
						>
							<code>{{ option }}</code>

							<template v-if="index < prop.options.length - 1">, </template>
						</template>
					</td>

					<td v-if="hasExamples">
						<pre v-if="prop.example">{{ prop.example }}</pre>
					</td>

					<td v-if="hasRowNotes">
						<div
							v-if="propNotes(prop).length"
							class="DeveloperStyleGuidePropsTable__notes"
						>
							<PrimitiveHTML
								v-for="(note, index) in propNotes(prop)"
								:key="index"
								tag="div"
								:html="note"
							/>
						</div>
					</td>
				</tr>
			</tbody>
		</DeveloperStyleGuideTable>

		<div
			v-if="hasFooterNotes"
			class="DeveloperStyleGuidePropsTable__notes DeveloperStyleGuidePropsTable__notes--footer"
		>
			<div v-if="alsoAccepts">
				Also accepts all <code>{{ alsoAccepts }}</code> props.
			</div>

			<PrimitiveHTML
				v-for="(note, index) in notes"
				:key="index"
				tag="div"
				:html="note"
			/>
		</div>
	</div>
</template>

<style>
	.DeveloperStyleGuidePropsTable {
		&__heading {
			margin-bottom: var(--space-lg);
		}

		&__code {
			display: block;
			margin-bottom: var(--space-md);
		}

		&__notes {
			display: flex;
			flex-direction: column;
			gap: var(--space-xs);

			&--footer {
				margin-top: var(--space-md);
			}
		}

		.DeveloperStyleGuideTable {
			margin-top: 0;
		}
	}
</style>
