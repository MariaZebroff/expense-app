import './Input.css'

interface InputProps  {
    labelText: string;
    inputType: string;
    inputName: string;
    min?: number;
    max?: number;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string
}
const Input =({labelText, inputType, inputName, value, min, handleChange}:InputProps)=>{
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        handleChange(event);
    }

    return <div className=" py-2 flex flex-col">
    <label htmlFor={inputName} className="block text-sm/6 font-small input-label">{labelText}</label>
    <input {...(min !== undefined ? { min } : {})}  type={inputType} name={inputName} id={inputName} value={value} onChange={handleInputChange} className = "block min-w-0 grow p-1  focus:outline-none input-field"/>
    </div>
}

export default Input;