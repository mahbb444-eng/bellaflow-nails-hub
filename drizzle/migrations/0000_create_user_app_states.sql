CREATE TABLE public.app_states (
  user_id uuid PRIMARY KEY,
  state jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_states TO authenticated;
GRANT ALL ON public.app_states TO service_role;
ALTER TABLE public.app_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own app state"
ON public.app_states FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own app state"
ON public.app_states FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own app state"
ON public.app_states FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own app state"
ON public.app_states FOR DELETE TO authenticated
USING (auth.uid() = user_id);
CREATE INDEX app_states_updated_at_idx ON public.app_states (updated_at DESC);