import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function GET(){
try {
        const {userId} = await auth()
        if(!userId){
            return NextResponse.json({message: "Unauthorized"}, {status: 401})
        }
    
        const authParams = imagekit.getAuthenticationParameters()
    
        return NextResponse.json(authParams)
} catch (error) {
    return NextResponse.json({message: "failed to generate parameters for imagekit"}, {status: 500})
    
}
}