import React from "react";

const Footer = () => {
    return (
        <div className="w-full bg-blue-200 flex justify-center items-center h-20">
            <div className="flex">
                <div className="mr-5">
                    Made With:
                </div>
                <div className="flex flex-col">
                    <a className="underline" href="https://github.com/JaidedAI/EasyOCR">EasyOCR</a>
                    <a className="underline" href="https://libretranslate.com">LibreTranslate</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;