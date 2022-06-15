import {Plate} from "../../../types/Plate";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createPlateInProgressSelector, updatePlateInProgressSelector} from "../../../store/selectors/plates";
import Modal from "../../Modal";
import {TextField} from "@mui/material";
import {Save} from "@mui/icons-material";
import {PlatesActions} from "../../../store/actions/plates";

interface UpdatePlateModalProps {
    plate?: Plate;
    open: boolean;
    onClose: () => void
}

const UpdatePlateModal: React.FC<UpdatePlateModalProps> = ({plate, open, onClose}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [updateAttempt, setUpdateAttempt] = useState(false)
    const updateInProgress = useSelector(updatePlateInProgressSelector)
    const createInProgress = useSelector(createPlateInProgressSelector)
    const creationMode = !plate
    const confirmLabel = creationMode ? 'Create' : 'Update'
    const title = `${confirmLabel} Plate`
    const dispatch = useDispatch()

    useEffect(() => {
        if (!plate) {
            setName('')
            setPrice('')
            return
        }

        setName(plate.name)
        setPrice(plate.price.toString())
    }, [plate])

    useEffect(() => {
        if (!updateAttempt) return
        if (!(updateInProgress || createInProgress)) {
            onClose();
            setUpdateAttempt(false);
            setName('')
            setPrice('')
        }
    }, [createInProgress, updateAttempt, onClose, updateInProgress])

    const handleConfirm = (payload: Partial<Plate>, currentPlate: Plate | undefined) => {
        const payloadCandidate: Plate = creationMode
            ? ({...payload, status: true} as Plate)
            : ({...currentPlate, ...payload} as Plate)


        const dispatchAction = creationMode
            ? PlatesActions.createPlate
            : PlatesActions.updatePlate

        // @ts-ignore
        dispatch(dispatchAction(payloadCandidate))
        setUpdateAttempt(true)


    }

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            onConfirm={() => handleConfirm({name, price: Number(price)}, plate)}
            title={title}
            confirmLabel={confirmLabel}
            updateInProgress={updateInProgress || createInProgress}
            confirmIcon={<Save/>}
        >

            <>
                <TextField
                    type="text"
                    fullWidth
                    margin="dense"
                    label="Plate Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <TextField
                    type="text"
                    fullWidth
                    margin="dense"
                    label="Plate Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </>


        </Modal>
    )
}

export default UpdatePlateModal