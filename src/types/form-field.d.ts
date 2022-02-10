declare interface FormField {
  label: string
  value: string
  error?: string;
  setValue: (value: string) => void;
}