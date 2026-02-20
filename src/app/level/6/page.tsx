import CodingChallenge from '@/components/CodingChallenge';
import RequireFullAccess from '@/components/RequireFullAccess';

export default function LevelSix() {
  return (
    <RequireFullAccess level={6}>
      <CodingChallenge levelId={6} />
    </RequireFullAccess>
  );
}