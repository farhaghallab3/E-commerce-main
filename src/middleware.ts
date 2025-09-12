 
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  

  const { pathname } = request.nextUrl
  
 
  const token = request.cookies.get("token")?.value;
  
  if(token){
             return NextResponse.next();
          
  }
 
 else{
     return NextResponse.redirect(new URL('/login', request.url))}
} 
export const config = {
  matcher:  [ '/wishList','/cart','/allorders']


}