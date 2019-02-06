export const SET_INITIAL_VALUES = 'c2-form/SET_INITIAL_VALUES'
export const setInitialValues = (formName, values) => ({type: SET_INITIAL_VALUES, formName, values})

export const SET_VALUE = 'c2-form/SET_VALUE'
export const setValue = (formName, field, value) => ({type: SET_VALUE, formName, field, value})

export const SET_VALUES = 'c2-form/SET_VALUES'
export const setValues = (formName, values) => ({type: SET_VALUES, formName, values})

export const RESET = 'c2-form/RESET'
export const reset = formName => ({type: RESET, formName})

export const DELETE_FIELD = 'c2-form/DELETE_FIELD'
export const deleteField = (formName, field) => ({type: DELETE_FIELD, formName, field})

export const DELETE_CURRENT_FORM = 'c2-form/DELETE_CURRENT_FORM'
export const deleteCurrentForm = formName => ({type: DELETE_CURRENT_FORM, formName})

export const DELETE_TARGET_FORM = 'c2-form/DELETE_TARGET_FORM'
export const deleteTargetForm = targetForm => ({type: DELETE_TARGET_FORM, targetForm})
