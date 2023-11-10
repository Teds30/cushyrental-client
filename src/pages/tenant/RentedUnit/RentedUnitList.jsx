import React, { useEffect, useState } from 'react'
import RentedUnit from './RentedUnit'

import styles from './RentedUnitList.module.css'

const RentedUnitList = (props) => {
    const { rentedUnit:units, onRefresh} = props;
    const [rentedUnit, setRentedUnit] = useState(units);

    // console.log(rentedUnit);
    const SubmitReviewHandler = (review) => {
      // console.log(review);
        const updatedRentedUnit = rentedUnit.map((rental) => {
          if (rental.user_id === review.user_id) {
            if (rental.unit && rental.unit.reviews) {
              rental.unit.reviews.map(review => {});
            }
          }
          return rental; // Return the rental object after making changes
        });
      
        setRentedUnit(updatedRentedUnit);
      }

    const content = rentedUnit ? (
        units.map((rental) => (
            <RentedUnit key={rental.id} rental={rental} onSubmittedReview={SubmitReviewHandler} onRefresh={onRefresh} />
        ))
    ) : (
        <p style={{ textAlign: 'center' }}>No results.</p>
    )
    return <div className={styles['container']}>{content}</div>
}

export default RentedUnitList
