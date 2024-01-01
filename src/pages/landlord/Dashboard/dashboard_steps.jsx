import styles from './Dashboard.module.css'

export const steps = [
    {
        selector: '#total_units_count',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Total Units</p>
                <p>
                    The overall count of all registered units in your account.
                </p>
            </div>
        ),
    },
    {
        selector: '#listed_units_count',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Listed Units</p>
                <p>
                    The count of your units that are open for rent and available
                    on public searches.
                </p>
            </div>
        ),
    },
    {
        selector: '#unlisted_units_count',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Unlisted Units</p>
                <p>
                    The count of your units that are currently not open for
                    potential tenants or hidden from the public searches.
                </p>
            </div>
        ),
    },
    {
        selector: '#occupied_units_count',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Occupied Units</p>
                <p>
                    The count of your units that are fully occupied and no
                    longer available for potential tenants.
                </p>
            </div>
        ),
    },
    {
        selector: '#pending_units_count',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Pending Units</p>
                <p>
                    The total units undergoing verification or awaiting approval
                    from the admin before becoming listed.
                </p>
            </div>
        ),
    },
    {
        selector: '#tenants_count',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Tenants</p>
                <p>
                    The total count of your tenants that are currently renting
                    on your units.
                </p>
            </div>
        ),
    },
    {
        selector: '#upcoming_due_dates',
        content: (
            <div className={styles['tourcontainer']}>
                <p className="title">Upcoming Due Dates</p>
                <p>A list of renters' upcoming due dates.</p>
            </div>
        ),
    },
]
