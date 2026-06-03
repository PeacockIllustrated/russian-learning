import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// refreshes the auth session on every request and guards the routes.
// signed out users are sent to /login; signed in users are kept off /login.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // auth is optional for now: the app is usable without an account, sign-in only
  // persists progress. the one redirect is to keep a signed-in user off /login.
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login");
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/journey";
    return NextResponse.redirect(url);
  }

  return response;
}
