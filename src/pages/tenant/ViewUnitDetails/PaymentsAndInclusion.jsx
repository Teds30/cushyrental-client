import React from "react";
import ChipBig from "../../../components/Chips/ChipBig";

const PaymentAndInclusion = (props) => {
    const { paymentAndInclusions } = props;

    const paymentOptions = [
        {
            id: -1,
            icon: "advance_deposit.svg",
            name: (
                <>
                    Advance Deposit
                    <br />
                    {paymentAndInclusions.month_deposit} Month/s
                </>
            ),
        },
        {
            id: -2,
            icon: "advance_payment.svg",
            name: (
                <>
                    Advance Payment
                    <br /> {paymentAndInclusions.month_advance} Month/s
                </>
            ),
        },
    ];

    paymentAndInclusions.inclusions.forEach((inclusion) => {
        paymentOptions.push(inclusion);
    });

    return <ChipBig items={paymentOptions} clickable={false} />;
};

export default PaymentAndInclusion;
