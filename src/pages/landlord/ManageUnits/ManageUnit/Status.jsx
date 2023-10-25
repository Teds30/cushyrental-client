import StatusChip from '../../../../components/StatusChip/StatusChip'

const Status = (props) => {
    const { unitRequestStatus } = props

    let status

    if (unitRequestStatus === 0) {
        status = { type: 'pending', status: 'PENDING' }
    } else if (unitRequestStatus === 1) {
        status = { type: 'success', status: 'LISTED' }
    } else if (unitRequestStatus === 2) {
        status = { type: 'cancel', status: 'UNLISTED' }
    } else {
        status = { type: 'danger', status: 'REJECTED' }
    }

    return (
        <StatusChip type={status.type}>
            {status.status[0].toUpperCase() + status.status.slice(1)}
        </StatusChip>
    )
}

export default Status
