import { PropTypes } from 'prop-types';
import { useRef, useEffect } from 'react';

function Background({ children }) {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const stars = [];
		const numStars = 100;

		// Khởi tạo ngẫu nhiên các ngôi sao
		for (let i = 0; i < numStars; i++) {
			stars.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				radius: Math.random() * 2 + 1,
				speedX: Math.random() * 0.5 - 0.25,
				speedY: Math.random() * 0.5 - 0.25,
			});
		}

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Vẽ các ngôi sao
			ctx.fillStyle = 'white';
			stars.forEach(star => {
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
				ctx.fill();
			});

			// Vẽ đường kết nối
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
			ctx.lineWidth = 0.5;
			for (let i = 0; i < numStars; i++) {
				for (let j = i + 1; j < numStars; j++) {
					const dx = stars[i].x - stars[j].x;
					const dy = stars[i].y - stars[j].y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < 100) {
						ctx.beginPath();
						ctx.moveTo(stars[i].x, stars[i].y);
						ctx.lineTo(stars[j].x, stars[j].y);
						ctx.stroke();
					}
				}
			}

			// Cập nhật vị trí ngôi sao
			stars.forEach(star => {
				star.x += star.speedX;
				star.y += star.speedY;

				if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
				if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;
			});

			requestAnimationFrame(draw);
		};

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		draw();

		return () => cancelAnimationFrame(draw);
	}, []);

	return (
		<div className="relative h-full w-full bg-gradient-to-r from-slate-200 via-primary-200 to-slate-200 dark:from-black-600 dark:via-black-700 dark:to-black-600">
			{/* Starry Layout */}
			<canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />

			{/* Content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}

Background.propTypes = {
	children: PropTypes.node,
};

export default Background;
