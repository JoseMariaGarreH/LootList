import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({
        message: "getting a single user" 
    })
}

export function DELETE(){
    return NextResponse.json({
        message: "deleting a single user"
    })
}

export function PUT(){
    return NextResponse.json({
        message: "updating a single user"
    })
}   