import React from "react";
import axios from 'axios'
import { useState } from "react";

import photo from './profilePhoto.jpeg'
import Loading from './loading.gif'
const App = () => {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const pressEnter = (e) =>{
    if(e.key=='Enter'){
      sendPrompt()
    }
    
  }

  const sendPrompt = async () => {
    setLoading(true)
    console.log('sendPrompt')
    const api_key = import.meta.env.VITE_API_KEY;
    const payload = { "contents": [{ "parts": [{ "text": message }] }] }
    setMessages(prevData => ([...prevData, message]))
    setMessage('')
    const res = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`, payload)
    const resText = res?.data?.candidates[0]?.content?.parts[0]?.text
    console.log('res', resText)
    setMessages(prevData => ([...prevData, resText]))
    setLoading(false)

  }

  return (
    <div className={`h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500  charu ${messages.length > 0 ? `grid grid-rows-[80px_auto_80px]` : ''} pb-4`}>
      
      <div className={`flex items-center p-4 bg-transparent shadow-md navbar ${messages.length > 0 ? '' : 'hidden'} `} >
        <img
          // src="https://chanakya-das-sahu.netlify.app/Photos/Chanakya.jpg"
          src={photo}
          alt="Chanakya"
          className="w-12 h-12 rounded-full border-2 border-purple-500"
        />
        <h2 className="ml-4 text-xl font-bold text-white">
          Chandani's Chatbot
        </h2>
      </div>

      <div className={`container flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100 mid bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500  ${messages.length > 0 ? '' : 'hidden'} `} >
        {messages.map((obj, ind) => (
          <>
            
            {(ind % 2 == 0) &&
              <div className={`flex justify-start`}>
                <div className="p-2 bg-purple-200 text-purple-900 rounded-lg w-auto max-w-[1100px]">
                  {obj}
                </div>
              </div>
            }

            {(ind % 2 != 0) &&
              <div className="flex justify-end ">
                <div className="p-2 bg-blue-200 text-blue-900 rounded-lg w-auto max-w-[1100px]">
                  {obj}
                </div>
              </div>
            }

          </>
        ))

     

        
        }
       

        {loading &&
          <div className="flex justify-end">
            <img src={Loading} width="200px" height="100px" />
           
          </div>
        }
       
      </div>


      <div className={`w-full flex flex-col justify-center items-center my-[50px] ${messages.length > 0 ? 'hidden' : ''} `}>
        <img
          src={photo}
          alt="Chandani"
          className="w-[150px] h-[150px] rounded-[100%] border-2 border-purple-500 bg-transparent "
        />

        <h2 className="ml-4 mt-[10px] text-xl font-bold text-white">
          Chandani's Chatbot
        </h2>


        <h1 className="ml-4 text-[50px] font-bold text-white">
          What Can I Help You !
        </h1>
        <br />

        <div className={`w-[600px] h-[80px] px-[20px]  py-[30px] bg-white shadow-md rounded-full mx-[10px] flex items-center max-w-full`}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onKeyDown={(e)=>{pressEnter(e)}}
            onChange={(e) => { setMessage(e.target.value) }}
            className="px-[10px] py-[10px] flex-grow w-full h-[40px] my-[100px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600" disabled={message == ''} onClick={sendPrompt}>
            Send
          </button>
        </div>
      </div>


      <div className={`p-4 bg-white shadow-md flex items-center rounded-full mx-[30px]  ${messages.length > 0 ? '' : 'hidden'}`}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onKeyDown={(e)=>{pressEnter(e)}}
          onChange={(e) => { setMessage(e.target.value) }}
          className="flex-grow p-[10px] h-[40px]  border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="ml-2 px-[10px] py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600" disabled={message == ''} onClick={sendPrompt} >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
