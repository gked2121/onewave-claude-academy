import CodingChallenge from '@/components/CodingChallenge';
import RequireFullAccess from '@/components/RequireFullAccess';

export default function LevelFive() {
  return (
    <RequireFullAccess level={5}>
      <CodingChallenge levelId={5} />
    </RequireFullAccess>
  );
}