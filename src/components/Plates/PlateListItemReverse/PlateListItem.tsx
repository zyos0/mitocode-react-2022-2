import {Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {Delete, Edit, Fastfood} from "@mui/icons-material";
import {ListItemComponent} from "../../CustomList/CustomList";
import {Plate} from "../../../types/Plate";



const PlateListItem:React.FC<ListItemComponent<Plate>> = ({item, onUpdate, onDelete})=>{
    return <ListItem key={item.id}>
        <Avatar>
            <Fastfood/>
        </Avatar>

        <ListItemText
            secondary={item.name}
             primary={item.price}
        />


        <ListItemSecondaryAction>

            <IconButton onClick={() => onDelete(item)}>
                <Delete/>
            </IconButton>
            <IconButton onClick={() => onUpdate(item)}>
                <Edit/>
            </IconButton>
        </ListItemSecondaryAction>


    </ListItem>
}

export default PlateListItem