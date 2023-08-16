import { Fragment, useCallback } from 'react'
import { useSnackbar } from 'notistack'

import MyIconButton from '../components/Button/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const useNotistack = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    // customized
    const action = useCallback(
        (key) => (
            <Fragment>
                <MyIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <CloseIcon fontSize="small" />
                </MyIconButton>
            </Fragment>
        ),
        [closeSnackbar]
    )

    const notify = useCallback(
        (msg = '{notification message}', variant) => {
            let title
            if (variant === 'success') title = 'Success'
            if (variant === 'warning') title = 'Warning'
            if (variant === 'error') title = 'Error'
            // eslint-disable-next-line
            if (variant === 'info') title = 'Info'

            const content = (
                <div>
                    {/* <h6>{title}</h6> */}
                    <p>{msg}</p>
                </div>
            )
            // variant could be success, error, warning, info, or default
            enqueueSnackbar(content, {
                variant,
                autoHideDuration: 4000,
                action,
            })
        },
        [enqueueSnackbar, action]
    )

    // customized
    const actionForCollapse = useCallback(
        (key) => (
            <Fragment>
                <MyIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <CloseIcon fontSize="small" />
                </MyIconButton>
            </Fragment>
        ),
        [closeSnackbar]
    )

    const notifyWithCollapse = useCallback(
        (msg = '{notification message}', variant) => {
            let title
            if (variant === 'success') title = 'Success'
            if (variant === 'warning') title = 'Warning'
            if (variant === 'error') title = 'Error'
            // eslint-disable-next-line
            if (variant === 'info') title = 'Info'

            const content = (
                <div>
                    {/* <h5>{title}</h5> */}
                    <p>{msg}</p>
                </div>
            )
            // variant could be success, error, warning, info, or default
            enqueueSnackbar(content, {
                variant,
                autoHideDuration: 600000,
                action: actionForCollapse,
            })
        },
        [enqueueSnackbar, actionForCollapse]
    )

    return {
        notify,
        notifyWithCollapse,
    }
}

export default useNotistack
