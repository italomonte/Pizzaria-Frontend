import { NextRequest, NextResponse } from 'next/server'
import { getCookiesServer } from './lib/cookieServer'
import { headers } from 'next/headers'
import { api } from './services/app'

export async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl

    if (pathname.startsWith("/_next") || pathname === "/" || pathname === "/signup")  {
        return NextResponse.next()
    } else {
        const token = await getCookiesServer()
        
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url))
        }
        
        const isValid = await validateToken(token)

        if (!isValid) {
            return NextResponse.redirect(new URL("/", req.url))

        } 
    }
}

async function validateToken(token:string) {
    if (!token) return false

    try {
        await api.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return true
    } catch (error) {
        console.log(error)
        return false
    }
    
}