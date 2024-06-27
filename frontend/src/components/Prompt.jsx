export default function Prompt({promptText, user}){
    console.log(promptText);
    return(
        <div className="bg-teal-200 border rounded-2xl p-2 w-full xl:max-w-[50%] break-words overflow-wrap text-lg">
            <div className="flex flex-col">
                <div className="text-xs font-bold mb-2 bg-teal-500 rounded text-white w-fit px-1">{user}</div>
                {promptText} 
            </div>
        </div>
    )
}