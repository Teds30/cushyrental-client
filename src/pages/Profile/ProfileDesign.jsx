import styles from './ProfileDesign.module.css';

const ProfileDesign = (props) => {
    return (
        <div {...props} className={`${styles['design']}`}>
            <div className={`${styles['design-one']}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="172"
                    height="169"
                    viewBox="0 0 172 169"
                    fill="none"
                >
                    <path
                        d="M65.6076 -44.2188C141.145 -71.7122 219.454 -47.0902 240.516 10.7758C261.577 68.6418 217.416 137.839 141.878 165.333C66.3407 192.826 171.404 13.0105 69.0052 43.3029C-33.3938 73.5953 -9.92974 -16.7255 65.6076 -44.2188Z"
                        fill="#1D6156"
                    />
                </svg>
            </div>
            <div className={`${styles['design-two']}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="197"
                    height="178"
                    viewBox="0 0 197 178"
                    fill="none"
                >
                    <path
                        d="M65.3069 -35.0097C140.844 -62.503 219.153 -37.8811 240.215 19.985C261.276 77.851 217.115 147.048 141.577 174.542C66.04 202.035 171.103 22.2196 68.7044 52.5121C-33.6946 82.8045 -10.2305 -7.51632 65.3069 -35.0097Z"
                        fill="url(#paint0_linear_501_2564)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_501_2564"
                            x1="22.1362"
                            y1="99.359"
                            x2="240.215"
                            y2="19.9849"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#1D6156" />
                            <stop
                                offset="1"
                                stop-color="#1D6156"
                                stop-opacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default ProfileDesign;
