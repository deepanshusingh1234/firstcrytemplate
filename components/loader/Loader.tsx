import React from "react";
import Image from "next/image";


const Loader = () => {
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-[60] flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <Image
                    src="//cdn.fcglcdn.com/brainbees/images/n/login-signup-loader.gif"
                    alt="Loading..."
                    width={50}
                    height={50}
                    className="mx-auto"
                    unoptimized
                />
            </div>
        </div>
    );
}

export default Loader;