import StatusChip from "../../../components/StatusChip/StatusChip";

const FavoritesStatus = (props) => {
    const { unitRequestStatus } = props;

    // console.log(unitRequestStatus);

    const status = (unitRequestStatus === 0 || unitRequestStatus === null) ? { type: 'danger', status: 'FULLY OCCUPIED' } : null;

    return status ? (
        <StatusChip type={status.type}>
            {status.status[0].toUpperCase() + status.status.slice(1)}
        </StatusChip>
    ) : null;
};

export default FavoritesStatus;
