import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, FieldValues, Control, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'name';
  onValueChange?: (value: any) => void;
  fieldType?: 'input' | 'select';
  selectOptions?: { value: string; label: string }[];
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  onValueChange,
  fieldType = 'input',
  selectOptions = [],
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          {fieldType === 'input' ? (
            <Input
              type={type}
              className="input"
              placeholder={placeholder}
              {...field}
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                if (onValueChange) {
                  onValueChange(e.target.value);
                }
              }}
            />
          ) : (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                if (onValueChange) {
                  onValueChange(value);
                }
              }}
              defaultValue={field.value}
              value={field.value || ''}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {selectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;