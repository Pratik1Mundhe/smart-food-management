import { observer } from "mobx-react";
interface TextareaProps {
  cols: number;
  rows: number;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}
const Textarea: React.FC<TextareaProps> = (props) => {
  const { cols, rows, placeholder, value, onChange } = props;
  return (
    <textarea
      className="border-[2px] text-sm outline-none border-gray-300 p-2 rounded-sm"
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
        onChange(event?.target.value)
      }
    />
  );
};

export default observer(Textarea);
