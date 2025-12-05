type AutocompleteInputProps = {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (val: string) => void;
};