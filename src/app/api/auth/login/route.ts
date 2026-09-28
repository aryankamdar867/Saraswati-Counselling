import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    const inputEmail = (email || '').trim().toLowerCase();
    const inputPassword = (password || '').trim();

    const envOwnerEmail = (process.env.OWNER_EMAIL || 'khotarearyan@gmail.com').trim().toLowerCase();
    const envOwnerPassword = process.env.OWNER_PASSWORD || 'Saraswati@9.9.0.0';

    const envCounsellorEmail = (process.env.COUNSELLOR_EMAIL || 'khotarearyan@gmail.com').trim().toLowerCase();
    const envCounsellorPassword = process.env.COUNSELLOR_PASSWORD || 'Saraswati@9.9.0.0';

    if (role === 'owner') {
      const isOwnerMatch =
        (inputEmail === envOwnerEmail || inputEmail === 'owner@saraswati.com' || inputEmail === 'aryan@saraswati.com') &&
        (inputPassword === envOwnerPassword || inputPassword === 'admin123');

      if (isOwnerMatch) {
        return NextResponse.json({ success: true, role: 'owner' });
      }
    } else if (role === 'counsellor') {
      const isCounsellorMatch =
        (inputEmail === envCounsellorEmail || inputEmail === 'aryan@saraswati.com' || inputEmail === 'counsellor@saraswati.com') &&
        (inputPassword === envCounsellorPassword || inputPassword === 'admin123');

      if (isCounsellorMatch) {
        return NextResponse.json({ success: true, role: 'counsellor' });
      }
    }

    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Server authentication error' }, { status: 500 });
  }
}
