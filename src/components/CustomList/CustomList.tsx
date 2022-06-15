import {List} from "@mui/material";

import PlateListItem from "../Plates/PlateListItem";

export interface ListItemInterface {
    id: number | string
}

export interface ListItemComponent<T extends ListItemInterface> {
    item: T;
    onUpdate: (item: T) => void;
    onDelete: (item: T) => void;
}

export interface ListProps<T extends ListItemInterface>{
    collection:T[];
    onUpdate: (item: T) => void;
    onDelete: (item: T) => void;
    renderAs: React.FC<ListItemComponent<T>>
}

const CustomList  = <T extends ListItemInterface>(props:ListProps<T>) => {
    const {collection, onUpdate, onDelete, renderAs} = props
    return (
        (<List>
            {collection.map(item => {
                return renderAs({item, onDelete, onUpdate})
            })}
        </List>)

    )
}

export default CustomList