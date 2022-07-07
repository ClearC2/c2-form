declare type OptionalPropertyOf<T extends object> = Exclude<{
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
}[keyof T], undefined>;
export default function useValues<T extends object>(initialValues: T, currentValues?: T): {
    initialValues: T;
    currentValues: T;
    setInitialValues: (initialValues: T, currentValues?: T) => void;
    setValue: <K extends keyof T>(field: K, value: T[K]) => void;
    setValues: (values: Partial<T> | ((values: T) => T)) => void;
    deleteField: (field: OptionalPropertyOf<T>) => void;
    reset: () => void;
    deleteFields: (fields: OptionalPropertyOf<T>[]) => void;
    isClean: boolean;
    isDirty: boolean;
};
export {};
