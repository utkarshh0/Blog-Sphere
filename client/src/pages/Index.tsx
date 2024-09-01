import { useState } from "react"
import Signin from "../Components/Signin"
import Signup from "../Components/Signup"

const Index: React.FC = () => {

    const [isSignin, setIsSignin] = useState(true)
    return(

        <>
            <div className="w-screen h-screen flex overflow-hidden">
                <div className="w-full md:w-2/4">
                    {isSignin ? <Signin onClick={setIsSignin} /> : <Signup onClick={setIsSignin}/> }
                </div>
                <div className="md:w-2/4 h-full bg-[#F3F4F6] p-4 hidden md:block">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-4/5">
                            <p className="py-4 text-xl font-bold">Every blog post is a chance to make a difference. Speak from the heart, and let your unique voice illuminate the path for others.</p>
                            <p className="py-1 font-medium">Utkarsh Kataria</p>
                            <p className="text-sm font-thin">Blog Enthusiast</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index