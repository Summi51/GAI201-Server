
const express = require('express');

const { Configuration, OpenAIApi } = require("openai");

const cors=require("cors")

require("dotenv").config();


const app = express();



const configurationOpenApi  = new Configuration({
  apiKey:process.env.OPENAI_API_KEY
});


app.use(cors())


app.use(express.json())


const openai = new OpenAIApi(configurationOpenApi)
app.use(express.json());



app.get("/",(req, res)=>{
  res.send("Hello PE")
})


app.post("/story/:data",async (req,res)=>{


  let {data} = req.params
 

  try {
   
      const completiondata = await openai.createCompletion({

        model:"text-davinci-003",

        prompt:`please generate a random 6 line ${data} story line by line `,

        max_tokens: 1050,
      });
      res.send(completiondata.data.choices[0].text);
    
  } catch (error) {
    res.send(
      'error'
    )
  }
})


app.listen(process.env.port, () => {
  console.log(`Server listening on port ${process.env.port}`);
});
    