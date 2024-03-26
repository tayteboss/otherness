import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	title: string;
	filters: string[];
	setActiveMood?: (value: string) => void;
	setActiveWork?: (value: string) => void;
	activeWork?: string;
	activeMood?: string;
};

const FilterTabWrapper = styled.div<{ $isMoodFilter: boolean }>`
	padding: ${pxToRem(8)} 0 ${pxToRem(16)};
	display: flex;
	flex-direction: ${(props) => (props.$isMoodFilter ? 'row' : 'row-reverse')};
	align-items: center;
	gap: ${pxToRem(12)};
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		position: unset;
	}
`;

const Title = styled.span`
	white-space: nowrap;
	padding-bottom: ${pxToRem(2)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-bottom: 0;
	}
`;

const Divider = styled.div`
	background: var(--colour-black);
	height: 1px;
	width: ${pxToRem(24)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const FiltersList = styled(motion.div)`
	display: flex;
	gap: ${pxToRem(10)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const MotionWrapper = styled(motion.div)``;

const Filter = styled.button<{ $isActive: boolean }>`
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;
	white-space: nowrap;
	color: ${(props) =>
		props.$isActive ? 'var(--colour-black)' : 'var(--colour-inactive)'};

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		color: var(--colour-black);
	}
`;

const ActiveFilter = styled(motion.span)`
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;
	color: var(--colour-black);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const DesktopWrapper = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		display: none;
	}
`;

const MediumWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		display: block;
	}
`;

const MobileFiltersList = styled(motion.div)<{ $isMoodFilter: boolean }>`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		position: absolute;
		bottom: -16px;
		left: ${(props) => (props.$isMoodFilter ? '0' : 'unset')};
		right: ${(props) => (props.$isMoodFilter ? 'unset' : '0')};
		width: calc(100vw - 24px);
		height: ${pxToRem(22)};
		overflow: auto;
		display: flex;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			left: 0;
			right: unset;
			bottom: ${pxToRem(19)};
		}

		&::after {
			content: '';
			width: ${pxToRem(52)};
			height: 100%;
			background: linear-gradient(
				270deg,
				#fff 0%,
				rgba(255, 255, 255, 0) 100%
			);
			position: absolute;
			bottom: 0;
			right: ${(props) => props.$isMoodFilter && '0'};
			left: ${(props) => !props.$isMoodFilter && '0'};
			z-index: 1;

			@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
				right: 0;
				left: unset;
			}
		}
	}
`;

const MobileFiltersListInner = styled.div<{ $isMoodFilter: boolean }>`
	display: flex;
	gap: ${pxToRem(10)};
	position: absolute;
	padding-right: ${(props) => props.$isMoodFilter && '48px'};
	padding-left: ${(props) => !props.$isMoodFilter && '48px'};
	width: 100%;
	overflow: auto;
	justify-content: ${(props) => !props.$isMoodFilter && 'flex-end'};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-left: 0;
		padding-right: ${pxToRem(48)};
		justify-content: flex-start;
		padding-bottom: ${pxToRem(16)};
	}
`;

const activeVariants = {
	hidden: {
		opacity: 0,
		x: -5,
		transition: {
			duration: 0.15,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.15,
			ease: 'easeInOut'
		}
	}
};

const FilterTab = (props: Props) => {
	const {
		title,
		filters,
		setActiveMood,
		setActiveWork,
		activeWork,
		activeMood
	} = props;

	const [isHovered, setIsHovered] = useState(false);

	const isMoodFilter = title === 'mood';

	const wrapperVariants = {
		hidden: {
			opacity: 0,
			transition: {
				duration: 0,
				ease: 'easeInOut',
				when: 'afterChildren',
				staggerChildren: 0.05,
				staggerDirection: isMoodFilter ? -1 : 1
			}
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0,
				ease: 'easeInOut',
				when: 'beforeChildren',
				staggerChildren: 0.05,
				staggerDirection: isMoodFilter ? 1 : -1
			}
		}
	};

	const childVariants = {
		hidden: {
			opacity: 0,
			x: -5,
			transition: {
				duration: 0.3,
				ease: 'easeInOut'
			}
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.3,
				ease: 'easeInOut'
			}
		}
	};

	const formatFilter = (filter: string | undefined) => {
		if (!filter) return 'All';

		return (
			filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')
		);
	};

	return (
		<FilterTabWrapper
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			onClick={() => setIsHovered(!isHovered)}
			$isMoodFilter={isMoodFilter}
		>
			<Title className="type-h5">Type of {title}</Title>
			<Divider />
			<MediumWrapper>
				<ActiveFilter
					variants={activeVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					key={`${title}-active-filter`}
				>
					{isMoodFilter
						? formatFilter(activeMood)
						: formatFilter(activeWork)}
				</ActiveFilter>
			</MediumWrapper>
			<DesktopWrapper>
				<AnimatePresence mode="wait">
					{!isHovered ? (
						<ActiveFilter
							variants={activeVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
							key={`${title}-active-filter`}
						>
							{isMoodFilter
								? formatFilter(activeMood)
								: formatFilter(activeWork)}
						</ActiveFilter>
					) : (
						<FiltersList
							variants={wrapperVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
						>
							{filters.map((filter, i) => (
								<MotionWrapper
									variants={childVariants}
									key={`${title}-${i}-${filter}`}
								>
									<Filter
										key={filter}
										onClick={() => {
											if (isMoodFilter) {
												setActiveMood &&
													setActiveMood(filter);
											} else {
												setActiveWork &&
													setActiveWork(filter);
											}
											setIsHovered(false);
										}}
										$isActive={
											activeMood === filter ||
											activeWork === filter
										}
									>
										{filter}
									</Filter>
								</MotionWrapper>
							))}
						</FiltersList>
					)}
				</AnimatePresence>
			</DesktopWrapper>
			<AnimatePresence mode="wait">
				{isHovered && (
					<MobileFiltersList
						variants={wrapperVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						$isMoodFilter={isMoodFilter}
					>
						<MobileFiltersListInner $isMoodFilter={isMoodFilter}>
							{filters.map((filter, i) => (
								<MotionWrapper
									variants={childVariants}
									key={`${title}-${i}-${filter}`}
								>
									<Filter
										key={filter}
										onClick={() => {
											if (isMoodFilter) {
												setActiveMood &&
													setActiveMood(filter);
											} else {
												setActiveWork &&
													setActiveWork(filter);
											}
										}}
										$isActive={
											activeMood === filter ||
											activeWork === filter
										}
									>
										{filter}
									</Filter>
								</MotionWrapper>
							))}
						</MobileFiltersListInner>
					</MobileFiltersList>
				)}
			</AnimatePresence>
		</FilterTabWrapper>
	);
};

export default FilterTab;
