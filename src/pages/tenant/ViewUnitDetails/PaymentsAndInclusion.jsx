import React from "react";
import ChipBig from "../../../components/Chips/ChipBig";

const PaymentAndInclusion = (props) => {
    const { paymentAndInclusions } = props;

    console.log(paymentAndInclusions);

    const paymentOptions = [
        {
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
            icon: "advance_payment.svg",
            name: (
                <>
                    Advance Payment
                    <br />+ {paymentAndInclusions.month_advance} Month/s
                </>
            ),
        },
    ];

    paymentAndInclusions.inclusions.forEach((inclusion) => {
        paymentOptions.push(inclusion);
    });

    console.log(paymentOptions); // Corrected to log paymentOptions

    return <ChipBig items={paymentOptions} clickable={false} />;
};

export default PaymentAndInclusion;
