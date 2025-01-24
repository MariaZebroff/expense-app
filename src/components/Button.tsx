
import './Button.css'

interface ButtonProps  {
    text: string;
    btntype?: "button" | "submit" | "reset";
    handleClick?: () => void;
    mode: "light" | "dark";
    size: "sm" | "md" | "lg"
}
const Button =({text, btntype, handleClick, mode, size}:ButtonProps)=>{
    const handleButtonClick = ()=>{
        if(handleClick) handleClick();
    }
  
    return <button type={btntype} onClick={handleButtonClick} className ={mode + " btn " + (text === "-" && " trash ") +" btn-" +size} >{text !== "-" && text}</button>
}

export default Button;