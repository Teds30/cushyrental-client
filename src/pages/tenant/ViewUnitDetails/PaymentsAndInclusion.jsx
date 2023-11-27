import React from 'react'
import ChipBig from '../../../components/Chips/ChipBig'

const PaymentAndInclusion = (props) => {
    const { paymentAndInclusions } = props

    const paymentOptions = [
        {
            id: 0,
            icon: 'advance_deposit.svg',
            name: (
                <>
                    Advance Deposit
                    <br />
                    {paymentAndInclusions.month_deposit} Month
                    {paymentAndInclusions.month_deposit > 1 && 's'}
                </>
            ),
        },
        {
            id: 1,
            icon: 'advance_payment.svg',
            name: (
                <>
                    Advance Payment
                    <br /> {paymentAndInclusions.month_advance} Month{' '}
                    {paymentAndInclusions.month_advance > 1 && 's'}
                </>
            ),
        },
    ]

    paymentAndInclusions.inclusions.forEach((inclusion) => {
        paymentOptions.push(inclusion)
    })

    return <ChipBig items={paymentOptions} clickable={false} />
}

export default PaymentAndInclusion
