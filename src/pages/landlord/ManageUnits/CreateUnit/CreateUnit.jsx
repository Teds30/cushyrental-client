import CreateUnitForm from "./CreateUnitForm";

import styles from "./CreateUnit.module.css";

const CreateUnit = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles["container-title"]}`}>
                <h1>Create Unit</h1>
            </div>

            <div className={`${styles["main-container"]}`}>
                <CreateUnitForm />
            </div>
        </div>
    );
};

export default CreateUnit;
