// Tooltip arrow height and width
const ARROW_DIM = 8;
export interface IParameters {
	hostBounds: ClientRect;
	tooltipBounds: ClientRect;
	windowSize: ISize;
}
export interface ISize {
	width: number;
	height: number;
}
export interface IPosition {
	top: number;
	left: number;
}
/**
 * Signifies if the tooltip goes above the host, or below the host.
 */
export enum TooltipPlacement {
	Above, Below
}
export interface ITooltipPositions {
	body: IPosition;
	arrow: IPosition;
	placement: TooltipPlacement;
}

/**
 * Given host bounds, tooltip bounds, and the size of the window, determine how to place the tooltip.
 */
export function calculateTooltipPositions(params: IParameters): ITooltipPositions {
	const {
		hostBounds, tooltipBounds, windowSize
	} = params;

	// Prefer tooltips to be above the host
	let placement = TooltipPlacement.Above;
	let bodyTop = hostBounds.top - tooltipBounds.height - ARROW_DIM;
	let arrowTop = hostBounds.top - ARROW_DIM;
	if (bodyTop < 0) {
		bodyTop = hostBounds.bottom + ARROW_DIM;
		arrowTop = hostBounds.bottom;
		placement = TooltipPlacement.Below;
	}

	// Attempt to center tooltip over host, but do not intrude on window bounds
	let bodyLeft = hostBounds.left + (hostBounds.width / 2) - (tooltipBounds.width / 2);
	if (bodyLeft < 0) {
		bodyLeft = 0;
	} else if (bodyLeft + tooltipBounds.width > windowSize.width) {
		bodyLeft = windowSize.width - tooltipBounds.width;
	}
	
	// Prefer arrows to be centered on the host
	const arrowLeft = hostBounds.left + (hostBounds.width / 2) - (ARROW_DIM / 2);

	return {
		body: {
			top: bodyTop, left: bodyLeft
		},
		arrow: {
			top: arrowTop, left: arrowLeft
		},
		placement
	};
}