import useValues from './useValues';
import useForm from './useForm'

type Values<T> = ReturnType<typeof useValues<T>>;

export {useValues, useForm, Values};
