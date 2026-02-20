import CodingChallenge from '@/components/CodingChallenge';
import RequireFullAccess from '@/components/RequireFullAccess';

export default function LevelEight() {
  return (
    <RequireFullAccess level={8}>
      <CodingChallenge levelId={8} />
    </RequireFullAccess>
  );
}