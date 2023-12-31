import { useState, useEffect } from 'react'
import useImageManager from '../../../../../../hooks/data/image-hook'
import CheckBox from '../../../../../../components/CheckBox/CheckBox'

import styles from './EditFacilities.module.css'

const FacilityOthers = (props) => {
    const { facilityOthers, onOtherFacilities, others } = props

    const { fetchIcon, isLoading } = useImageManager()
    const [otherFacilities, setOtherFacilities] = useState([])
    const [selectedFacilities, setSelectedFacilities] = useState(
        others.length !== 0
            ? others.map((facility) => {
                  return facility.id
              })
            : []
    )

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const promise = facilityOthers.map(async (facility) => {
                    const res = await fetchIcon(facility.icon)
                    return { ...facility, icon: res }
                })

                const newOtherUpdate = await Promise.all(promise)
                console.log(newOtherUpdate)
                setOtherFacilities(newOtherUpdate)
            } catch (err) {}
        }
        handleFetch()
    }, [])

    useEffect(() => {
        const toParentComponent = () => {
            onOtherFacilities(selectedFacilities)
            return
        }

        toParentComponent()
    }, [selectedFacilities])

    return isLoading && otherFacilities.length === 0
        ? 'adsfdsf'
        : otherFacilities.map((facility, index) => {
              return (
                  <div
                      key={facility.id}
                      className={`${styles['other-container']} ${
                          index === 0 && styles['facility-container']
                      }`}
                  >
                      <div className={`${styles['facility-row']}`}>
                          <div className={`${styles['facility-col']}`}>
                              <div className={`${styles['facility-icon']}`}>
                                  <div
                                      dangerouslySetInnerHTML={{
                                          __html: facility.icon,
                                      }}
                                  />
                              </div>

                              <p>{facility.name}</p>
                          </div>
                          <CheckBox
                              items={[{ id: facility.id, name: '' }]}
                              selectedValue={selectedFacilities}
                              onSelectedUsers={setSelectedFacilities}
                          />
                      </div>

                      <div className={styles['hr']}></div>
                  </div>
              )
          })
}

export default FacilityOthers
