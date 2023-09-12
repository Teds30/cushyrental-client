import { Link } from "react-router-dom";

import CardPlain from "../../../../components/Card/CardPlain";
import Status from "./Status";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import BorderedButton from "../../../../components/Button/BorderedButton";
import useImageManager from "../../../../hooks/data/image-hook";

import styles from "./ManageUnit.module.css";
import photo from "../../../../assets/cushyrental.svg";
import { CiLocationOn } from "react-icons/ci";
import { useEffect, useState } from "react";

const Unit = (props) => {
    const { user_unit } = props;

    const { fetchImage, fetchImages, isLoading } = useImageManager();
    const [image, setImage] = useState();

    let type, gender;

    if (user_unit.subscriptions[0].subscription_id === 1) {
        type = "Bronze";
    } else if (user_unit.subscriptions[0].subscription_id === 2) {
        type = "Silver";
    } else if (user_unit.subscriptions[0].subscription_id === 3) {
        type = "Gold";
    }

    if (user_unit.targte_gender === 1) {
        gender = "Male";
    } else if (user_unit.targte_gender === 1) {
        gender = "Female";
    } else {
        gender = "Both";
    }

    const subscriptions = user_unit.subscriptions.filter((subscription) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add 1 to the month since it's zero-based
        const day = String(currentDate.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;

        if (
            formattedDate >= subscription.date_start &&
            formattedDate <= subscription.date_end
        ) {
            return subscription;
        }
    });

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetchImages();
                const filteredImages = user_unit.images.map((image) => {
                    return res.find((photo) => photo.id === image.id) || null;
                });

                const resImage = await fetchImage(filteredImages[0].image);
                setImage(resImage);
            } catch (err) {}
        };
        handleFetch();
    }, []);

    return (
        <div className={`${styles["units-container"]}`}>
            <CardPlain
                filled="false"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    borderRadius: "0",
                }}
            >
                <div className={`${styles["unit-col"]}`}>
                    <div className={`${styles["unit-images"]}`}>
                        <img
                            src={image === undefined ? photo : image}
                            alt="photo"
                        />
                    </div>

                    <div className={`${styles["col-data"]}`}>
                        <div>
                            <Status
                                unitRequestStatus={user_unit.request_status}
                            />
                        </div>
                        <div className="title">{user_unit.name}</div>
                        <div className={`${styles["col-address"]}`}>
                            <div>
                                <CiLocationOn />
                            </div>
                            <div className="caption">{user_unit.address}</div>
                        </div>
                        <div
                            className="title"
                            style={{ fontSize: "16px", color: "var(--accent)" }}
                        >
                            Php {user_unit.price}
                        </div>
                    </div>
                </div>

                <div className={styles["hr"]}></div>

                <div className={`${styles["col-data-2"]}`}>
                    <div className={`${styles["unit-datas"]}`}>
                        <div className="pre-title">Rating</div>
                        <p className="title">5.0</p>
                    </div>

                    <div className={`${styles["hr-horizontal"]}`}></div>

                    <div className={`${styles["unit-datas"]}`}>
                        <div className="pre-title">Available Slot</div>
                        <p className="title">{user_unit.slots}</p>
                    </div>

                    <div className={`${styles["hr-horizontal"]}`}></div>

                    <div className={`${styles["unit-datas"]}`}>
                        <div className="pre-title">Subscription</div>
                        <p className="title">
                            {type === undefined ? "None" : type}
                        </p>
                    </div>

                    <div className={`${styles["hr-horizontal"]}`}></div>

                    <div className={`${styles["unit-datas"]}`}>
                        <div className="pre-title">Target</div>
                        <p className="title">{gender}</p>
                    </div>
                </div>

                {subscriptions.length !== 0 ? (
                    subscriptions[0].request_status === 1 ? (
                        <BorderedButton width="100%" btnType="danger">
                            Cancel Unit Request
                        </BorderedButton>
                    ) : (
                        subscriptions[0].request_status === 2 && (
                            <div className={`${styles["unit-button"]}`}>
                                <Link
                                    to={`/manage_unit/edit/${user_unit.landlord_id}`}
                                    style={{ width: "100%" }}
                                >
                                    <PrimaryButton width="100%">
                                        Manage Unit
                                    </PrimaryButton>
                                </Link>
                            </div>
                        )
                    )
                ) : (
                    <div className={`${styles["unit-button"]}`}>
                        <Link
                            to={`/manage_unit/edit/${user_unit.id}`}
                            style={{ width: "100%" }}
                        >
                            <PrimaryButton width="100%">
                                Manage Unit
                            </PrimaryButton>
                        </Link>
                        <BorderedButton>Promote</BorderedButton>
                    </div>
                )}
            </CardPlain>
        </div>
    );
};

export default Unit;
