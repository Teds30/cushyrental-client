import StatusChip from '../../../components/StatusChip/StatusChip'

const RentedUnitStatus = (props) => {
    const { unitRequestStatus } = props

    const status = unitRequestStatus !== null ? { type: 'success', status: 'ACTIVE' } : { type: 'danger', status: 'INACTIVE' };
    
    return (
        <StatusChip type={status.type}>
            {status.status[0].toUpperCase() + status.status.slice(1)}
        </StatusChip>
    )
}

export default RentedUnitStatus
