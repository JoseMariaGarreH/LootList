import Footer from "@/components/menu/Footer";
import Navbar from "@/components/menu/Navbar";

export default function AboutPage() {
    return (
        <>  
            <Navbar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-4xl font-bold mb-4">About</h1>
                </div>
            <Footer />
        </>
    )
}