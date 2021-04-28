export default function HistoryBtn(props){
    return(
        <p className={props.history?"":"hidden"}>{props.num}<button className="historyBtn" onClick={(e)=>props.goHistory(props.history)}>{props.messege}</button></p>
    )
}