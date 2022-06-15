import Layout from '../../Layout';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ClientsActions} from "../../store/actions/clients";
import {Avatar, Button, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import UpdateClientModal from "../../components/Clients/UpdateClientModal";
import {Client} from "../../types/Client";
import {getClientsListInProgressSelector, clientListSelector} from "../../store/selectors/clients";
import DeleteClientModal from "../../components/Clients/DeleteClientModal";
import CustomList from "../../components/CustomList";
import ClientListItem from "../../components/Clients/ClientListItem";
import EmptyState from "../../components/EmptyState/EmptyState";
import LoadingState from "../../components/LoadingState/LoadingState";

const Clients = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(ClientsActions.getClients())
    }, [dispatch])


    const clientList = useSelector(clientListSelector)
    const fetchingClients = useSelector(getClientsListInProgressSelector)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [updateClient, setUpdateClient] = useState<Client>()


    const handleUpdate = (item: Client) => {
        setUpdateClient(item);
        setShowCreateDialog(true)
    }


    const handleDelete = (item: Client) => {
        setUpdateClient(item);
        setShowDeleteDialog(true)
    }

    const handleUpdateOnDismiss = () => {
        setUpdateClient(undefined)
        setShowCreateDialog(false)
    }

    const handleDeleteOnDismiss = () => {
        setUpdateClient(undefined)
        setShowDeleteDialog(false)
    }

    return (
        <>
            <UpdateClientModal open={showCreateDialog} onClose={handleUpdateOnDismiss}
                              client={updateClient}
            />
            <DeleteClientModal open={showDeleteDialog} onClose={handleDeleteOnDismiss} client={updateClient}/>


            <Layout>
                {fetchingClients && (
                    <LoadingState message="Loading Clients..."/>
                )}
                {!fetchingClients && (<Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Clients</h1>
                        <Button variant="contained" onClick={() => setShowCreateDialog(true)}>
                            Add new Client
                        </Button>
                    </Grid>


                    {(clientList && clientList.length > 0 ) ? (
                        <Grid item xs={9}>
                                <CustomList<Client>
                                    collection={clientList}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}
                                    renderAs={ClientListItem}
                                />
                        </Grid>
                    ):
                        (<EmptyState message='No Clients Available'/>)
                    }


                </Grid>)}

            </Layout>
        </>
    );
};

export default Clients;
