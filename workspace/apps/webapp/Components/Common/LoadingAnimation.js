import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const LoadingAnimation = ({ isLoading, variant, size, children }) => {
	const styles = {
		circular: {
			width: size,
			height: size,
		},
		text: {
			width: size,
		},
	};

	return isLoading ? (
		<Skeleton variant={variant} sx={styles[variant]} animation="wave" />
	) : (
		children
	);
};

export const LoadingText = ({ textAlign, isLoading, children }) => (
	<Box
		display="flex"
		justifyContent={textAlign}
	>
		<LoadingAnimation
			variant="text"
			size="60px"
			isLoading={isLoading}
		>
			{children}
		</LoadingAnimation>
	</Box>
);

export default LoadingAnimation;