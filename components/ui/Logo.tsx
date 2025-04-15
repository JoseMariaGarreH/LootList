import Image from "next/image";

export default function Logo() {
    return(
        <div className="relative w-20 h-20">
            <Image
                fill
                alt="App Web Logo"
                src="/logo.svg"
            >
            </Image>
        </div>
    )
}