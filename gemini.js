    import axios from 'axios'
    const geminiResponse = async (command,assistantName,userName) => {
        try {
            const apiUrl = process.env.GEMINI_API_URL




            const prompt = ` You are a virtual assistant named ${assistantName} 
            created by ${userName}.
            You are not Google. You will now behave like a voice-enabled assistant.
            
            Your task is to understand the user's natural language input and respond with a JSON
            object like this:
            
            {
            "type":"general" | "google-search" | "youtube-search" |
            "youtube-play" | "  get-time" | "get-date" | "get-day" |
            "get-month" | "calculator-open" | "instagram-open" |
            "facebook-open" | " weather-show",
            "userinput": <query or relevant text>" {only remove your userinput if exists} and agar kisi ne google ya youtube search karne ka bola hai to userInput me only bo search baala text jaye,
            "response": "<a short spoken response to read out loud to the user>"}
            

            Instructions:
            - "type" : determine the intent of the user.
            - "userinput" : original sentence the user spoke.
            - "response" : A short voice-friendly reply, e.g., "Sure, playlist it now", "Here's
            what i found", " Today is Tuesday", etc.


            Type meanings:
            - "general" : if it's a factual or informational question. aur
             agar koi aisa question puchta hai jiska answer tume pata
             hai usko bhi general ki category me rakho bas short answer dena.
            - "google-search" : if user wants to search something on Google.
            - "youtube-search" : if user wants to search something on youtube.
            - "youtube-play" : if user wants to direclty play a video or song.
            - "calculator-open" : if user wants to open a calculator.
            - "instagram-open" : if user want to open instagram.
            - "facebook-open" : if user wants to open facebook.
            - "weather-show" " if user want sto know weather.
            - "get-time" : if user asked for current time.
            - "get-date" : if user asked current date.
            - " get-day" : if user asked current todays day.
            -"get-month" : if  user askef for the current month.



            Important:
            - Use " ${userName} " agar koi puche tume kisne banaya
            - Only respond with the JSON object, nothing else.

            now your userInout - ${command}
            
            ` ;









            const result = await axios.post(apiUrl,{
                "contents":[{
                    "parts":[{"text":prompt}]
                }]
            })

            return result.data.candidates[0].content.parts[0].text
        } catch (error) {
            console.log(error)
        }
    }

    export default geminiResponse