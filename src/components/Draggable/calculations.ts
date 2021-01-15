export const calcX = (y: number, ly: number): number => {
	return (y - ly - window.innerHeight / 2) / 5.5;
};

export const calcY = (x: number, lx: number): number => {
	return -(x - lx - window.innerWidth / 2) / 5.5;
};

export const calcWheel = (y: number): string => {
	// const imgHeight = window.innerWidth * 0.3 - 1;

	// return `translateY(${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 5))}px`;
	return `translateY(0)`;
};

interface BoxShadowParams {
	offsetX: number;
	offsetY: number;
	offsetHeight: number;
	offsetWidth: number;
	offset?: number;
	color: string;
	reverse?: boolean;
	inset?: boolean;
	blur?: number;
	spread?: number;
}

const px = (val: number): string => `${val}px`;

export const calcBoxShadow = (params: BoxShadowParams): string => {
	const {
		offsetX,
		offsetY,
		offsetHeight,
		offsetWidth,
		offset = 1,
		color,
		reverse = false,
		inset = false,
		blur = 0,
		spread = 0,
	} = params;

	// alert(`x: ${offsetX}, y: ${offsetY}`);

	const b = px(blur);
	const s = px(spread);
	const i = inset ? "inset" : "";

	const x = (Math.abs(offsetWidth / 2 - offsetX) * offset) / 2;
	const y = (Math.abs(offsetHeight / 2 - offsetY) * offset) / 2;

	const h = px(!reverse ? x : x * -1);
	const v = px(!reverse ? y : y * -1);

	return `${h} ${v} ${b} ${s} ${color} ${i}`;
};
