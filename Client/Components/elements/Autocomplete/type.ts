export type AutocompleteInputProps = {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (val: string) => void;
  LetterLimit : number
  width? : string
};