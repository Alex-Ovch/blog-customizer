import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Select } from '../../ui/select/Select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useState, useRef, useEffect, useCallback } from 'react';

import {
	defaultArticleState,
	fontColors,
	backgroundColors,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	OptionType,
} from '../../constants/articleProps';

type Props = {
	onSubmit: (settings: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onSubmit }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Закрытие по клику вне формы
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleChange = useCallback(
		(key: keyof typeof defaultArticleState) => (option: OptionType) => {
			setFormState((prev) => ({ ...prev, [key]: option }));
		},
		[]
	);

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onSubmit(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name='fontSize'
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
