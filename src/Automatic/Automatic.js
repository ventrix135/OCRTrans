import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';

import "./Automatic.scss";

const Automatic = () => {
    const [imageLink, setImageLink] = useState('')
    const [featImage, setFeatImage] = useState('')
    const featImageRef = useRef();
    const [before, setBefore] = useState('')
    const [result, setResult] = useState('')
    const [langList, setLangList] = useState([])
    const [detectLang, setDetectLang] = useState('auto')
    const [selecLang, setSelecLang] = useState('none')
    const [error, setError] = useState('0')

    useEffect(() => {
        axios.get('https://libretranslate.de/languages')
        .then(res => {
            setLangList(res.data)
        })
    }, [])

    const handleImageLink = (e) => {
        setImageLink(e.target.value)
    }

    const searchImage = () => {
        setFeatImage(imageLink)
        const data = {
            body: imageLink
        }

        axios.post('http://localhost:5000/link', data)
            .then(res => {
                setBefore(res.data)
            })
            .catch(err => console.log(err))
    }

    const handleFeatImageChange = (e) => {
        const fileObject = e.target.files[0];
        if(!fileObject) return;
        const objectURL = URL.createObjectURL(fileObject)
        setFeatImage(objectURL);

        const formData = new FormData();
        formData.append("image", fileObject)

        axios.post('http://localhost:5000/file', formData)
            .then(res => {
                setBefore(res.data)
            })
            .catch(err => console.log(err))
    }

    const getLanguage = () => {
        axios.post('https://libretranslate.de/detect', {q: before})
        .then((res) => {setDetectLang(res.data[0].language)})
    }

    const selectLanguage = (e) => {
        setSelecLang(e.target.value)
    }

    const translateText = () => {
        if(detectLang === 'auto'){
            getLanguage()
        }

        if(selecLang === 'none'){
            setError('1')
            return
        }
        setError('0')

        let data = {
            q: before,
            source: detectLang,
            target: selecLang
        }
        axios.post('https://libretranslate.de/translate', data)
        .then(res => {
            setResult(res.data.translatedText)
        })
    }

    return (
        <div className="space-y-5 mb-20">
            <div className="text-white text-3xl font-bold">
                Select An Image From Your Device
            </div>
            <input 
                className="hidden"
                ref={featImageRef}
                type="file"
                accept='image/*'
                onChange={handleFeatImageChange}
            />
            <div
                className="cursor-pointer flex items-center justify-center size w-full border-2 border-gray-400 bg-gray-300 border-dashed overflow-hidden"
                onClick={() => {featImageRef.current.click()}}
            >
                <img 
                    className={featImage.length !== 0 ? "h-full" : "hidden"}
                    src={featImage} alt="Featured" 
                />
                <p className={"text-gray-600" + (featImage.length === 0 ? "" : " hidden")}>
                    Select Image From Your Device
                </p>
            </div>
            <div className="text-white text-3xl font-bold">
                Or Insert A Link To An Image
            </div>

            <div className="flex">
                <input type="text" onChange={handleImageLink} />
                <div className="underline cursor-pointer"
                onClick={searchImage}>
                    Search Image
                </div>
            </div>

            <div className="text-white text-3xl font-bold">
                Select The Source Language
            </div>

            <select className="outline-none">
                <option value={"auto"}>Auto Detect Language</option>
                {langList.map((item) => {
                    return(
                        <option value={item.code}>{item.name}</option>
                    )
                })}
            </select>

            <div>
                <textarea
                    className="outline-none border border-black p-3 w-full size"
                    placeholder="type here..."
                    value={before}
                    onChange={(e) => setBefore(e.target.value)}
                />
            </div>

            <div className="text-white text-3xl font-bold">
                Select The Target Language
            </div>
            <div className="flex space-x-4">
                <select className="outline-none" onChange={selectLanguage}>
                    <option value={"none"}>Please select language...</option>
                    {langList.map((item) => {
                        return(
                            <option value={item.code}>{item.name}</option>
                        )
                    })}
                </select>
                <div className={error === '0' ? "hidden" : "flex text-red-300 underline"}>
                    Please Select Target Language
                </div>
            </div>
            
            

            <div className="outline-none border border-black w-full p-3 size bg-white">
                {result}
            </div>

            <div className="p-3 mt-5 flex justify-center bg-green-500 cursor-pointer"
                onClick={() => translateText()}
            >
                Translate
            </div>
        </div>
    )
}

export default Automatic;