import {Client} from "../../../types/Client";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteClientInProgressSelector,

} from "../../../store/selectors/clients";
import Modal from "../../Modal";
import {Delete} from "@mui/icons-material";
import {ClientsActions} from "../../../store/actions/clients";

interface UpdateClientModalProps {
    client: Client;
    open: boolean;
    onClose: () => void
}

const DeleteClientModal: React.FC<UpdateClientModalProps> = ({client, open, onClose}) => {

    const [deleteAttempt, setDeleteAttempt] = useState(false)
    const deleteInProgress = useSelector(deleteClientInProgressSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!deleteAttempt) return
        if (!(deleteInProgress)) {
            onClose();
            setDeleteAttempt(false);
        }
    }, [deleteInProgress, deleteAttempt, onClose])

    const handleOnConfirm = (client: Client) => {
        // @ts-ignore
        dispatch(ClientsActions.deleteClient(client.id))
        setDeleteAttempt(true)
    }
    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            onConfirm={() => handleOnConfirm(client)}
            title="Delete Client"
            confirmLabel="Delete"
            updateInProgress={deleteInProgress}
            confirmIcon={<Delete/>}
        >

            <span>Are you sure you want to delete {client?.firstName} {client?.lastName} ?</span>


        </Modal>
    )
}

export default DeleteClientModal