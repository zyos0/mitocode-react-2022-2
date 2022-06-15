import {Breakpoint, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import React from "react";
import {LoadingButton} from "@mui/lab";

interface ModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
    title:string;
    confirmIcon?:ReactJSXElement,
    children:ReactJSXElement,
    updateInProgress?:boolean
    cancelLabel?:string;
    confirmLabel?:string;
    size?:Breakpoint
}

const Modal:React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmIcon,
    updateInProgress=false,
    cancelLabel='Cancel',
    confirmLabel='Accept',
    size='sm'
                                    }) =>{
    return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth={size}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
            <Button color="error" variant="outlined" onClick={onClose}>Cancel</Button>
            <LoadingButton
                loading={updateInProgress}
                loadingPosition="start"
                startIcon={confirmIcon}
                variant="outlined"
                onClick={onConfirm}>Confirm</LoadingButton>
        </DialogActions>
    </Dialog>
    )
}


export default Modal