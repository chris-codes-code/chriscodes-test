const presets = {
	'fluid-infinite': {
		gridColor: 'blue',
		containerMode: 'fluid-infinite',
		columnsGapX: '3.5vw',
		columnsGapY: '3.5vw',
		containerGutter: '5vw',
		breakpoints: [
			{ name: { primary: 'mobile' }, columns: 6 },
			{
				name: { primary: 'lg', secondary: 'desktop' },
				columnsGapX: '1.4vw',
				columnsGapY: '1.4vw',
				containerGutter: '2vw',
				contentWidth: '650px',
				columns: 12,
			},
		],
	},
};

// columnsGapX: '1vw',
// 	columnsGapY: '1vw',
// 	containerGutter: '5vw',

const defaults = {
	gridColor: 'orange',
	containerMode: 'fluid-infinite',
	columnsGapX: '10px',
	columnsGapY: '10px',
	containerGutter: '5vw',
	breakpoints: [
		{ name: { primary: 'xs' }, columns: 4 },
		{ name: { primary: 'sm', secondary: 'mobile' }, contentWidth: '400px', columns: 4 },
		{ name: { primary: 'md', secondary: 'tablet' }, contentWidth: '800px', columns: 4 },
		{
			name: { primary: 'lg', secondary: 'desktop' },
			contentWidth: '1200px',
			columns: 8,
			columnsGapX: '0.5vw',
			columnsGapY: '0.5vw',
		},
		{
			name: { primary: 'xl' },
			contentWidth: '1600px',
			columns: 8,
		},
		{ name: { primary: 'xxl' }, contentWidth: '2000px', columns: 12 },
		{ name: { primary: 'max' }, contentWidth: '2400px', columns: 12 },
	],
};

const activePreset = '';

const config = { ...defaults, ...(activePreset ? presets[activePreset] : {}) };

export { config };
