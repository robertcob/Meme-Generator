import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';
export const Meme = () => {
    const [memes, setMemes] = useState([]);
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);

    const history = useHistory();


    const updateCaption = (e, index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((c, i)  => {
                if (index === i) {
                    return text

                }
                else {
                    return c
                }
            })
        );
    };

    const updateErrorLabel = () => {
        document.getElementById("error_Box").innerHTML ="";
        setMemeIndex(memeIndex + 1);
    }


    const generate_Meme = () => {
        const currentMeme = memes[memeIndex];
        const formData = new FormData();
        var caption_Check = false;
        
        // enter your imgflip creds here..
        formData.append('username', '********');
        formData.append('password', '********');
        formData.append('template_id', currentMeme.id);
        // captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
        captions.forEach(function(caption, index){
            if (caption === ''){
                console.log("Caption NOT FILLED");
                caption_Check = true;
            }

            else{
                caption_Check = false
                formData.append(`boxes[${index}][text]`, caption);
            }
        })

        if (caption_Check === true){
            document.getElementById("error_Box").innerHTML ="Please Fill in all captions!"
            return;
        } 

        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        }).then(res => {
            res.json().then(res => {
                history.push(`/generate?url=${res.data.url}`);
            });
        });

    };
    
    const shuffleMemeImages = (array) => {
        for (let i = array.length - 1; i > 0; i --){
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };

    // api fetch call to get memes page
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res => {
            res.json().then(res => {
                const _memes = res.data.memes;
                shuffleMemeImages(_memes)
                setMemes(_memes);
            });
        });
      }, []);

      useEffect(() => {
          if(memes.length) {
            setCaptions(Array(memes[memeIndex].box_count).fill(''));

          }

      }, [memeIndex, memes]);



    return ( 
        // ensuring we get returned data.. (memes array > 0), and returning data
        memes.length ?  
        <div className={styles.container}>
            <h1 id="error_Box"></h1>
            <button onClick={generate_Meme} className={styles.generate}>Generate</button>
            <button onClick={updateErrorLabel}  className={styles.skip}>Skip</button>
            {
                
                captions.map((c, index) => (
                    <input onChange={(e) => updateCaption(e, index)} key={index} />
                ))
                
            }
            <img alt='meme' src={memes[memeIndex].url} />
        </div> : 
        <></>
    )
};