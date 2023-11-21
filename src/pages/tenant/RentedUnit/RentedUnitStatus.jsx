import StatusChip from '../../../components/StatusChip/StatusChip'

const RentedUnitStatus = (props) => {
    const { unitRequestStatus } = props

    let status;

    if (unitRequestStatus === 1) {
        status = { type: 'success', status: 'ACTIVE' };
    } else if (
        unitRequestStatus === 0 ||
        unitRequestStatus === 2 ||
        unitRequestStatus === 3 ||
        unitRequestStatus === 4
    ) {
        status = { type: 'danger', status: 'INACTIVE' };
    }

    
    return (
        <StatusChip type={status.type}>
            {status.status[0].toUpperCase() + status.status.slice(1)}
        </StatusChip>
    )
}

export default RentedUnitStatus
