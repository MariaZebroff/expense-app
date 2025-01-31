
import './Button.css'

interface ButtonProps  {
    text: string;
    btntype?: "button" | "submit" | "reset";
    handleClick?: () => void;
    mode: "light" | "dark" | "light-nav"| 'link';
    size: "sm" | "md" | "link"
}
const Button =({text, btntype, handleClick, mode, size}:ButtonProps)=>{
    const handleButtonClick = ()=>{
        if(handleClick) handleClick();
    }
  
    return <button type={btntype} onClick={handleButtonClick} className ={mode + " " + (text === "*" && " edit ") + " btn " + (text === "-" && " trash ") +" btn-" +size} >{(text !== "-" && text !== "*") && text}</button>
}

export default Button;