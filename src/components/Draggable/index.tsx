import { useState, useRef } from "react";
import { useSpring, animated, to } from "react-spring";
import { useGesture } from "react-use-gesture";

import { calcX, calcY, calcWheel, calcBoxShadow } from "./calculations";

import "./styles.scss";

document.addEventListener("gesturestart", (e) => e.preventDefault());
document.addEventListener("gesturechange", (e) => e.preventDefault());

const Draggable: React.FC = () => {
	const domTarget = useRef<HTMLDivElement>(null);

	const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, set] = useSpring(() => ({
		rotateX: 0,
		rotateY: 0,
		rotateZ: 0,
		scale: 1,
		zoom: 0,
		x: 0,
		y: 0,
		config: { mass: 5, tension: 350, friction: 40 },
	}));

	const [{ wheelY }, setWheel] = useSpring(() => ({ wheelY: 0 }));
	const [drag, setDrag] = useState(false);
	const [boxShadow, setBoxShadow] = useState<any>(undefined);

	useGesture(
		{
			onDragStart: () => setDrag(true),
			onDrag: ({ offset: [x, y] }) => set({ x, y, rotateX: 0, rotateY: 0, scale: 1 }),
			onDragEnd: () => setDrag(false),
			onPinch: ({ offset: [d, a] }) => set({ zoom: d / 200, rotateZ: a }),
			onMove: (moveState) => {
				const { xy, dragging } = moveState;
				const [px, py] = xy;

				console.log(domTarget.current?.getBoundingClientRect().x);
				const Dx = domTarget.current?.getBoundingClientRect().x || 0;
				const Dy = domTarget.current?.getBoundingClientRect().y || 0;

				const newBoxShadow = calcBoxShadow({
					offsetX: Math.abs(px - Dx),
					offsetY: Math.abs(py - Dy),
					offsetHeight: 150,
					offsetWidth: 200,
					color: "rgba(255,255,255,0.5)",
					inset: true,
					reverse: false,
					blur: 30,
					spread: 0,
					offset: 0.8,
				});

				setBoxShadow(newBoxShadow);

				return (
					!dragging && set({ rotateX: calcX(py, y.get()), rotateY: calcY(px, x.get()), scale: 1.1 })
				);
			},
			onHover: ({ hovering }) => {
				// if (!hovering) setBoxShadow("none");

				return !hovering && set({ rotateX: 0, rotateY: 0, scale: 1 });
			},
			onWheel: ({ offset: [, y] }) => setWheel({ wheelY: y }),
		},
		{
			domTarget,
			eventOptions: { passive: false },
		}
	);

	return (
		<animated.div
			ref={domTarget}
			className={`draggable ${drag ? "dragging" : ""}`}
			style={{
				transform: "perspective(1600px)",
				x,
				y,
				scale: to([scale, zoom], (s, z) => s + z),
				rotateX,
				rotateY,
				rotateZ,
			}}
		>
			<animated.div
				className='draggable-content'
				style={{ transform: wheelY.to(calcWheel), boxShadow: boxShadow }}
			></animated.div>
		</animated.div>
	);
};

export default Draggable;
