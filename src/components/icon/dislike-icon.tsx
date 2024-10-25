interface DislikeIconProps {
  isFill: boolean;
}

const DislikeIcon = ({ isFill }: DislikeIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${
      isFill ? 'fill-text/90' : 'fill-none'
    } stroke-text/90 w-full h-full`}
    viewBox="0 0 128 128"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="M71.0361 118.999C70.2401 119.08 69.2561 114.086 68.6411 108.992C68.0478 104.079 65.2979 99.5742 61.0488 96.9479C56.3395 94.0372 51.6584 90.6721 48.2004 86.852C44.853 83.154 44 78.0253 44 73.0373V41.687C44 36.8893 47.941 33 52.8024 33H95.2404C97.7721 33 100.531 33.9162 102.588 35.7486C105.364 38.2208 106.141 42.171 107.494 45.6327C110.673 53.7608 116.48 68.9441 116.935 72.5345C117.563 77.4985 113.557 80.601 109.39 80.601H76.2624C80.4378 89.0479 83.8183 106.671 80.4673 114.656C79.1653 117.759 76.0689 118.484 71.0361 118.999Z"
    ></path>
    <path
      strokeWidth="4"
      d="M11 75C11 77.7614 13.2386 80 16 80H28C30.7614 80 33 77.7614 33 75V38C33 35.2386 30.7614 33 28 33H16C13.2386 33 11 35.2386 11 38V75Z"
    ></path>
  </svg>
);

export default DislikeIcon;
