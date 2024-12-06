import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // If you're using cookies to store the session
    const headers = new Headers();

    // Assuming you're storing session info in a cookie named 'session'
    headers.append('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict; Secure');

    return NextResponse.json({ message: 'Successfully logged out.' }, { status: 200, headers });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'An error occurred during logout.' }, { status: 500 });
  }
}
