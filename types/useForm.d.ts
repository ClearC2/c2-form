export default function useForm(initValues: any): {
  initialValues: any;
  currentValues: any;
  setInitialValues: (initialValues: any, currentValues?: any) => void;
  setValue: (field: string, value: any) => void;
  setValues: (values: any | ((values: any) => any)) => void;
  deleteField: (field: string) => void;
  reset: () => void;
  deleteFields: (fields: string[]) => void;
  isClean: boolean;
  isDirty: boolean;
};
