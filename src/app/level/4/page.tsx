import CodingChallenge from '@/components/CodingChallenge';
import RequireFullAccess from '@/components/RequireFullAccess';

export default function LevelFour() {
  return (
    <RequireFullAccess level={4}>
      <CodingChallenge levelId={4} />
    </RequireFullAccess>
  );
}