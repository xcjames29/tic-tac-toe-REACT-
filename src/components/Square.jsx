

export default function Square(props){
    return(
        <button onClick={(e)=>props.pindot(props.index)} className={props.value==="X"?"x":"o"}>{props.value}</button> 
    )
}