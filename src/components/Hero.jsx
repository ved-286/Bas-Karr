import React, { useState } from "react";
import axios from 'axios'
import { GoogleGenerativeAI } from "@google/generative-ai";

function Hero() {

  const [username1, setUsername1] = useState(null);
  const [username2, setUsername2] = useState(null);
  const [profile1,setProfile1] = useState('');
  const [profile2,setProfile2] = useState('');
  const [aiDescription, setAiDescription] = useState('');


  const genAI = new GoogleGenerativeAI('AIzaSyCixrB25cCmk-sjZhRAAPCN5YkijUq3sJ4');

  const fetchGitHubData = async ()=>{
    try {
        const response1 = await axios.get(`https://api.github.com/users/${username1}`)
        setProfile1(response1.data)

        const response2 = await axios.get(`https://api.github.com/users/${username2}`)
        setProfile2(response2.data)
       generateAIDescription(response1.data)
       generateAIDescription(response2.data)
        
    } catch (error) {
        console.error('Error fetching GitHub profile', error);
    }
}
const generateAIDescription = async (profileData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate a trolling description for the following profile compare 1st profile to seconed profile: 
      Name1: ${profileData.name || username1}
      Name2: ${profileData.name || username2}
      Followers: ${profileData.followers}
      Public Repos: ${profileData.public_repos}
      Bio: ${profileData.bio || 'No bio available'}
      Company: ${profileData.company || 'Not specified'}`;

    const result = await model.generateContent(prompt);
    const description = await result.response.text();
    setAiDescription(description);
  } catch (error) {
    console.error('Error generating AI description', error);
  }
};


const handleSubmit =()=>{
    fetchGitHubData(username1,username2)

}


  return (
    <>
      <div className="flex justify-center  bg-gradient-to-r from-gray-900 to-gray-600 h-[92vh] ">
        <div className="bg-black w-[70vw]">
          <div className="bg-red-600 ">
            <h1 className="text-4xl text-center font-bold text-white">compare your github</h1>
          </div>
          <div className="flex mt-6 ml-10 translate-x-20 p-5 gap-10">
          <div >
            <input type="text"
             placeholder="Enter GitHub Username 1" 
             onChange={(e) => setUsername1(e.target.value)} 
             value={username1 || ""}
             className=" ml-4 p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <input type="text" placeholder="Enter GitHub Username 2" 
            onChange={(e) => setUsername2(e.target.value)} 
            value={username2 || ""} 
            className=" ml-4 p-2 border border-gray-300 rounded-lg" />
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
           <div className="mt-9 space-y-4 flex flex-col border border-gray-300 rounded-lg p-4 ml-8 translate-x-20 w-[20vw]">
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
            <div className="mt-9 space-y-4 flex flex-col border border-gray-300 rounded-lg p-4 ml-8 translate-x-20 w-[20vw] relative top-[-34vh] left-[55vh]">
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

        }
        </div>
       
      </div>
    </>
  );
}

export default Hero;
