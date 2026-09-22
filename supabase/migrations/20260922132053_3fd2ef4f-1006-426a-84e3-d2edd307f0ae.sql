CREATE POLICY "Server manages assistant question logs"
ON public.assistant_question_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Server manages assistant rate limits"
ON public.assistant_rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);