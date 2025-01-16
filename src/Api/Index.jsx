import axios from 'axios'

export const fetchGitHubData = async ()=>{
    try {
        const response = await axios.get(`https://api.github.com/users/ved-286`)
        console.log(response.data)
    } catch (error) {
        
    }
}