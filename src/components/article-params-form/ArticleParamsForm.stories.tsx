import type { Meta, StoryObj } from '@storybook/react';
import { ArticleParamsForm } from './ArticleParamsForm';
import { useState, useRef } from 'react';
import { defaultArticleState, OptionType } from 'src/constants/articleProps';

const meta: Meta<typeof ArticleParamsForm> = {
	title: 'Components/ArticleParamsForm',
	component: ArticleParamsForm,
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof ArticleParamsForm>;

// ✅ Вынеси useState и useRef в отдельный компонент
const SidebarDemoComponent = () => {
	const [settings, setSettings] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleChange = (key: keyof typeof settings) => (option: OptionType) => {
		setSettings((prev) => ({ ...prev, [key]: option }));
	};

	return (
		<div style={{ padding: '0 40px' }}>
			<ArticleParamsForm
				isOpen={true}
				onToggle={() => {}}
				settings={settings}
				onChange={handleChange}
				sidebarRef={sidebarRef}
				onApply={() => alert('Apply clicked')}
				onReset={() => alert('Reset clicked')}
			/>
		</div>
	);
};

export const FullSidebarDemo: Story = {
	render: () => <SidebarDemoComponent />,
};
