export default function useValues<T>(initialValues: T, currentValues?: T): {
    initialValues: T;
    currentValues: T;
    setInitialValues: (initialValues: T, currentValues?: T) => void;
    setValue: <K extends keyof T>(field: K, value: T[K]) => void;
    setValues: (values: Partial<T> | ((values: T) => T)) => void;
    deleteField: <K_1 extends keyof T>(field: K_1) => void;
    reset: () => void;
    deleteFields: <K_2 extends keyof T>(fields: (keyof T)[]) => void;
    isClean: boolean;
    isDirty: boolean;
};
