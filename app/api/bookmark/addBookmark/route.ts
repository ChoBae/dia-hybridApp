import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/authOptions';
import { Session } from '@/types/Session';

export async function POST(request: Request) {
  const session = await getServerSession({ req: request, ...authOptions });
  const typedSession = session as Session;
  const { searchParams } = new URL(request.url);
  const pkValue = searchParams.get('pkValue');
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/questions/${pkValue}/bookmark`;
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `${typedSession?.user.access_token}`,
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to edit question. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error editing question:', error);
    throw error; // Rethrow the error to be handled by the caller if necessary
  }
}
