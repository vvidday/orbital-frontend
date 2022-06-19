import { supabase } from "../supabase/supabaseClient";

// Function that logs user in via twitter.
export const signInWithTwitter = async () => {
    const { user, session, error } = await supabase.auth.signIn({
        provider: "twitter",
    });
    console.log(error);
};

// Function that logs user out of the current session.
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
};
