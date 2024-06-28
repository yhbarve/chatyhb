import { useEffect, useState, useRef } from 'react'
import Prompt from '../components/Prompt';
import Response from '../components/Response';
import List from '../components/List';
import Navbar from '../components/Navbar';
import axios from "axios"
import { useParams } from "react-router-dom"
import ChatNavbar from '../components/ChatNavbar';
import Chats from '../components/Chats';
import Placeholder from '../components/Placeholder';
import { Audio, ColorRing } from 'react-loader-spinner'

export default function ChatPage(){
    const [user, setUser] = useState("");
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [promptList, setPromptList] = useState([""]);
    const [responseList, setResponseList] = useState([""]);
    const [chatList, setChatList] = useState("");
    const inputRef = useRef(null);
    const { id }  = useParams();
    const URL="https://chatyhb-api.vercel.app";

    useEffect(() => {
        axios.get(URL+'/request/bloglist/'+id, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response.data.response);
            setChatList(response.data.response);
        });
    }, [promptList]);

    useEffect(() => {
        axios.get(URL+'/user/'+id, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response) => {
            setUser(response.data.username)
        })
    }, []);

    async function handleSubmit(){
        const currentPrompt = inputRef.current.textContent;
        console.log("Prompt is: " + currentPrompt);
        setLoading(true);

        try {
        const response = await axios.post('https://chatyhb-api.vercel.app/request', {
            userId: id,
            prompt: currentPrompt,
        }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
        console.log(response.data.answer);

        // Update lists
        setPromptList((prevPromptList) => [...prevPromptList, currentPrompt]);
        setResponseList((prevResponseList) => [...prevResponseList, response.data.answer]);
        console.log(promptList);
        console.log(responseList);
        setLoading(false);
        // Clear the input
        inputRef.current.textContent = '';
        setPrompt('');
    } catch (error) {
        console.error('Error submitting prompt:', error);
    }
    }

    return (
        <div className=''>
            <ChatNavbar name={user} userId={id} />
            <div className='flex flex-col justify-center gap-12 items-center h-screen'>
            {/* {(promptList.length > 0) && <List promptList={promptList} responseList={responseList} />} */}
            {loading && 
            <div className="flex flex-col items-center">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#000000']}
                />
                <div>ChatYHB is thinking...</div>
            </div>} 
            {!loading && (promptList.length > 0) && <Chats chatList={chatList} user={user} />}
            {!loading && (promptList.length < 1) && <Placeholder />}
                <div className='flex gap-5 justify-center items-end w-full border-t border-teal-500 py-6 px-6 xl:px-48 fixed bottom-0 bg-white '>
                    <div ref={inputRef} className="input-box border border-black rounded p-2 w-[75%] z-10" contentEditable="true" placeholder="Message ChatYHB..." onInput={() => {
                        setPrompt(inputRef.current.textContent);
                    }}></div>
                    <button onClick={handleSubmit} className='bg-teal-500 px-6 rounded hover:bg-teal-600 text-white font-medium w-fit py-2'>Send</button>
                </div>
            </div>
        </div>
    )
}