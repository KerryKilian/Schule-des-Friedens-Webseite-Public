interface Props {
    id: string;
    placeholder: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    label: string;
    value: string;
    inputClassName: string;
    labelClassName: string;
    textarea?: boolean;
    rows?: number;
  }

export default function Input({id, placeholder, type, onChange, label, value, inputClassName, labelClassName, textarea=false, rows=5}: Props) {
  return (
    <div className="question">
      {/* <label htmlFor={id} className={labelClassName}>
        {label}
      </label> */}
      {textarea ? <textarea
        id={id}
        className={inputClassName}
        value={value}
        placeholder={placeholder}
        onChange={
          onChange
        }
        rows={rows}
      /> : <input
      id={id}
      className={inputClassName}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={
        onChange
      }
    />}
      
    </div>
  )
}
  