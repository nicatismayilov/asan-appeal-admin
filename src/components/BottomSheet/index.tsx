import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSpring, animated } from "react-spring";
// import { useGesture } from "react-use-gesture";

import "./styles.scss";

const bottomSheetRoot = document.getElementById("bottom-sheet-root") as HTMLElement;

const BottomDrawer: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const animation = useSpring<any>({
		opacity: isOpen ? 1 : 0,
	});

	const sheetAnimation = useSpring<any>({
		height: isOpen ? 844 * 0.95 : 75 + 30,
		borderRadius: isOpen ? 20 : 0,
		translateY: isOpen ? 15 : 0,
		paddingTop: isOpen ? 30 : 15,
		borderTop: isOpen ? "none" : "1px solid gray",
		config: {
			mass: 1,
			tension: 281,
			friction: 33,
		},
	});

	const indicatorAnimation = useSpring<any>({
		opacity: isOpen ? "1" : "0",
	});

	const imageAnimation = useSpring<any>({
		width: isOpen ? 290 : 75,
		height: isOpen ? 290 : 75,
		marginTop: isOpen ? 15 : 0,
		x: isOpen ? (360 - 290) / 2 : 0,
		borderRadius: isOpen ? 15 : 10,
		boxShadow: isOpen ? "0px 10px 30px -5px rgba(0, 0, 0, 0.5)" : "none",
		config: {
			mass: 1,
			tension: 281,
			friction: 33,
		},
	});

	const portalRoot = useRef<HTMLElement>(document.createElement("div"));

	const handleMount = () => {
		const current = portalRoot.current;
		bottomSheetRoot!.appendChild(current);

		return () => void bottomSheetRoot!.removeChild(current);
	};

	const handleBottomSheetClick = () => {
		setIsOpen(!isOpen);
	};

	useEffect(handleMount, []);

	return createPortal(
		<>
			<animated.div style={animation} className='bottom-sheet-container' />

			<animated.div
				style={sheetAnimation}
				className='bottom-sheet'
				onClick={handleBottomSheetClick}
			>
				<animated.div style={indicatorAnimation} className='bottom-sheet__indicator' />

				<animated.div style={imageAnimation} className='bottom-sheet__hero-img' />
			</animated.div>
		</>,
		portalRoot.current
	);
};

export default BottomDrawer;
