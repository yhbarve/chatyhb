import Prompt from "./Prompt";
import Response from "./Response";

export default function Chats({chatList, user}){
    return(
        <div className='w-full flex flex-col-reverse px-6 xl:px-48 overflow-scroll mt-32 md:mt-20 pb-24 z-1'>
            {chatList.length > 0 && chatList.map((element) => {
                console.log("ELEMENT!");
                console.log(element);
                return(
                    <div className="flex flex-col gap-1 py-6">
                        <div className='flex justify-end break-normal'><Prompt promptText={element.prompt} user={user} /></div>
                        <div className='flex justify-start break-normal'><Response responseText={element.response} /></div>
                    </div>
                    // <div className={element.fromPromptList ? 'flex justify-end break-normal' : 'flex justify-start'}>
                    // {element.fromPromptList ? <Prompt promptText={element.item} /> : <Response responseText={element.item} />}
                    // </div>
                )    
            })}
        </div>
    )
}