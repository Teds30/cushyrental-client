import styles from "./EditProfileDesign.module.css";

const EditProfileDesign = (props) => {
    return (
        <div {...props} className={`${styles["background-img-1"]} `}>
            <svg
                viewBox="0 0 360 190"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 0H360.327C360.327 0 406.841 110.249 360.327 164.865C285.814 252.359 0 76.2097 0 164.865C0 253.52 0 0 0 0Z"
                    fill="#1D6156"
                />
            </svg>
        </div>
    );
};

export default EditProfileDesign;
