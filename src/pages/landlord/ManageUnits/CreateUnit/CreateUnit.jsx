import CreateUnitForm from "./CreateUnitForm";

// import { CreateUnitContextProvider } from "../../../../context/create-unit-context.jsx";

import styles from "./CreateUnit.module.css";

const CreateUnit = () => {
    return (
        // <CreateUnitContextProvider>
            <div className={styles.container}>
                <div className={`${styles["container-title"]}`}>
                    <h1>Create Unit</h1>
                </div>

                <div className={`${styles["main-container"]}`}>
                    <CreateUnitForm />
                </div>
            </div>
        // </CreateUnitContextProvider>
    );
};

export default CreateUnit;
