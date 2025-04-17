import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Select } from '../../ui/select/Select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { RefObject } from 'react';

import {
	defaultArticleState,
	fontColors,
	backgroundColors,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	OptionType,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	settings: typeof defaultArticleState;
	onChange: (
		key: keyof typeof defaultArticleState
	) => (option: OptionType) => void;
	sidebarRef?: RefObject<HTMLDivElement>;
	onApply?: () => void;
	onReset?: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	settings,
	onChange,
	sidebarRef,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					{/* Настройки */}
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={settings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						selected={settings.fontSizeOption}
						options={fontSizeOptions}
						name='fontSize'
						onChange={onChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={settings.fontColor}
						options={fontColors}
						onChange={onChange('fontColor')}
					/>
					<Separator />

					<Select
						title='Цвет фона'
						selected={settings.backgroundColor}
						options={backgroundColors}
						onChange={onChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={settings.contentWidth}
						options={contentWidthArr}
						onChange={onChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={onReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={onApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
