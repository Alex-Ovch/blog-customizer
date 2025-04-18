import type { Meta, StoryObj } from '@storybook/react';
import { ArticleParamsForm } from './ArticleParamsForm';

const meta: Meta<typeof ArticleParamsForm> = {
	title: 'Components/ArticleParamsForm',
	component: ArticleParamsForm,
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof ArticleParamsForm>;

export const FullSidebarDemo: Story = {
	render: () => (
		<div style={{ padding: '0 40px' }}>
			<ArticleParamsForm
				onSubmit={(settings) => alert(JSON.stringify(settings, null, 2))}
			/>
		</div>
	),
};
