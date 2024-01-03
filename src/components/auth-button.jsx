'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-react';

export function AuthButton () {
    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            options: {
                redirectTo: './auth/callback'
            }
        })
    }

    const handleSignOut = async () => {
        await supabase.auth.SignOut()
    } 

    return (
        <header>
            <button onClick={handleSignIn}> Inicia Sesion </button>
            <button onClick={handleSignOut}> Cerrar Sesion </button>
        </header>
        )
}