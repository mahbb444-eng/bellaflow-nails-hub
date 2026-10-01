<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Keep the monthly booking view in the existing Agenda route and reuse the shared Calendar and booking dialog, so week/day editing and account data flow remain unchanged.
Store custom booking end times as the existing duration in minutes, deriving the displayed end time from start and duration; this keeps existing bookings and account storage compatible.
Use a manifest and static icons only for phone home-screen installation; no service worker is needed for a shortcut, preserving current online behavior and sessions.
