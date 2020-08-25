import { Funcionario } from '../models/funcionario.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Rh } from '../models/rh.model';
import { RhAction, RhActionTypes } from '../actions/rh.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface rhState extends EntityState <Rh>{

    funcionario: Funcionario;
    modoTela: String;
    rh:Rh;
}

export const adapter : EntityAdapter<Rh> = createEntityAdapter<Rh>();

export const initialState: rhState = adapter.getInitialState({
    funcionario: new Funcionario(),
    modoTela : 'CADASTRAR',
    rh: new Rh()
})

export function reducer(state = initialState, action: RhAction): rhState {
    switch(action.type){
        case RhActionTypes.AddFuncionario:{
            return {...state, funcionario: action.rh.funcionario}
        }
        case RhActionTypes.ModoTela:{
            return {... state, modoTela: action.modo}
        }

        case RhActionTypes.AddRh:{
            return {... state, rh: action.rh}
        }
        default :{
            return state;
        }
    }   
}

export const selectFeature = createFeatureSelector<rhState> ('rh');

export const selectFuncionario = createSelector(
    selectFeature,
    (state: rhState) => state.funcionario
);
export const selectRh = createSelector(
    selectFeature,
    (state: rhState) => state.rh
);

export const selectModoTela = createSelector(
    selectFeature,
    (state: rhState) => state.modoTela
);

export const{
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();
