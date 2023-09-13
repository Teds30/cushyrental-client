import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import useNotistack from "../../../../hooks/notistack-hook";

import PrimaryButton from "../../../../components/Button/PrimaryButton";
import UnitImage from "./UnitImage";
import TextField from "../../../../components/TextField/TextField";
import CardShadow from "../../../../components/Card/CardShadow";
import ButtonSwitch from "../../../../components/Switch/ButtonSwitch";
import Quantity from "../../../../components/Quantity/Quantity";
import UnitFeatures from "./UnitFeatures";
import EditUnitTargetGender from "./EditUnitTargetGender";
import BorderedButton from "../../../../components/Button/BorderedButton";
import useUnitManager from "../../../../hooks/data/units-hook";

import styles from "./EditUnit.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { BsFillSendFill, BsTrashFill } from 'react-icons/bs'
import { useState } from "react";
import UnitData from "./UnitData";
import Units from "../ManageUnit/Units";

const EditUnit = (props) => {
    const { userUnit } = props;

    const { updateUnit, isLoading } = useUnitManager();
    const { notify, notifyWithCollapse } = useNotistack();
    const navigate = useNavigate();

    const [unit, setUnit] = useState(userUnit);

    const unitNameChangeHandler = (event) => {
        setUnit({ ...unit, name: event.target.value });
    };

    const descriptionChangeHandler = (event) => {
        setUnit({ ...unit, details: event.target.value });
    };

    const unitPriceChangeHandler = (event) => {
        setUnit({ ...unit, price: event.target.value });
    };

    const swithDepositHandler = (value) => {
        setUnit({ ...unit, month_deposit: value.value === true ? 1 : 0 });
    };

    const quantityPaymentHandler = (value) => {
        setUnit({ ...unit, month_advance: value.value });
    };

    const swithAdvanceHandler = (value) => {
        setUnit({ ...unit, month_advance: value.value === true ? 1 : 0 });
    };

    const targetGenderHandler = (value) => {
        setUnit({ ...unit, target_gender: value[0] });
    };

    const quantitySlotsHandler = (value) => {
        setUnit({ ...unit, slots: value.value });
    };

    const swithIsListedHandler = (value) => {
        setUnit({ ...unit, is_listed: value.value === true ? 1 : 0 });
    };

    function filterObject(obj, excludeProperties) {
        const filtered = {};
        for (const key in obj) {
            if (!excludeProperties.includes(key)) {
                filtered[key] = obj[key];
            }
        }
        return filtered;
    }

    const saveHandler = async (event) => {
        event.preventDefault();

        // Properties to exclude from the new data
        const excludeProperties = [
            "landlord",
            "amenities",
            "facilities",
            "inclusions",
            "rules",
            "images",
            "subscriptions",
            "rentals",
        ];

        // Create a filtered version of the object
        const filteredData = filterObject(unit, excludeProperties);

        const id = filteredData.id
        console.log(id)

        try {
            const res = await updateUnit(id, filteredData);
            // ctx.onLogin(res.user, res.token);
            notify('Successfully updated!', 'success');
            navigate('/manage_unit/' + res.id);
          } catch (error) {
            console.log(error);
          }
    };

    const deleteHandler = async (event) => {
        event.preventDefault();

        // Properties to exclude from the new data
        const excludeProperties = [
            "landlord",
            "amenities",
            "facilities",
            "inclusions",
            "rules",
            "images",
            "subscriptions",
            "rentals",
        ];

        // Create a filtered version of the object
        const filteredData = filterObject(unit, excludeProperties);

        const id = filteredData.id
        console.log(id)

        try {
            const res = await updateUnit(id, {...filteredData, status: 0});
            // ctx.onLogin(res.user, res.token);
            notify('Successfully updated!', 'success');
            navigate('/manage_unit/' + res.id);
          } catch (error) {
            console.log(error);
          }
    };

    return (
        <div className={`${styles["edit-unit-container"]}`}>
            <Box className={`${styles["top-back-container"]} `}>
                <AppBar
                    position="static"
                    sx={{
                        margin: 0,
                        backgroundColor: "#fff",
                        color: "var(--fc-body)",
                        fontFamily: "Inter",
                        boxShadow: "none",
                        borderBottom: "1px solid var(--border-color)",
                    }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link to={`/manage_unit/${unit.id}`}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <FiChevronLeft
                                    style={{
                                        color: "var(--fc-strong)",
                                        fill: "transparent",
                                    }}
                                />
                            </IconButton>
                        </Link>
                        <Box>
                            <p className="title">Edit Unit</p>
                        </Box>
                        <form onSubmit={saveHandler}>
                            <PrimaryButton
                                isLoading={isLoading}
                                loadingText="Saving"
                            >
                                Save
                            </PrimaryButton>
                        </form>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className={`${styles["main-container"]}`}>
                <UnitImage unitImages={unit.images} unitId={userUnit.id} />

                <div className={`${styles["unit-details"]}`}>
                    <p>Unit Name</p>
                    <TextField
                        label=""
                        defaultValue={unit.name}
                        onChange={unitNameChangeHandler}
                    />

                    <p>Unit Description</p>
                    <TextField
                        label=""
                        defaultValue={unit.details}
                        rows={4}
                        multiline
                        onChange={descriptionChangeHandler}
                    />

                    <div className={styles["hr"]}></div>

                    <p className={`${styles["unit-details-title"]}`}>
                        Pricing Details
                    </p>
                    <p>Price</p>
                    <TextField
                        label=""
                        defaultValue={unit.price}
                        onChange={unitPriceChangeHandler}
                    />

                    <CardShadow filled={"false"}>
                        <div className={`${styles["price-deposit"]}`}>
                            <p>Deposit</p>
                            <ButtonSwitch
                                defaultChecked={
                                    unit.month_deposit === 1 && true
                                }
                                onChange={swithDepositHandler}
                            />
                        </div>

                        <div className={styles["hr"]}></div>

                        <div className={styles.payments}>
                            <p>Month</p>
                            <Quantity
                                maxValue={5}
                                setQuantityvalue={unit.month_advance}
                                onQuantity={quantityPaymentHandler}
                                styled
                            />
                        </div>
                    </CardShadow>

                    <CardShadow filled={"false"}>
                        <div className={`${styles["price-advance"]}`}>
                            <p>Month Advance</p>
                            <ButtonSwitch
                                defaultChecked={unit.month_advance >= 1 && true}
                                onChange={swithAdvanceHandler}
                            />
                        </div>
                    </CardShadow>

                    <div className={styles["hr"]}></div>

                    <div>
                        <p className={`${styles["unit-details-title"]}`}>
                            Location
                        </p>
                        <div className={`${styles["unit-location"]}`}>
                            <p
                                className="smaller-text"
                                style={{
                                    fontSize: "14px",
                                    color: "var()--body",
                                }}
                            >
                                {unit.address}
                            </p>
                            <div className={styles.point}></div>
                            <Link style={{ color: "var(--accent)" }}>Edit</Link>
                        </div>
                    </div>

                    <div className={styles["hr"]}></div>

                    <UnitFeatures id={unit.id} />

                    <div className={styles["hr"]}></div>

                    <EditUnitTargetGender
                        targetGender={unit.target_gender}
                        onTargetGender={targetGenderHandler}
                    />

                    <div className={styles["hr"]}></div>

                    <div className={`${styles["unit-slot"]}`}>
                        <p className={`${styles["unit-details-title"]}`}>
                            Slots
                        </p>

                        <div>
                            <p>Available slot</p>
                            <Quantity
                                maxValue={100}
                                setQuantityvalue={unit.slots}
                                onQuantity={quantitySlotsHandler}
                                styled
                            />
                        </div>
                    </div>

                    <div className={`${styles["unit-management"]}`}>
                        <p className={`${styles["unit-details-title"]}`}>
                            Unit Management
                        </p>

                        <div className={`${styles["list-unit"]}`}>
                            <div>
                                <p
                                    style={{
                                        fontWeight: "400",
                                        color: "var(--fc-strong)",
                                    }}
                                >
                                    List Unit
                                </p>
                                <p
                                    style={{
                                        fontWeight: "400",
                                        color: "var(--body_light, #959CB0)",
                                    }}
                                >
                                    Make This unit available for listings
                                </p>
                            </div>

                            <ButtonSwitch
                                defaultChecked={unit.is_listed === 1 && true}
                                onChange={swithIsListedHandler}
                            />
                        </div>

                        <form onSubmit={deleteHandler}>
                            <BorderedButton
                                btnType="danger"
                                leftIcon={<BsTrashFill />}
                                isLoading={isLoading}
                                loadingText="Deleting"
                            >
                                Delete
                            </BorderedButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUnit;
