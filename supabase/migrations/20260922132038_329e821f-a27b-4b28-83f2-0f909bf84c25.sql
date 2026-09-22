CREATE TABLE public.assistant_question_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_hash text NOT NULL,
  question text NOT NULL,
  source_urls text[] NOT NULL DEFAULT '{}',
  rating text CHECK (rating IS NULL OR rating IN ('up', 'down')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.assistant_question_logs TO service_role;
ALTER TABLE public.assistant_question_logs ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.assistant_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_hash text NOT NULL,
  window_start timestamptz NOT NULL,
  question_count integer NOT NULL DEFAULT 0 CHECK (question_count >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (visitor_hash, window_start)
);
GRANT ALL ON public.assistant_rate_limits TO service_role;
ALTER TABLE public.assistant_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE INDEX assistant_question_logs_created_at_idx ON public.assistant_question_logs (created_at DESC);
CREATE INDEX assistant_rate_limits_window_idx ON public.assistant_rate_limits (window_start);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER assistant_question_logs_set_updated_at
BEFORE UPDATE ON public.assistant_question_logs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER assistant_rate_limits_set_updated_at
BEFORE UPDATE ON public.assistant_rate_limits
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();