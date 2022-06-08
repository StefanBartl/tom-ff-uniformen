export default function PrintButton(){
    return (
        <div>
            <button className='print-button' onClick={()=>{window.print()}} title='Drucke die Seite aus'>print</button>
        </div>
    )
};