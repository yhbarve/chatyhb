import Prompt from './Prompt';
import Response from './Response';
export default function List({promptList, responseList}){
    console.log(promptList);
    console.log("&");
    console.log(responseList);
    let combinedList = [];
    for (let i = 0; i < promptList.length; i++){
        combinedList.push({item: promptList[i], fromPromptList: true});
        combinedList.push({item: responseList[i], fromPromptList: false});
    }

    console.log(combinedList);

    return(
        <div className='w-full flex flex-col-reverse gap-5 px-48 overflow-scroll mt-24 mb-36 z-1'>
            {combinedList.length > 2 && combinedList.slice(1,).reverse().map((element) => {
                console.log("HELLO!");
                return(
                    <div className={element.fromPromptList ? 'flex justify-end break-normal' : 'flex justify-start'}>
                    {element.fromPromptList ? <Prompt promptText={element.item} /> : <Response responseText={element.item} />}
                    </div>
                )    
            })}
        </div>
    )
}