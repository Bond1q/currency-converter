import React, { useEffect, useState } from "react";

export function ArrowToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => {
		if (window.pageYOffset > 10) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<div className="scroll-to-top">
			{isVisible &&
				<div onClick={scrollToTop}>
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" /></svg>				</div>}
		</div>
	);
}