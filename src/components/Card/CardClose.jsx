import { useState, Fragment } from "react";
import styles from "./CardClose.module.css";
import { AiOutlineClose } from "react-icons/ai";

const CardClose = (props) => {
    const { filled = true, onClose } = props;

    let filledStyle = "";
    if (filled === true) {
        filledStyle = styles["card-fill"];
    }

    const closeCardHandler = () => {
        if (onClose) {
            onClose(); // Call the onClose function passed as a prop
        }
    };

    return (
        <Fragment>
            <div {...props} className={`${styles.card} ${filledStyle}`}>
                <button
                    onClick={closeCardHandler}
                    className={`${styles["button"]}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                    >
                        <g filter="url(#filter0_d_2257_6451)">
                            <path
                                d="M17.5 3.09375C10.1079 3.09375 4.09375 9.10787 4.09375 16.5C4.09375 23.8921 10.1079 29.9062 17.5 29.9062C24.8921 29.9062 30.9062 23.8921 30.9062 16.5C30.9062 9.10787 24.8921 3.09375 17.5 3.09375ZM23.0836 20.625L21.625 22.0836L17.5 17.9586L13.375 22.0836L11.9164 20.625L16.0414 16.5L11.9164 12.375L13.375 10.9164L17.5 15.0414L21.625 10.9164L23.0836 12.375L18.9586 16.5L23.0836 20.625Z"
                                fill="#FBFBFC"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_d_2257_6451"
                                x="-3"
                                y="-3"
                                width="41"
                                height="41"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy="1" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_2257_6451"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_2257_6451"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>
                </button>
                <div>{props.children}</div>
            </div>
        </Fragment>
    );
};

export default CardClose;
