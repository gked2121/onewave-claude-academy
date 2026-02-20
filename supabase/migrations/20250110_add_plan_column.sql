-- Add plan column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'full', 'pro'));

-- Create index for faster plan queries
CREATE INDEX IF NOT EXISTS idx_profiles_plan ON public.profiles(plan);

-- Comment on column
COMMENT ON COLUMN public.profiles.plan IS 'User subscription plan: free, full, or pro';
