CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_items JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_progress_select" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "own_progress_insert" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own_progress_update" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "own_progress_delete" ON user_progress
  FOR DELETE USING (auth.uid() = user_id);
