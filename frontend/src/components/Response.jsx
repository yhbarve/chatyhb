import convertToHTML from 'markdown-to-html-converter'
import parse from 'html-react-parser'
import Markdown from 'react-markdown'
import Typewriter from './Typewriter';

export default function Response({responseText}){
    const mdText = convertToHTML(responseText);
    return (
        <div className="p-2 w-full xl:max-w-[50%] break-words rounded-2xl overflow-wrap bg-stone-200 text-lg">
            <div className="flex flex-col">
                <div className="text-xs font-bold mb-2 bg-teal-500 rounded text-white w-fit px-1">ChatYHB</div>
                <Markdown>{responseText}</Markdown>
            </div>
        </div>
    )
}