import { createAction } from 'redux-actions';

export const ApplicationActionTypes = {
  DispatchAction: '[APPLICATION] - DISPATCH ACTION',
}

export const DispatchAction = createAction(ApplicationActionTypes.DispatchAction);