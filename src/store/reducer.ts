import { ReducerAction } from '../types/reducer';

const actionTypes = {
    add: 'add',
    edit: 'edit',
    delete: 'delete',
    startEdit: 'startEdit',
};

const add = (payload: any) => {
    return {
        type: actionTypes.add,
        payload,
    };
};

const edit = (payload: any) => {
    return {
        type: actionTypes.edit,
        payload,
    };
};
const del = (payload: any) => {
    return {
        type: actionTypes.delete,
        payload,
    };
};
const startEdit = (payload: any) => {
    return {
        type: actionTypes.startEdit,
        payload,
    };
};

export const ActionCreators = {
    add,
    startEdit,
    edit,
    delete: del,
};

export const YoutubeListReducer = (state: any, action: ReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.add:
            return {
                ...state,
                list: state.list.concat(payload),
            };

        case actionTypes.edit:
            return {
                ...state,
                list: state.list.map((entry: any) =>
                    entry.id === payload.id ? payload : entry
                ),
            };

        case actionTypes.delete:
            return {
                ...state,
                list: state.list.filter(
                    (entry: any) => entry.id !== payload.id
                ),
            };

        case actionTypes.startEdit:
            return {
                ...state,
                entryToUpdate: payload,
            };
    }
};

export const youtubeInitialState = {
    list: [],
    entryToUpdate: undefined,
};
