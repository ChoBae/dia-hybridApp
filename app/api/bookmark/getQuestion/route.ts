import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('query');
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/questions?categoryValues=${id}`,
    {
      //   method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await result.json();
  // console.log('res', data.data.pageData);
  //   return data
  //   return NextResponse.json({ data });
  try {
    if (data.status === 200) {
      return NextResponse.json(data.data.pageData, { status: result.status });
    }
    return NextResponse.json(
      {
        message: 'DB에서 에러를 리턴',
        error: result.statusText,
      },
      { status: result.status }
    );
  } catch (e) {
    return NextResponse.json({ error: '서버내부오류 발생' }, { status: 500 });
  }
}
