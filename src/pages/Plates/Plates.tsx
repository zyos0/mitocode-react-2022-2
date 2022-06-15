import Layout from '../../Layout';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PlatesActions} from "../../store/actions/plates";
import {Avatar, Button, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import UpdatePlateModal from "../../components/Plates/UpdatePlateModal";
import {Plate} from "../../types/Plate";
import {plateListSelector} from "../../store/selectors/plates";
import {Delete, Edit, Fastfood} from "@mui/icons-material";
import DeletePlateModal from "../../components/Plates/DeletePlateModal";

const Plates = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(PlatesActions.getPlates())
    }, [dispatch])


    const plateList = useSelector(plateListSelector)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [updatePlate, setUpdatePlate] = useState<Plate>()


    const handleUpdate = (item: Plate) => {
        setUpdatePlate(item);
        setShowCreateDialog(true)
    }


    const handleDelete = (item: Plate) => {
        setUpdatePlate(item);
        setShowDeleteDialog(true)
    }

    const handleUpdateOnDismiss = () => {
        setUpdatePlate(undefined)
        setShowCreateDialog(false)
    }

    const handleDeleteOnDismiss = () => {
        setUpdatePlate(undefined)
        setShowDeleteDialog(false)
    }

    return (
        <>
            <UpdatePlateModal open={showCreateDialog} onClose={handleUpdateOnDismiss}
                              plate={updatePlate}
            />
            <DeletePlateModal open={showDeleteDialog} onClose={handleDeleteOnDismiss} plate={updatePlate}/>


            <Layout>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Plates</h1>
                        <Button variant="contained" onClick={() => setShowCreateDialog(true)}>
                            Add new Plate
                        </Button>
                    </Grid>


                    <Grid item xs={9}>
                        {plateList && plateList.length &&
                            (<List>
                                {plateList.map(item => {
                                    return (
                                        <ListItem key={item.id}>
                                            <Avatar>
                                                <Fastfood/>
                                            </Avatar>

                                            <ListItemText
                                                primary={item.name}
                                                secondary={item.price}
                                            />


                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => handleUpdate(item)}>
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(item)}>
                                                    <Delete/>
                                                </IconButton>
                                            </ListItemSecondaryAction>


                                        </ListItem>
                                    )
                                })}
                            </List>)


                        }
                    </Grid>

                </Grid>
            </Layout>
        </>
    );
};

export default Plates;
