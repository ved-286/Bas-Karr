import React, { useState } from "react";
import axios from 'axios'
import { GoogleGenerativeAI } from "@google/generative-ai";

function Hero() {

  const [username1, setUsername1] = useState(null);
  const [username2, setUsername2] = useState(null);
  const [profile1,setProfile1] = useState('');
  const [profile2,setProfile2] = useState('');
  const [aiDescription, setAiDescription] = useState('');


  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const fetchGitHubData = async ()=>{
    try {
        const response1 = await axios.get(`https://api.github.com/users/${username1}`)
       

        const response2 = await axios.get(`https://api.github.com/users/${username2}`)
        setProfile1(response1.data)
        setProfile2(response2.data)
      await generateAIDescription(response1.data,response2.data)
     
        
    } catch (error) {
        console.error('Error fetching GitHub profile', error);
    }
}
const generateAIDescription = async (prof1, prof2) => {
  // Use passed profiles instead of relying on state
  if (!prof1 || !prof2) {
    console.error('Profiles are undefined');
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Compare GitHub profiles:
    Profile 1:
    - Name: ${prof1.name || 'N/A'}
    - Username: ${prof1.login}
    - Followers: ${prof1.followers}
    - Repositories: ${prof1.public_repos}

    Profile 2:
    - Name: ${prof2.name || 'N/A'}
    - Username: ${prof2.login}
    - Followers: ${prof2.followers}
    - Repositories: ${prof2.public_repos}

    Provide a detailed comparative analysis`;

    const result = await model.generateContent(prompt);
    const description = await result.response.text();
    
    setAiDescription(description);
  } catch (error) {
    console.error('AI Description Generation Error:', error);
  }
};


const handleSubmit =()=>{
    fetchGitHubData(username1,username2)

}


  return (
    <>
      <div className="flex justify-center  bg-gradient-to-r from-gray-900 to-gray-600 min-h-screen">
        <div className="w-[70vw]">
          <div className="">
            <h1 className="text-4xl text-center font-bold text-white">compare your github</h1>
          </div>
          <div className="flex mt-6 ml-10 translate-x-20 p-5 gap-10">
          <div >
            <input type="text"
             placeholder="Enter GitHub Username 1" 
             onChange={(e) => setUsername1(e.target.value)} 
             value={username1 || ""}
             className=" ml-4 p-2 border border-gray-300 rounded-lg outline-none border-purple-400 border-9" />
          </div>
          <div>
            <input type="text" placeholder="Enter GitHub Username 2" 
            onChange={(e) => setUsername2(e.target.value)} 
            value={username2 || ""} 
            className=" ml-4 p-2 border border-gray-300 rounded-lg border-purple-400 border-9" />
          </div>
          </div>
          <div className="flex justify-center">
            <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-[10vw]"
            >Submit</button>
          </div>
          {
          profile1 && (
           <div className="mt-9 space-y-4 flex flex-col border border-purple-400 rounded-lg p-4 ml-8 translate-x-20 w-[20vw]">
            <div className="flex items-center space-x-4">
              <img 
              className="w-20 h-20 rounded-full"
              src={profile1.avatar_url} alt={`${username1}'s avatar`} />
              <div>
                <h2 className="text-xl font-bold text-purple-300">{profile1.name }</h2>
                <p className="text-gray-400">@{username1}</p>
              </div>
            </div>
            {/*  */}
            <div>
             <div className="text-white font-bold">
              <span className="text-white">
                {profile1.public_repos}
              </span>
              {"  "}
              <span>Reposetries</span>
             </div>
             <div className="text-white">
              <span>
                {profile1.followers}
              </span>
              { "  "}
              <span>Followers</span>
             </div>
            </div>
           </div>
           
          )
        
        }
        {
          profile2 &&(
            <div className="mt-9 space-y-4 flex flex-col border border-purple-400 rounded-lg p-4 ml-8 translate-x-20 w-[20vw] relative top-[-34vh] left-[55vh]">
            <div className="flex items-center space-x-4">
              <img 
              className="w-20 h-20 rounded-full"
              src={profile2.avatar_url} alt={`${username2}'s avatar`} />
              <div>
                <h2 className="text-xl font-bold text-purple-300">{profile1.name }</h2>
                <p className="text-gray-400">@{username2}</p>
              </div>
            </div>
            {/*  */}
            <div>
             <div className="text-white font-bold">
              <span className="text-white">
                {profile2.public_repos}
              </span>
              {"  "}
              <span>Reposetries</span>
             </div>
             <div className="text-white">
              <span>
                {profile2.followers}
              </span>
              { "  "}
              <span>Followers</span>
             </div>
            </div>
           </div>
          )
        }

        {
          aiDescription &&(
            <div className="bg-gray-700/50 rounded-lg p-4 border-l-4 relative top-[-30vh] border-purple-500">
              <h3 className="text-lg font-bold text-white" > AI recomendation</h3>
              <p className="text-white italic">{aiDescription}</p>
            </div>
          )
        }
        </div>
       
      </div>
    </>
  );
}

export default Hero;
