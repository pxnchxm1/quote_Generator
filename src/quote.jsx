import { CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import './quote.css';

const url="https://inspo-quotes-api.herokuapp.com/quotes/random";
export default function Quote(){
    const [quote,setQuote]=useState({text:"",author:""});
    const [isloading,setisloading]=useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [openQuotes,setOpenQuotes] = useState(false);
    const spaceImages = [
        
        '../src/assets/images/4.jpg',
        '../src/assets/images/5.jpg',
        '../src/assets/images/6.jpg',
        '../src/assets/images/7.jpg',
        '../src/assets/images/8.jpg',
        '../src/assets/images/9.png',
        '../src/assets/images/10.jpg',
    ];


    useEffect(()=>{
        async function GetQuote(){
            const response = await fetch(url);
            const jsonrespone = await response.json();
            const quotee = jsonrespone.quote;
          setQuote(quotee);
          setisloading(false);
          const randomImageUrl = getRandomImage();
          setImageUrl(randomImageUrl);
          }
        GetQuote();
    },[])
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * spaceImages.length);
        return spaceImages[randomIndex];
    };
    
    async function GetQuote(){
      const response = await fetch(url);
      const jsonrespone = await response.json();
      const quotee = jsonrespone.quote;
      setQuote(quotee);
      const randomImageUrl = getRandomImage();
      setImageUrl(randomImageUrl);
     
    }
    const quoteList =[]
    const handleSave=()=>{
        const savedQuote = JSON.stringify(quote);
        localStorage.setItem("quote",savedQuote);
        quoteList.push(quote);
        alert("saved the following quote to local storage  :\n " + quoteList[0].text);
        console.log(quoteList)
    }

    
    
    return(
    <>
    <Typography className="Loader" style={{opacity : isloading ?1:0}}>Loading...</Typography>
    
    {!isloading && (<Card sx={{ maxWidth: 345 }} className='CardComponent'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={imageUrl}
          alt="green iguana"
        />
        <CardContent>
        
          <Typography gutterBottom variant="h5" component="div">
          {quote.text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {quote.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{alignItems:'center',display:'flex',flexDirection:'row'}}>
        <button  className="btn" size="small"  onClick={GetQuote}>
          Get New Quote
        </button>
        <button className="btn" size="small" onClick={(handleSave)}>
                            Save 
                        </button>
      </CardActions>
    </Card>)}
    
    </>)
    
    
    
}