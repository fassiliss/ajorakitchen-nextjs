import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Get user from database
        const { data: user, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !user) {
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid username or password' },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = await new SignJWT({ userId: user.id, username: user.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(JWT_SECRET);

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return NextResponse.json({
            success: true,
            user: { id: user.id, username: user.username },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}